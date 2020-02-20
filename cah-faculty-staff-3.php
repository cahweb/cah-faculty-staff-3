<?php
/**
 * Plugin Name: CAH Faculty/Staff
 * Description: A newer, faster version of the faculty/staff plugin, powered by Vuex
 * Plugin URI: https://github.com/cahweb/cah-faculty-staff-3
 * Author: Mike W. Leavitt
 * Author URI: https://github.com/Tig3r4ce
 * Version: 3.0.0
 */

// Define some useful constants.
define( 'CAH_FACULTY_3__PLUGIN_FILE', __FILE__ );
define( 'CAH_FACULTY_3__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CAH_FACULTY_3__PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load our static helper class (it will load the others it needs)
require_once 'includes/cah-faculty-staff-3-helper.php';

// Run this on plugin activation
register_activation_hook( CAH_FACULTY_3__PLUGIN_FILE, array( 'CAHFacultyStaffHelper3', 'plugin_activate') );

// Run this on plugin deactivation
register_deactivation_hook( CAH_FACULTY_3__PLUGIN_FILE, array( 'CAHFacultyStaffHelper3', 'plugin_deactivate' ) );

// Assign CAHFacultyStaffHelper3::setup() to the 'init' hook
add_action( 'init', array( 'CAHFacultyStaffHelper3', 'setup' ), 0, 10 );

?>