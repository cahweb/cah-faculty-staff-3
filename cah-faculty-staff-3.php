<?php
/**
 * Plugin Name: CAH Faculty/Staff (Vuex)
 * Description: A newer, faster version of the faculty/staff plugin, powered by Vuex
 * Author: Mike W. Leavitt
 * Version: 0.0.1
 */

define( 'CAH_FACULTY_3__PLUGIN_FILE', __FILE__ );
define( 'CAH_FACULTY_3__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CAH_FACULTY_3__PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once 'includes/cah-faculty-staff-3-helper.php';

register_activation_hook( CAH_FACULTY_3__PLUGIN_FILE, array( 'CAHFacultyStaffHelper3', 'plugin_activate') );
register_deactivation_hook( CAH_FACULTY_3__PLUGIN_FILE, array( 'CAHFacultyStaffHelper3', 'plugin_deactivate' ) );

add_action( 'plugins_loaded', function() {
    if( !defined( 'DEPT' ) ) {
        $dept = get_option( 'cah_faculty_3_dept' );
    
        if( !empty( $dept ) ) {
            define( 'DEPT', $dept );
        }
        else exit( 'DEPT constant not defined and option not set.' );
    }
}, 0, 10);
add_action( 'init', array( 'CAHFacultyStaffHelper3', 'setup' ), 0, 10 );

?>