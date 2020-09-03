<?php
/**
 * A static helper class for managing plugin setup and handling the
 * parsing of the shortcode and any AJAX requests.
 * 
 * @author Mike W. Leavitt
 * @version 3.0.0
 */

// Require the db info
require_once CAH_FACULTY_3__PLUGIN_DIR . '/priv/dbconfig.php';
use UCF\CAH\WordPress\Plugins\FacultyStaff;

// Require the main plugin file, just in case
require_once CAH_FACULTY_3__PLUGIN_DIR . '/cah-faculty-staff-3.php';

// Require the admin file (currently does nothing)
require_once 'cah-faculty-staff-3-admin.php';
// Require the config file, for setting everything up
require_once 'cah-faculty-staff-3-config.php';

// Require the base class, interface, and trait we'll be using.
if( !class_exists( 'WordPressPluginHelper' ) ) {
    require_once 'lib/class-abstract-wordpress-plugin-helper.php';
}
if( !interface_exists( 'DatabaseHandlerStatic' ) ) {
    require_once 'lib/interface-database-handler.php';
}
if( !trait_exists( 'databaseHandlerStaticTrait' ) ) {
    require_once 'lib/trait-database-handler.php';
}

if( !class_exists( 'CAHFacultyStaffHelper3' ) ) {
    class CAHFacultyStaffHelper3 extends WordPressPluginHelper implements DatabaseHandlerStatic
    {
        use databaseHandlerStaticTrait;

        private static $plugin_name = "cah_faculty_3_";
        private static $plugin_version = "3.0.0";


        private function __construct() {} // Prevents instantiation


        /**
         * Sets up all the actions and the shortcode, hooking them into
         * the WordPress pipeline
         *
         * @return void
         */
        public static function setup() {

            // Register our scripts
            add_action( 'wp_loaded', array( __CLASS__, 'register_scripts' ), 0, 10 );

            // Filter each page to conditionally load our Vue scripts
            add_action( 'the_posts', array( __CLASS__, 'maybe_load_scripts'), 1, 10 );
            
            // Add our shortcode
            add_shortcode( 'cah_faculty', array( __CLASS__, 'shortcode' ) );

            // Set up the AJAX handling
            add_action( 'wp_ajax_user_detail', array( __CLASS__, 'user_detail_ajax' ), 10, 0 );
            add_action( 'wp_ajax_nopriv_user_detail', array( __CLASS__, 'user_detail_ajax' ), 10, 0 );
            add_action( 'wp_ajax_get_faculty_list', [ __CLASS__, 'get_faculty_list_ajax' ], 10, 0);
            add_action( 'wp_ajax_nopriv_get_faculty_list', [ __CLASS__, 'get_faculty_list_ajax' ], 10, 0);

            // There were some plugins that were messing with my code,
            // so I deactivate them if the page requires Vue things
            add_action( 'muplugins_loaded', array( __CLASS__, 'deconflict_plugins' ), 10, 0 );
        }


        /**
         * Run when the plugin activates. Runs the config() method of
         * the Config helper class and flushes the permalinks (just
         * in case)
         *
         * @return void
         */
        public static function plugin_activate() {
            CAHFacultyStaffConfig3::config();
            flush_rewrite_rules();
        }


        /**
         * Run when the plugin deactivates. Calls the deconfig() method
         * of the Config helper class and flushes the permalinks again,
         * for the sake of thoroughness
         *
         * @return void
         */
        public static function plugin_deactivate() {
            CAHFacultyStaffConfig3::deconfig();
            flush_rewrite_rules();
        }


        /**
         * Registers our scripts, so we can load them a bit later than
         * the standard wp_enqueue_scripts hook.
         *
         * @return void
         */
        public static function register_scripts() {
            if( is_admin() ) return;

            $uri = CAH_FACULTY_3__PLUGIN_URL . 'dist';
            $path = CAH_FACULTY_3__PLUGIN_DIR . 'dist';

            // Set up some variables to make the script calls more
            // readable
            $chunk_name = self::$plugin_name . "_chunk";
            $main_name = self::$plugin_name . "_main";

            // Setting initial dependencies
            $deps = array( 'jquery', 'script' );

            // Register the chunk file
            wp_register_script( $chunk_name, "$uri/js/chunk_cah-faculty-staff.js", $deps, filemtime( "$path/js/chunk_cah-faculty-staff.js" ) , true );

            // Register the main script
            wp_register_script( $main_name, "$uri/js/cah-faculty-staff.js", array( $chunk_name ), filemtime( "$path/js/cah-faculty-staff.js" ), true );

            // Register our CSS
            wp_register_style( self::$plugin_name . "_style", "$uri/css/cah-faculty-staff.css", array(), filemtime( "$path/css/cah-faculty-staff.css" ), 'all' );
        }


        /**
         * Check to see if our shortcode is in a page or post, then
         * load our scripts if it is.
         *
         * @param array $posts The array of posts to display. For a page,
         *                          will likely be the only item.
         * 
         * @return array
         */
        public static function maybe_load_scripts( array $posts ) : array {
            if( is_admin() ) return $posts;

            // Check to see if our shortcode is in use
            foreach( $posts as $post ) {
                if( stripos( $post->post_content, '[cah_faculty' ) !== false ) {

                    // If it is, load our stuff
                    self::_load_scripts();
                    self::_load_styles();
                    break;
                }
            }

            // We don't actually mess with the $posts array at all, so
            // we just pass it back to WordPress
            return $posts;
        }


        /**
         * Parses the shortcode and gets everything set up for the
         * hand-off to Vue, once the page loads
         *
         * @param array $atts The shortcode attributes (if any)
         * 
         * @return string The output HTML
         */
        public static function shortcode( $atts = [] ) : string {

            // Parse the shortcode attributes, setting default values
            // where they aren't set in the shortcode itself.
            $a = shortcode_atts( array(
                'format' => 'a-z',
                'include_interests' => 'false',
                'dept' => 11,
                'img_format' => 'circle',
                'filterable' => 'true',
                'vertical' => 'false',
                'tiered' => 'false',
                'btn_color' => 'primary',
                'size' => 2,
                'multi_level' => 'false',
            ), $atts );

            // Turning string "true" and/or "false" into boolean values
            foreach( $a as $key => $value ) {
                if( 'true' == $value || 'false' == $value ) {

                    $a[$key] = 'true' == $value ? true : false;
                }
            }

            if( $a['multi_level'] ) {
                $a['dept'] = self::_get_depts( $a['dept'] );
            }

            // Get the options ready to be embedded in the page
            $data = htmlentities( json_encode( $a ) );

            // Grab the lists of subdepartments and faculty
            $subdept_list = htmlentities( self::_get_result_json( 'subdept', $a['dept'] ) );
            //$faculty_list = htmlentities( self::_get_result_json( 'faculty', $a['dept'] ) );

            // The inputs themselves, as well as the <div> that will
            // contain the Vue app.
            ob_start();
            ?>
                <input type="hidden" id="vueData" value="<?= $data ?>">
                <input type="hidden" id="vueSubDept" value="<?= $subdept_list ?>">

                <div id="vueApp"></div>
            <?php
            return ob_get_clean();
        }


        /**
         * The method that actually runs the query. Accepts a number of
         * arguments, depending on which type of query is being run.
         * $type is the first for all of them, then:
         * 
         *      - For course lists, include $term and $aux[iliary con-
         *          straints]. These are determined programmatically
         *          in the _get_course_list() method, below.
         * 
         *      - For education or publications, $user_id is the only
         *          other argument, so we know which faculty member's
         *          data to look for.
         * 
         *      - For faculty or subdepartment lists, a $dept number
         *          should be supplied. This should be one of the options
         *          set in the shortcode call.
         * 
         * @param string $type  The type of query
         * @param int|string $user_id  A user's ID number
         * @param int|string $dept  The desired department ID
         * @param string $term  The term constraints to search for. This
         *                          should be set programmatically.
         * @param string $aux  Any auxiliary constraints. This should be
         *                          set programmatically.
         * 
         * @return mysqli_result|null
         */
        public static function query( ... $args ) : ?mysqli_result {

            // Initialize some stuff. As mentioned above, $type should
            // be the first variable in every query() call.
            $type = $args[0]; 
            $dept = DEPT;
            $user_id = 0;

            $term = '';
            $aux = '';

            // Set the other variables, depending on the $type
            switch( $type ) {

                case 'courses':
                    $term = $args[2];
                    $aux = $args[3];

                case 'edu':
                case 'pubs':
                    $user_id = $args[1];
                    break;

                case 'faculty':
                case 'subdept':
                case 'get-depts':
                    $dept = $args[1];
                    break;
            }

            // Arrange the data, so we can pass it to the _get_sql()
            // method.
            $data = array(
                $type,
                $dept,
                $user_id,
                $term,
                $aux,
            );

            // Get the SQL (all hail the spread operator)
            $sql = self::_get_sql( ... $data );
            // Run the query
            $result = mysqli_query( self::_db_get(), $sql );

            // If we get a valid result, we return it. If we don't,
            // we return null
            if( self::_validate( $result, $sql ) ) return $result;
            else return null;
        }


        /**
         * Validates a response from a mysqli_query() call to determine
         * whether the query was successful.
         *
         * @param mysqli_result|bool $result The response from the
         *                                      database
         * @param string $sql The original SQL query (for potential
         *                          debugging).
         * 
         * @return boolean
         */
        public static function _validate( $result, $sql ) : bool {

            // This is one of the most reliable and error-resistant ways
            // to check for a valid result that I've found, and
            // the instanceof operator is really fast. Making sure we
            // haven't gotten the empty set ensures that the result we've
            // got is something we can use.
            if( $result instanceof mysqli_result && $result->num_rows > 0 ) {
                return true;
            }
            else return false;
        }


        public static function get_faculty_list_ajax()
        {
            if( !check_ajax_referer( 'faculty-staff-ajax', 'security' ) )
                die("You need a new nonce.");

            $faculty_list = self::_get_result_json( 'faculty', $_POST['dept'] );

            echo $faculty_list;
            
            self::_db_close();
            die();
        }


        /**
         * The AJAX handler, which provides education, publication, and
         * course list information for a specific user by hooking into
         * wp-admin/admin-ajax.php
         *
         * @return void
         */
        public static function user_detail_ajax() {

            // Validate the nonce
            if( !check_ajax_referer( 'faculty-staff-ajax', 'security' ) )
                die("You need a new nonce.");
    
            // If, for some reason, we get a request without a user ID,
            // there's no reason to waste our time.
            if( !isset( $_POST['user'] ) ) {
                die( "No user ID set." );
            }
    
            // Initialize the values we'll be sending back.
            $edu = array();
            $pubs = array();
            $courses = '';
    
            // Make the education query
            $result = self::query( 'edu', $_POST['user'] );
    
            // Because of the _validate() method, if the result isn't
            // null, then it's something we can use.
            if( !is_null( $result ) ) {
    
                // Loop through the results and add entries to the $edu
                // array
                while( $row = mysqli_fetch_assoc( $result ) ) {
    
                    $edu[] = array(
                        'year' => $row['degYear'],
                        'degree' => $row['degree'],
                        'institution' => $row['institution'],
                        'field' => $row['field']
                    );
                }
            }
    
            // Free the result memory
            mysqli_free_result( $result );
    
            // Now grab the publications
            $result = self::query( 'pubs', $_POST['user'] );
    
            // Second verse, same as the first.
            if( !is_null( $result ) ) {
    
                // Loop through and add entries to the $pubs array
                while( $row = mysqli_fetch_assoc( $result ) ) {
    
                    $pubs[] = array(
                        'pubDate' => $row['pubDate'],
                        'pubType' => $row['pubType'],
                        'forthcoming' => $row['forthcoming'],
                        'citation' => $row['citation']
                    );
                }
            }
    
            // Free the result memory
            mysqli_free_result( $result );

            // Finally, we get the courses--which is a little involved,
            // so it has its own method.
            $courses = self::_get_course_list( $_POST['user'] );
    
            // Construct the response
            $response = array(
                'edu' => $edu,
                'pubs' => $pubs,
                'courses' => $courses,
            );
    
            // Send it back as JSON, to be handled by Axios on the front-
            // end
            echo json_encode( $response );

            // Close the database connection
            self::_db_close();

            // Make sure we kill the server process at the end of it
            die();
        }


        /**
         * This turns off some plugins that, during my testing phases,
         * were messing with Vue on the front-end. They're not necessary
         * for any of the pages that I'm running Vue on, to my knowledge.
         *
         * @return void
         */
        public static function deconflict_plugins() {

            // Get the current URL, so we can determine if we're in an
            // admin page
            $request_uri = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );

            // Check if we're in an admin page
            $is_admin = strpos( $request_uri, '/wp-admin/' );

            // If we're not, then do stuff
            if( $is_admin === false ) {

                // This allows us to filter the active plugins
                add_filter( 'option_active_plugins', function( $plugins ) {

                    // Pull in the request_uri from the parent context
                    global $request_uri;

                    // If the page has the word "faculty" in it, we want
                    // to continue
                    if( strpos( $request_uri, '/faculty' ) !== false ) {

                        // This is the plugin that was the problem
                        $target = 'responsive-accordion-and-collapse/responsive-accordion.php';

                        // Search through the $plugins array (passed
                        // from WordPress), for the target plugin
                        $key = array_search( $target, $plugins );

                        // If we find it, remove it from the array
                        if( $key !== false ) {
                            unset( $plugins[$key] );
                        }
                    }

                    // Pass the list of plugins back to WP
                    return $plugins;
                });
            }
        }


        /**
         * Load the Vue scripts that we registered earlier.
         *
         * @return void
         */
        protected static function _load_scripts() {
            
            // The main script. This has the chunk script as one of its
            // dependencies, so WP will chain-load all of those scripts
            // in order to load this one.
            wp_enqueue_script( self::$plugin_name . "_main" );

            // Create a JS variable to pass to the front-end, which we'll
            // use to set some variables in the Vue store once it loads
            wp_localize_script( self::$plugin_name . "_main", 'wpVars', array(
                    'distUrl' => CAH_FACULTY_3__PLUGIN_URL . "dist/",
                    'ajaxUrl' => admin_url( 'admin-ajax.php' ),
                    'security' => wp_create_nonce( 'faculty-staff-ajax' ),
                ) 
            );
        }


        /**
         * Load our app-specific stylesheet, which we registered earlier.
         *
         * @return void
         */
        protected static function _load_styles() {
            wp_enqueue_style( self::$plugin_name . "_style" );
        }


        /**
         * This gets the list of subdepartments OR faculty, depending on
         * the value of $type.
         *
         * @param string $type  The type of list we want.
         * @param int|string $dept  The department number
         * 
         * @return string|null The stringified JSON (or null if some-
         *                          thing went wrong)
         */
        private static function _get_result_json( $type, $dept ) : ?string {

            // Run the query based on the type.
            $result = self::query( $type, $dept );

            // For subdepartment lists
            if( $type == 'subdept' ) {
                
                // Initialize the array
                $subdept_list = array();

                $top_dept = "";
                $matches = [];
                preg_match( '/^\\d/', strval( $dept ), $matches );
                if( isset( $matches[0] ) && !empty( $matches[0] ) )
                    $top_dept = $matches[0];
                
                // Loop through the list and set the values of the array,
                // using subdepartment id as the key (formatted as a 
                // string, so we don't get a potentially-super long
                // numerical array)
                while( $row = mysqli_fetch_assoc( $result ) ) {

                    $subdept_list[ strval( $row['id'] ) ] = [
                        'desc' => $row['description'],
                        'deptID' => $row['department_id'] 
                    ];
                    
                    if( $row['department_id'] == $top_dept ) {
                        $subdept_list[strval($row['id'])]['isHeader'] = true;
                        $subdept_list[strval($row['id'])]['deptCode'] = $row['level'];
                    }
                    else {
                        $subdept_list[strval($row['id'])]['isHeader'] = false;
                    }
                    
                }

                // Free the result memory
                mysqli_free_result( $result );

                // Return the array as stringified JSON
                return json_encode( $subdept_list );
            }

            // For faculty lists
            if( $type == 'faculty' ) {

                // Initialize values
                $faculty_list = array();
                $prev_id = 0;

                // Loop through the results
                while( $row = mysqli_fetch_assoc( $result ) ) {

                    // If the current ID is different from the previous
                    // ID (including on the first iteration), do some
                    // extra stuff
                    if( intval( $row['id'] ) != $prev_id ) {

                        // Create a new listing in the array, and set
                        // all these fields, in a structure that Vue will
                        // be ready to parse on the front-end
                        $faculty_list[$row['id']] = array(
                            'lname'          => $row['lname'],
                            'fname'          => $row['fname'],
                            'id'             => $row['id'],
                            'fullName'       => $row['fullName'],
                            'email'          => $row['email'],
                            'phone'          => isset( $row['phone'] ) ? self::_format_phone_us( $row['phone'] ) : '',
                            'photoUrl'       => ( 
                                !empty( $row['photoUrl'] ) 
                                ? $row['photoUrl'] 
                                : 'profilephoto.jpg'
                            ),
                            'interests'      => html_entity_decode( $row['interests'], ENT_QUOTES, "utf-8" ),
                            'activities'     => $row['activities'],
                            'awards'         => $row['awards'],
                            'research'       => $row['research'],
                            'hasCV'          => $row['has_cv'],
                            'homepage'       => $row['homepage'],
                            'bio'            => $row['bio'],
                            'office'         => $row['office'],
                            //'location'       => $row['location'],
                            'room'           => array( 
                                'num' => $row['room'],
                                'desc' => $row['desc'],
                                'building' => $row['building']
                            ),
                            'subDept'        => array(),
                            'edu'            => array(),
                            'pubs'           => array(),
                            'courses'        => array(),
                            'isDir'          => false,
                            'isChair'        => false,
                        );

                        // Set the current ID as the "previous" ID, for
                        // the next iteration
                        $prev_id = $row['id'];
                    }

                    // If we don't have a subdepartment, just use the
                    // parent department number, instead.
                    if( is_null( $row['subDept'] ) ) {
                        $subDept = $dept;
                    }
                    // Otherwise, use the subdepartment
                    else {
                        $subDept = $row['subDept'];
                    }

                    // Set the entry in the list of subdepartments the
                    // faculty member is affiliated with
                    $faculty_list[$row['id']]['subDept'][ strval( $subDept ) ] = $row['subDeptName'];

                    // Having some weird title discrepancies, so we're going to make this a bit more
                    // complicated--but (hopefully!) more thorough.

                    // Shove the title fields into an array
                    @$titles = array(
                        'title' => $faculty_list[$row['id']]['title'],
                        'titleDept' => $faculty_list[$row['id']]['titleDept'],
                        'titleDeptShort' => $faculty_list[$row['id']]['titleDeptShort'],
                    );

                    // Loop through them and, if they're set, run _maybe_add_title() to determine if
                    // they need a new title field added
                    foreach( $titles as $type => $field ) {
                        if( !is_null( $row[$type] ) && isset( $field[ strval( $subDept ) ] ) ) {
                            $faculty_list[$row['id']][$type] = self::_maybe_add_title( $row[$type], $subDept, $field);
                        }
                        else {
                            $faculty_list[$row['id']][$type][ strval( $subDept ) ] = $row[$type];
                        }
                    }

                    /*
                    // Set their title, sorted by subdepartment
                    $faculty_list[$row['id']]['title'][ strval( $subDept ) ] = $row['title'];
                    // Set their program title, sorted by subdepartment
                    $faculty_list[$row['id']]['titleDept'][ strval( $subDept ) ] = $row['titleDept'];
                    // Set their short program title, too
                    $faculty_list[$row['id']]['titleDeptShort'][ strval( $subDept ) ] = $row['titleDeptShort'];
                    */

                    // Set their faculty classification
                    $faculty_list[$row['id']]['titleGroup'][ strval( $subDept ) ] = $row['titleGroup'];
                }

                // Free the result memory
                mysqli_free_result( $result );

                // Return the array as stringified JSON
                return json_encode( $faculty_list );
            }
        }


        /**
         * Gets a string of HTML that represents the tabbed course list
         * to display on a faculty member's detail page.
         * 
         * Would it have been easier to try to trim this to the most
         * essential information, then have Vue handle creating things
         * on the front-end? Well, most of this code already existed in
         * a previous iteration of this plugin, so...no. Would it work
         * better? Probably, yeah. Something to think about for a future
         * version, maybe.
         *
         * @param int|string $user_id  The faculty member's ID
         * 
         * @return string  The formatted HTML
         */
        private static function _get_course_list( $user_id ) {

            // Initialize some stuff for determining/remembering
            // the various terms the faculty member teaches courses
            // in.
            $terms = array();
            $term_courses = array();
            $current_term = '';

            $sql_term = '';
            $sql_aux = '';

            $summer_flag = false;

            // The base URL for retrieving course syllabi, if present.
            $syllabus_url_base = "https://cah.ucf.edu/common/files/syllabi/";

            // Run the query to get the terms for the current academic
            // year.
            $result = self::query( 'term' );

            // If we have a result, do stuff
            if( $result ) {

                // Loop through the result
                while( $row = mysqli_fetch_assoc( $result ) ) {

                    // If the term is a valid result, we'll add it
                    // to the $terms array and also add it to the list
                    // of terms the eventual course SQL request will be
                    // looking for
                    if( $row['term'] != '-' ) {
                        $terms[] = $row['term'];

                        if( empty( $sql_term) ) {
                            $sql_term = "`term` IN (";
                        }
                        else {
                            $sql_term .= ",";
                        }
                        $sql_term .= "'{$row['term']}'";
                    }
                }

                // If there's a value for $sql_term, remember to supply a
                // closing parenthesis
                if( !empty( $sql_term ) ) $sql_term .= ") ";

                // Free the result memory
                mysqli_free_result( $result );

                // Get the current term
                $current_term = self::_get_semester();
            }

            // Now we run the query to get the actual course list
            $result = self::query( 'courses', $user_id, $sql_term, $sql_aux );

            // If we don't find anything (which we may, because not ever
            // faculty or staff member will be actively teaching), we
            // just return an empty string.
            if( !$result ) {
                mysqli_free_result( $result );
                return '';
            }

            // Otherwise, we loop through the results
            while( $row = mysqli_fetch_assoc( $result ) ) {

                // The current term index
                $term_idx = trim( $row['term'] );

                // Flag the semester as summer, if necessary
                if( stripos( $term_idx, 'summer' ) ) $summer_flag = true;

                // If we haven't created the table yet, do so
                if( empty( $term_courses[ $term_idx ] ) ) {

                    // Start an output buffer, so we don't have to
                    // stack up echo statements (and have the benefit
                    // of HTML syntax highlighting in an IDE).
                    ob_start();
                    ?>
                    <table class="table table-condensed table-bordered table-striped volumes" cellspacing="0" title="<?= $term_idx ?> Offered Courses" style="font-size: 0.9rem">
                        <thead>
                            <tr>
                                <th>Course Number</th>
                                <th>Course</th>
                                <th>Title</th>
                                <th>Mode</th>

                                <?php if( $summer_flag ) : ?>
                                <th>Session</th>
                                <?php endif; ?>

                                <th>Date and Time</th>
                                <th>Syllabus</th>
                            </tr>
                        </thead>
                        <tbody>
                    <?php
                    // Add the buffered string to our term output
                    $term_courses[ $term_idx ] = ob_get_clean();
                }

                // Start another output buffer for the average iteration.
                // Nothing fancy here, just filling in the table cells
                // we set up in the if() block, above.
                ob_start();
                ?>
                            <tr>
                                <td><?= $row['number'] ?></td>
                                <td><?= trim( $row['catalogref'] ) ?></td>
                                <td><?= trim( $row['title'] ) ?></td>
                                <td><?= trim( $row['instruction_mode'] ) ?></td>

                                <?php if( $summer_flag ) : ?>
                                <td><?= trim( $row['session'] ) ?></td>
                                <?php endif; ?>

                                <td><?= trim( $row['dateandtime'] ) ?></td>
                                <td>
                                <?php if( !empty( $row['syllabus_file'] ) ) : ?>
                                    <a href="<?= $syllabus_url_base . str_replace( " ", "", $row['catalogref'] ) . $row['section'] . str_replace( " ", "", html_entity_decode( $row['term'] ) ) . '.pdf' ?>" rel="external">Available</a>
                                <?php else : ?>
                                    Unavailable
                                <?php endif; ?>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="<?= $summer_flag ? 7 : 6 ?>">
                                    <?= $row['description'] ?>
                                </td>
                            </tr>
                <?php

                // Now add the output to the term's HTML
                $term_courses[ $term_idx ] .= ob_get_clean();
            }

            // Free the result memory, since we don't need it anymore
            mysqli_free_result( $result );

            // Start ANOTHER output buffer and create the navigation tabs
            ob_start();
            ?>
            <div class="container" style="width: 100%">
                <ul class="nav nav-tabs" id="courseTab" role="tablist">
            <?php
            $term_labels = str_replace( ' ', '', $terms );

            for( $c = 0; $c < count( $terms ) - 2; $c++ ) {
                ?>
                    <li class="nav-item">
                        <a class="nav-link <?= !strcmp( $current_term, $terms[$c] ) ? 'active' : '' ?>" data-toggle="tab" href="#<?= $term_labels[$c] ?>" role="tab" aria-controls="<?= $term_labels[$c] ?>"><?= $terms[$c] ?></a>
                    </li>
                <?php
            }
            ?>
                </ul>
            </div>

            <div class="tab-content">
            <?php

            // Now we build the content tabs
            for( $c = 0; $c < count( $terms ) - 2; $c++ ) {
                ?>
                    <div class="pt-3 tab-pane <?= $c == 1 ? 'active' : '' ?>" id="<?= $term_labels[$c] ?>" role="tabpanel">

                <?php if( !empty( $term_courses[$terms[$c]] ) ) : ?>
                    <?= $term_courses[$terms[$c]] ?>
                    </div>
                </tbody>
            </table>
        </div>

                <?php else : ?>
                    <p>No courses found for <?= $terms[$c] ?></p></div>
                <?php endif;
            }

            // We return the whole buffer as the HTML course list.
            return ob_get_clean();
        }


        /**
         * Builds the SQL for a query. Called from the query() method,
         * above.   
         *
         * @param string $type  The type of query
         * @param int|string $dept  The department number
         * @param int|string $user_id  A faculty member's ID
         * @param string $term  Addition to the term SQL query
         * @param string $aux  Auxiliary constraints for term query
         * 
         * @return string|null
         */
        private static function _get_sql( $type, $dept, $user_id, $term, $aux ) : ?string {

            // Initialize the return value
            $sql = '';

            switch( $type ) {
                // For getting the subdepartment list
                case 'subdept':
                    $sql = self::_subdept_sql( $dept );
                    break;

                // For getting the faculty list
                case 'faculty':
                    $sql = self::_faculty_sql( $dept );
                    break;

                // For getting a faculty member's education history
                case 'edu':
                    $sql = self::_get_edu( $user_id );
                    break;

                // For getting a faculty member's publication history
                case 'pubs':
                    $sql = self::_get_pubs( $user_id );
                    break;

                // For getting the correct term for the course list
                case 'term':
                    $sql = self::_get_terms();
                    break;

                // For getting the course list HTML itself
                case 'courses':
                    $sql = self::_get_courses( $user_id, $term, $aux );
                    break;

                case 'get-depts':
                    $sql = "SELECT `level` FROM cah.academic_categories WHERE department_id = $dept ORDER BY `level`";
                    break;
                
                default:
                    return null;
            }

            // Return our SQL
            return $sql;
        }


        /**
         * The SQL to find the list of available subdepartments in a given department
         *
         * @param int|string $dept  The department we want subdepartments
         *                              for.
         * 
         * @return string  The completed SQL.
         */
        private static function _subdept_sql( $dept ) : string {
            $top_dept = "";
            $matches = [];
            preg_match( '/^\\d/', strval( $dept ), $matches );
            if( isset( $matches[0] ) && !empty( $matches[0] ) )
                $top_dept = "WHEN department_id = $matches[0] THEN 2";

            $sql = "SELECT id, `description`, `level`, department_id FROM cah.academic_categories WHERE department_id IN( $dept, 3 ) ORDER BY (CASE $top_dept WHEN id = 74 THEN 0 WHEN id = 75 THEN 1 ELSE 3 END), career_level DESC, `description`";
            error_log( "Subdepartment query: $sql" );
            return $sql;
        }


        /**
         * The SQL to get the list of faculty members.
         *
         * @param int|string $dept  The department whose faculty we want
         * 
         * @return string The completed SQL.
         */
        private static function _faculty_sql( $dept ) : string {
            return "SELECT DISTINCT u.id, u.lname, u.fname, CONCAT_WS(' ', u.fname, u.mname, u.lname) AS fullName, u.email, u.phone, t.description AS title, ud.prog_title_dept AS titleDept, ud.prog_title_dept_short AS titleDeptShort, t.title_group AS titleGroup, IF(u.photo_extra IS NOT NULL, CONCAT(u.photo_path, u.photo_extra), u.photo_path) AS photoUrl, u.interests, a.academic_id AS subDept, ac.description AS subDeptName, u.activities, u.awards, u.research, u.has_cv, u.homepage, u.biography AS bio, u.office, r.room, r.`desc`, r.building FROM cah.users AS u LEFT JOIN cah.users_departments AS ud ON u.id = ud.user_id LEFT JOIN cah.titles AS t ON t.id = ud.title_id LEFT JOIN cah.academics AS a ON a.user_id = u.id LEFT JOIN cah.academic_categories AS ac ON ac.id = a.academic_id LEFT JOIN ( SELECT rooms.id, rooms.room_number AS room, buildings.short_description AS `desc`, buildings.building_number AS building FROM cah.rooms LEFT JOIN buildings ON rooms.building_id = buildings.id) AS r ON r.id = u.room_id WHERE ud.department_id IN ( $dept ) AND ud.active = 1 AND ud.show_web = 1 AND ud.affiliation = 'active' ORDER BY u.lname, u.fname";
        }


        /**
         * The SQL to get a user's education history
         *
         * @param int|string $user_id  The faculty member's user ID
         * 
         * @return string The completed SQL.
         */
        private static function _get_edu( $user_id ) : string {
            return "SELECT education.field, education.institution, education.year AS degYear, `degrees`.short_description AS `degree` FROM cah.education LEFT JOIN cah.degrees ON education.degrees_id = `degrees`.id WHERE education.user_id = $user_id ORDER BY education.year";
        }


        /**
         * The SQL to get a user's publication history
         *
         * @param int|string $user_id  The faculty member's user ID.
         * 
         * @return string  The completed SQL
         */
        private static function _get_pubs( $user_id ) : string {
            return "SELECT pubs.forthcoming, DATE_FORMAT( pubs.publish_date, '%M %Y' ) AS pubDate, pub_cats.plural_description AS pubType, pubs.citation FROM cah.publications AS pubs LEFT JOIN cah.publications_categories AS pub_cats ON pubs.publication_id = pub_cats.id WHERE pubs.user_id = $user_id AND approved = 1 ORDER BY pub_cats.level, pub_cats.plural_description, pubs.publish_date DESC";
        }


        /**
         * The SQL to get the available terms for course listings.
         *
         * @return string  The completed SQL.
         */
        private static function _get_terms() : string {
            $sql_start = "SELECT DISTINCT term, term, CAST( SUBSTRING( term, LOCATE( ' ', term ) ) AS UNSIGNED ) + CAST( IF( SUBSTRING_INDEX( term, ' ', 1 ) = 'Fall', 1, 0 ) AS UNSIGNED ) AS ordering FROM courses WHERE term != CONCAT( 'Summer ', ( YEAR( NOW() ) + 1 ) )";

            $sql_end = " ORDER BY ordering DESC, term DESC";
            
            $year = date('Y');
            $today = strtotime( date('d.m.') . $year );
            $start = strtotime( "05.03.$year" );

            if( $today > $start )
                return $sql_start . $sql_end . " LIMIT 0, 5";
            
            else
                return "$sql_start AND term != CONCAT( 'Summer ', YEAR( NOW() ) ) AND term != CONCAT( 'Fall ', YEAR( NOW() ) ) AND term != CONCAT( 'Spring ', ( YEAR( NOW() ) + 1 ) )$sql_end";
        }


        /**
         * The SQL to get the actual list of courses
         *
         * @param int|string $user_id  The faculty member's user ID
         * @param string $term  The term constraints
         * @param string $aux  Any auxiliary constraints
         * 
         * @return string  The completed SQL.
         */
        private static function _get_courses( $user_id, $term, $aux ) : string {
            
            return "SELECT courses.id, number, IF( description IS NULL, \"No Description Available\", description ) AS description, CONCAT( prefix, catalog_number ) AS catalogref, syllabus_file, term, section, title, instruction_mode, session, CONCAT( meeting_days, ' ', class_start, ' - ', class_end ) AS dateandtime FROM courses LEFT JOIN users ON courses.user_id = users.id WHERE $term$aux AND ( user_id = $user_id OR suser_id = $user_id ) ORDER BY term, catalogref, title, number";
        }


        /**
         * Takes a given phone number input and formats it as a U.S.
         * number. If it's not able to be formatted that way, we just
         * send it straight back.
         *
         * @param string $phone  The phone number to try and format
         * 
         * @return string  The formatted (or original) number.
         */
        private static function _format_phone_us( string $phone ) : string {
            if( !isset( $phone ) ) return "";

            $phone = preg_replace( "/[^0-9]/", "", $phone );
            switch( strlen( $phone ) ) {

                case 7: // It's a "local" number, without an area code or country code.
                    return preg_replace( "/(\d{3})(\d{4})/", "$1-$2", $phone );
                    break;
                case 10: // It's a US number with area code, but no country code.
                    return preg_replace( "/(\d{3})(\d{3})(\d{4})/", "($1) $2-$3", $phone );
                    break;
                case 11: // It's a US number with the leading country code, as well.
                    return preg_replace( "/(\d)(\d{3})(\d{3})(\d{4})/", "+$1 ($2) $3-$4", $phone );
                    break;
                default: // It's not a US number, so just bounce it back.
                    return $phone;
                    break;
            }
        }


        /**
         * Check to see which term of the academic year we're in.
         *
         * @return string  The term and year.
         */
        private static function _get_semester() : string {

            $now = getdate();
            $term = "";

            switch( $now[ 'mon' ] ) {

                case 10:
                case 11:
                case 12: // The Fall has already started, so start with Spring the following year.
                    $term = "Spring " . ( intval( $now['year'] ) + 1 );
                    break;

                case 1:
                case 2: // Spring again, but without adding to the year.
                    $term = "Spring {$now['year']}";
                    break;

                case 3:
                case 4:
                case 5:
                case 6: // The Spring semester, Summer is upcoming.
                    $term = "Summer {$now['year']}";
                    break;

                default: // Otherwise, we're focused on Fall
                    $term = "Fall {$now['year']}";
                    break;
            }

            return $term; // Return whatever we've come up with.
        }


        /**
         * Check to see if we need to turn a particular title field into an array of titles,
         * if the faculty member has more than one
         *
         * @param string $value
         * @param integer $subDept
         * @param string|array $container
         * @return void
         */
        private static function _maybe_add_title( string $value, int $subDept, $container) {

            // If the $container isn't empty and we have an entry for the subDept already...
            if( !empty( $container ) && isset( $container[$subDept] ) ) {

                // If it's not yet an array, we might need to make it one, if the values
                // don't match
                if( !is_array( $container[$subDept] ) ) {

                    // If the values are different, make an array out of the two values
                    if( strcmp($container[$subDept], $value) != 0 ) {
                        $new_arr = array(
                            $container[$subDept],
                            $value,
                        );

                        // Assign the new array to the $container at the index $subDept
                        $container[$subDept] = $new_arr;
                    }
                }

                // If it IS an array...
                else {
                    // Check to see if the value is in there already. If not, add it.
                    if( !in_array( $value, $container[$subDept] ) ) {
                        $container[$subDept][] = $value;
                    }
                }
            }
            // Otherwise just assign the darned value
            else $container[$subDept] = $value;

            // Return the modified $container
            return $container;
        }


        private static function _get_depts( $dept ) : string
        {
            $dept_str = "$dept";

            if( $result = self::query( 'get-depts', $dept ) )
            {
                while( $row = mysqli_fetch_assoc( $result ) )
                {
                    $dept_str .= ", {$row['level']}";
                }
            }

            return $dept_str;
        }
    }
}
?>