<?php

abstract class WordPressPluginHelper
{
    // Public:
    public abstract static function setup();
    public abstract static function plugin_activate();
    public abstract static function plugin_deactivate();
    public abstract static function register_scripts();
    public abstract static function maybe_load_scripts( array $posts ) : array;
    public abstract static function shortcode( $atts ) : string;

    // Protected:
    protected abstract static function _load_scripts();
    protected abstract static function _load_styles();
}
?>