<?php

trait databaseHandlerStaticTrait
{
    protected static $_db_connection;
    
    protected static function _db_get() : ?mysqli {
        if( is_null( self::$_db_connection ) ) {
            global $db_server, $db_user, $db_pass, $db, $db_charset;

            self::$_db_connection = mysqli_connect( $db_server, $db_user, $db_pass, $db );
            
            if( self::$_db_connection !== false ) {
                self::$_db_connection->set_charset( $db_charset );
            }
            else {
                self::$_db_connection = null;
            }
        }
        return self::$_db_connection;
    }


    protected static function _db_close() {
        if( !is_null( self::$_db_connection ) ) {
            mysqli_close( self::$_db_connection );
            self::$_db_connection = null;
        }
    }
}
?>