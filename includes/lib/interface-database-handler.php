<?php

interface DatabaseHandlerStatic
{
    public static function query( ... $args ) : ?mysqli_result;
    public static function _validate( $result, $sql ) : bool;
}
?>