<?php
require_once CAH_FACULTY_3__PLUGIN_DIR . '/priv/dbconfig.php';
require_once CAH_FACULTY_3__PLUGIN_DIR . '/cah-faculty-staff-3.php';
require_once 'cah-faculty-staff-3-admin.php';
require_once 'cah-faculty-staff-3-config.php';

require_once 'lib/class-abstract-wordpress-plugin-helper.php';
require_once 'lib/interface-database-handler.php';
require_once 'lib/trait-database-handler.php';

if( !class_exists( 'CAHFacultyStaffHelper3' ) ) {
    class CAHFacultyStaffHelper3 extends WordPressPluginHelper implements DatabaseHandlerStatic
    {
        use databaseHandlerStaticTrait;

        private static $plugin_name = "cah_faculty_3_";
        private static $plugin_version = "3.0.0";


        private function __construct() {} // Prevents instantiation


        public static function setup() {

            add_action( 'wp_loaded', array( __CLASS__, 'register_scripts' ), 0, 10 );
            add_action( 'the_posts', array( __CLASS__, 'maybe_load_scripts'), 1, 10 );
            
            add_shortcode( 'cah_faculty', array( __CLASS__, 'shortcode' ) );

            add_action( 'wp_ajax_user_detail', array( __CLASS__, 'user_detail_ajax' ), 10, 0 );
            add_action( 'wp_ajax_nopriv_user_detail', array( __CLASS__, 'user_detail_ajax' ), 10, 0 );

            add_action( 'muplugins_loaded', array( __CLASS__, 'deconflict_plugins' ), 10, 0 );
        }


        public static function plugin_activate() {
            CAHFacultyStaffConfig3::config();
            flush_rewrite_rules();
        }


        public static function plugin_deactivate() {
            CAHFacultyStaffConfig3::deconfig();
            flush_rewrite_rules();
        }


        public static function register_scripts() {

            $chunk_name = self::$plugin_name . "_chunk";
            $main_name = self::$plugin_name . "_main";

            $deps = array( 'jquery', 'script' );
            /*
            if( wp_script_is( 'script', 'registered' ) ) {
                $deps[] = 'script';
            }
            */
            wp_register_script( $chunk_name, CAH_FACULTY_3__PLUGIN_URL . "dist/js/chunk_cah-faculty-staff.js", $deps, self::$plugin_version, true );
            wp_register_script( $main_name, CAH_FACULTY_3__PLUGIN_URL . "dist/js/cah-faculty-staff.js", array( $chunk_name ), self::$plugin_version, true );

            wp_register_style( self::$plugin_name . "_style", CAH_FACULTY_3__PLUGIN_URL . "dist/css/cah-faculty-staff.css", array(), self::$plugin_version, 'all' );
        }


        public static function maybe_load_scripts( array $posts ) : array {

            foreach( $posts as $post ) {
                if( stripos( $post->post_content, '[cah_faculty' ) !== false ) {
                    self::_load_scripts();
                    self::_load_styles();
                    break;
                }
            }

            return $posts;
        }


        public static function shortcode( $atts = array() ) : string {
            $a = shortcode_atts( array(
                'format' => 'a-z',
                'include_interests' => 'false',
                'dept' => DEPT,
                'img_format' => 'circle',
                'filterable' => 'true',
                'vertical' => 'false',
                'tiered' => 'false',
                'btn_color' => 'primary',
            ), $atts );

            foreach( $a as $key => $value ) {
                if( 'true' == $value || 'false' == $value ) {

                    $a[$key] = 'true' == $value ? true : false;
                }
            }
            /*
            $a['include_interests'] = $a['include_interests'] == 'true' ? true : false;
            $a['filterable'] = $a['filterable'] == 'true' ? true : false;
            $a['vertical'] = $a['vertical'] == 'true' ? true : false;
            $a['']
            */

            $data = htmlentities( json_encode( $a ) );

            $subdept_list = htmlentities( self::_get_result_json( 'subdept', $a['dept'] ) );
            $faculty_list = htmlentities( self::_get_result_json( 'faculty', $a['dept'] ) );

            ob_start();
            ?>
                <input type="hidden" id="vueData" value="<?= $data ?>">
                <input type="hidden" id="vueSubDept" value="<?= $subdept_list ?>">
                <input type="hidden" id="vueFaculty" value="<?= $faculty_list ?>">

                <div id="vueApp"></div>
            <?php
            return ob_get_clean();
        }


        public static function query( ... $args ) : ?mysqli_result {

            $type = $args[0]; 
            $dept = DEPT;
            $user_id = 0;

            $term = '';
            $aux = '';

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
                    $dept = $args[1];
                    break;
            }

            $data = array(
                $type,
                $dept,
                $user_id,
                $term,
                $aux,
            );

            $sql = self::_get_sql( ... $data );
            $result = mysqli_query( self::_db_get(), $sql );

            if( self::_validate( $result, $sql ) ) return $result;
            else return null;
        }


        public static function _validate( $result, $sql ) : bool {

            if( $result instanceof mysqli_result && $result->num_rows > 0 ) {
                return true;
            }
            else return false;
        }


        public static function user_detail_ajax() {

            if( !check_ajax_referer( 'faculty-staff-ajax', 'security' ) )
                die("You need a new nonce.");
    
            if( !isset( $_POST['user'] ) ) {
                die( "No user ID set." );
            }
    
            $edu = array();
            $pubs = array();
            $courses = '';
    
            $result = self::query( 'edu', $_POST['user'] );
    
            if( !is_null( $result ) ) {
    
                while( $row = mysqli_fetch_assoc( $result ) ) {
    
                    $edu[] = array(
                        'year' => $row['degYear'],
                        'degree' => $row['degree'],
                        'institution' => $row['institution'],
                        'field' => $row['field']
                    );
                }
            }
    
            mysqli_free_result( $result );
    
            $result = self::query( 'pubs', $_POST['user'] );
    
            if( !is_null( $result ) ) {
    
                while( $row = mysqli_fetch_assoc( $result ) ) {
    
                    $pubs[] = array(
                        'pubDate' => $row['pubDate'],
                        'pubType' => $row['pubType'],
                        'forthcoming' => $row['forthcoming'],
                        'citation' => $row['citation']
                    );
                }
            }
    
            mysqli_free_result( $result );

            $courses = self::_get_course_list( $_POST['user'] );
    
            $response = array(
                'edu' => $edu,
                'pubs' => $pubs,
                'courses' => $courses,
            );
    
            echo json_encode( $response );
            self::_db_close();
            die();
        }


        public static function deconflict_plugins() {

            $request_uri = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );

            $is_admin = strpos( $request_uri, '/wp-admin/' );

            if( $is_admin === false ) {

                add_filter( 'option_active_plugins', function( $plugins ) {

                    global $request_uri;

                    if( strpos( $request_uri, '/faculty' ) !== false ) {

                        $target = 'responsive-accordion-and-collapse/responsive-accordion.php';

                        $key = array_search( $target, $plugins );

                        if( $key !== false ) {
                            unset( $plugins[$key] );
                        }
                    }

                    return $plugins;
                });
            }
        }


        protected static function _load_scripts() {
            wp_enqueue_script( self::$plugin_name . "_main" );

            wp_localize_script( self::$plugin_name . "_main", 'wpVars', array(
                    'distUrl' => CAH_FACULTY_3__PLUGIN_URL . "dist/",
                    'ajaxUrl' => admin_url( 'admin-ajax.php' ),
                    'security' => wp_create_nonce( 'faculty-staff-ajax' ),
                ) 
            );
        }


        protected static function _load_styles() {
            wp_enqueue_style( self::$plugin_name . "_style" );
        }


        private static function _get_result_json( $type, $dept ) : ?string {

            $result = self::query( $type, $dept );

            if( $type == 'subdept' ) {
                $subdept_list = array();
                
                while( $row = mysqli_fetch_assoc( $result ) ) {

                    $subdept_list[ strval( $row['id'] ) ] = $row['description'];
                }

                mysqli_free_result( $result );

                return json_encode( $subdept_list );
            }

            if( $type == 'faculty' ) {

                $faculty_list = array();
                $prev_id = 0;

                while( $row = mysqli_fetch_assoc( $result ) ) {

                    if( intval( $row['id'] ) != $prev_id ) {

                        $faculty_list[$row['id']] = array(
                            'lname'          => $row['lname'],
                            'fname'          => $row['fname'],
                            'id'             => $row['id'],
                            'fullName'       => $row['fullName'],
                            'email'          => $row['email'],
                            'phone'          => self::_format_phone_us( $row['phone'] ),
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
                        );

                        $prev_id = $row['id'];
                    }

                    $faculty_list[$row['id']]['subDept'][ strval( $row['subDept'] ) ] = $row['subDeptName'];
                    $faculty_list[$row['id']]['title'][ strval( $row['subDept'] ) ] = $row['title'];
                    $faculty_list[$row['id']]['titleDept'][ strval( $row['subDept'] ) ] = $row['titleDept'];
                    $faculty_list[$row['id']]['titleDeptShort'][ strval( $row['subDept'] ) ] = $row['titleDeptShort'];
                    $faculty_list[$row['id']]['titleGroup'][ strval( $row['subDept'] ) ] = $row['titleGroup'];
                }

                mysqli_free_result( $result );

                return json_encode( $faculty_list );
            }
        }


        private static function _get_course_list( $user_id ) {

            $terms = array();
            $term_courses = array();
            $current_term = '';

            $sql_term = '';
            $sql_aux = '';

            $summer_flag = false;

            $syllabus_url_base = "https://cah.ucf.edu/common/files/syllabi/";

            $result = self::query( 'term' );

            if( $result ) {
                while( $row = mysqli_fetch_assoc( $result ) ) {

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

                if( !empty( $sql_term ) ) $sql_term .= ") ";

                mysqli_free_result( $result );

                $current_term = self::_get_semester();
            }

            $result = self::query( 'courses', $user_id, $sql_term, $sql_aux );

            if( !$result ) {
                mysqli_free_result( $result );
                return array();
            }

            while( $row = mysqli_fetch_assoc( $result ) ) {

                $term_idx = trim( $row['term'] );

                if( stripos( $term_idx, 'summer' ) ) $summer_flag = true;

                if( empty( $term_courses[ $term_idx ] ) ) {

                    ob_start();
                    ?>
                    <table class="table table-condensed table-bordered table-striped volumes" cellspacing="0" title="<?= $term_idx ?> Offered Courses">
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
                    $term_courses[ $term_idx ] = ob_get_clean();
                }

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
                                    <a href="<?= $syllabus_url_base . str_replace( " ", "", $row['catalogref'] ) . $row['section'] . $row['term'] . '.pdf' ?>" rel="external">Available</a>
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
                $term_courses[ $term_idx ] .= ob_get_clean();
            }

            mysqli_free_result( $result );

            ob_start();
            ?>
            <div class="container" style="width: 100%">
                <ul class="nav nav-tabs" id="courseTab" role="tablist">
            <?php
            $term_labels = str_replace( ' ', '', $terms );

            for( $c = 0; $c < count( $terms ); $c++ ) {
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

            for( $c = 0; $c < count( $terms ); $c++ ) {
                ?>
                    <div class="pt-3 tab-pane <?= $c == 0 ? 'active' : '' ?>" id="<?= $term_labels[$c] ?>" role="tabpanel">

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

            return ob_get_clean();
        }


        private static function _get_sql( $type, $dept, $user_id, $term, $aux ) : ?string {

            $sql = '';

            switch( $type ) {
                case 'subdept':
                    $sql = self::_subdept_sql( $dept );
                    break;

                case 'faculty':
                    $sql = self::_faculty_sql( $dept );
                    break;

                case 'edu':
                    $sql = self::_get_edu( $user_id );
                    break;

                case 'pubs':
                    $sql = self::_get_pubs( $user_id );
                    break;

                case 'term':
                    $sql = self::_get_terms();
                    break;

                case 'courses':
                    $sql = self::_get_courses( $user_id, $term, $aux );
                    break;
                
                default:
                    return null;
            }

            return $sql;
        }


        private static function _subdept_sql( $dept ) : string {
            return "SELECT id, `description` FROM cah.academic_categories WHERE department_id IN( $dept, 3 ) ORDER BY (CASE WHEN id = 74 THEN 0 WHEN id = 75 THEN 1 ELSE 2 END), career_level DESC, `description`";
        }


        private static function _faculty_sql( $dept ) : string {
            return "SELECT DISTINCT u.id, u.lname, u.fname, CONCAT_WS(' ', u.fname, u.mname, u.lname) AS fullName, u.email, u.phone, t.description AS title, ud.prog_title_dept AS titleDept, ud.prog_title_dept_short AS titleDeptShort, t.title_group AS titleGroup, IF(u.photo_extra IS NOT NULL, CONCAT(u.photo_path, u.photo_extra), u.photo_path) AS photoUrl, u.interests, a.academic_id AS subDept, ac.description AS subDeptName, u.activities, u.awards, u.research, u.has_cv, u.homepage, u.biography AS bio, u.office, r.room, r.`desc`, r.building FROM cah.users AS u LEFT JOIN cah.users_departments AS ud ON u.id = ud.user_id LEFT JOIN cah.titles AS t ON t.id = ud.title_id LEFT JOIN cah.academics AS a ON a.user_id = u.id LEFT JOIN cah.academic_categories AS ac ON ac.id = a.academic_id LEFT JOIN ( SELECT rooms.id, rooms.room_number AS room, buildings.short_description AS `desc`, buildings.building_number AS building FROM cah.rooms LEFT JOIN buildings ON rooms.building_id = buildings.id) AS r ON r.id = u.room_id WHERE ud.department_id = $dept AND u.active = 1 AND u.show_web = 1 AND ud.affiliation = 'active' ORDER BY u.lname, u.fname";
        }


        private static function _get_edu( $user_id ) : string {
            return "SELECT education.field, education.institution, education.year AS degYear, `degrees`.short_description AS `degree` FROM cah.education LEFT JOIN cah.degrees ON education.degrees_id = `degrees`.id WHERE education.user_id = $user_id ORDER BY education.year";
        }


        private static function _get_pubs( $user_id ) {
            return "SELECT pubs.forthcoming, DATE_FORMAT( pubs.publish_date, '%M %Y' ) AS pubDate, pub_cats.plural_description AS pubType, pubs.citation FROM cah.publications AS pubs LEFT JOIN cah.publications_categories AS pub_cats ON pubs.publication_id = pub_cats.id WHERE pubs.user_id = $user_id AND approved = 1 ORDER BY pub_cats.level, pub_cats.plural_description, pubs.publish_date DESC";
        }


        private static function _get_terms() {
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


        private static function _get_courses( $user_id, $term, $aux ) {
            
            return "SELECT courses.id, number, IF( description IS NULL, \"No Description Available\", description ) AS description, CONCAT( prefix, catalog_number ) AS catalogref, syllabus_file, term, section, title, instruction_mode, session, CONCAT( meeting_days, ' ', class_start, ' - ', class_end ) AS dateandtime FROM courses LEFT JOIN users ON courses.user_id = users.id WHERE $term$aux AND ( user_id = $user_id OR suser_id = $user_id ) ORDER BY term, catalogref, title, number";
        }


        private static function _format_phone_us( $phone ) : string {
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


        private static function _get_semester() {

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
    }
}
?>