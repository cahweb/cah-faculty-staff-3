<?php
/**
 * An interface to signify that a class will be regularly interacting
 * with a database. Doing this for thoroughness, and so I can
 * theoretically check whether something is a DatabaseHandlerStatic in
 * the future.
 */
interface DatabaseHandlerStatic
{
    // Queries the database--how you do that is up to you, though
    // this is also designed to be used in concert with the
    // DatabaseHandler trait.
    public static function query( ... $args ) : ?mysqli_result;

    // Validates the query. Also up to you how you want to do that,
    // since different apps/plugins will be making different kinds of
    // queries.
    public static function _validate( $result, $sql ) : bool;
}
?>