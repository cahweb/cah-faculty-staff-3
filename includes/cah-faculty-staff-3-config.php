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
            self::_add_options();
        }


        public static function deconfig() {
            self::_delete_options();
        }


        private static function _add_options() {
            extract( self::$_option_defaults );

            add_option( self::$option_prefix . 'dept', $dept );
            add_option( self::$option_prefix . 'interests', $dept );
            add_option( self::$option_prefix . 'img_type', $img_type );
        }


        private static function _delete_options() {

            delete_option( self::$option_prefix . 'dept' );
            delete_option( self::$option_prefix . 'interests' );
            delete_option( self::$option_prefix . 'img_type' );
        }
    }
}
?>