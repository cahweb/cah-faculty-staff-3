<?php
/**
 * Plugin Name: CAH Faculty/Staff
 * Description: A newer, faster version of the faculty/staff plugin, powered by Vuex
 * Plugin URI: https://github.com/cahweb/cah-faculty-staff-3
 * Author: Mike W. Leavitt
 * Author URI: https://github.com/Tig3r4ce
 * Version: 3.0.0
 */

define( 'CAH_FACULTY_3__PLUGIN_FILE', __FILE__ );
define( 'CAH_FACULTY_3__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CAH_FACULTY_3__PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once 'includes/cah-faculty-staff-3-helper.php';

register_activation_hook( CAH_FACULTY_3__PLUGIN_FILE, array( 'CAHFacultyStaffHelper3', 'plugin_activate') );
register_deactivation_hook( CAH_FACULTY_3__PLUGIN_FILE, array( 'CAHFacultyStaffHelper3', 'plugin_deactivate' ) );

add_action( 'init', array( 'CAHFacultyStaffHelper3', 'setup' ), 0, 10 );

?>