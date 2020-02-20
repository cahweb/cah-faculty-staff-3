<?php
/**
 * A trait that implements two database interaction methods, and adds
 * a static member variable to hold the mysqli connection object. Done
 * as a trait because this syntax and behavior is common across almost
 * all of the CAH web apps and plugins that interact with databases.
 */
trait databaseHandlerStaticTrait
{
    // Holds the mysqli object that represents the database connection
    protected static $_db_connection;
    

    /**
     * Opens a connection to a database. For security purposes, the
     * global $db_[x] variables should be defined elsewhere--ideally
     * in a separate file.
     *
     * @return mysqli|null  Returns the mysqli connection object, or null
     *                          if there's an error.
     */
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


    /**
     * Closes the database connection and clears out the $_db_connection
     * member variable.
     *
     * @return void
     */
    protected static function _db_close() {
        if( !is_null( self::$_db_connection ) ) {
            mysqli_close( self::$_db_connection );
            self::$_db_connection = null;
        }
    }
}
?>