<?php

if( !class_exists( 'CAHFacultyStaffConfig3' ) ) {
    class CAHFacultyStaffConfig3
    {

        private static $option_prefix = "cah_faculty_3_";
        private static $_option_defaults = array(
            'dept' => 11,
            'interests' => 1,
            'img_type' => 'circle'
        );

        public static function config() {
            //self::_add_options();
        }


        public static function deconfig() {
            self::_delete_options();
        }


        private static function _add_options() {
            // Add any necessary options here.
        }


        private static function _delete_options() {
            // Delete unnecesary options here.
        }
    }
}
?>