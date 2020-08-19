<?php
/**
 * An abstract class to help structure a standard WordPress plugin. Just
 * extend the class and implement the methods. This class assumes you
 * have a shortcode to use and conditional scripts to load per page--
 * maybe I should turn those into a trait?
 */
abstract class WordPressPluginHelper
{
    // Public:

    // Should handle action hooks, shortcode calls, and/or filters.
    public abstract static function setup();

    // Anything special that the plugin needs to do when it's first
    // activated, like registering options.
    public abstract static function plugin_activate();

    // Anything special the plugin needs to do when it's deactivated,
    // like deleting options that the user no longer needs.
    public abstract static function plugin_deactivate();

    // Register any scripts. Usually called from setup(), but doesn't
    // have to be.
    public abstract static function register_scripts();

    // Check to see if we need to load the scripts we registered or not
    // (helps decrease network overhead by not loading scripts and
    // stylesheets where they won't be used).
    public abstract static function maybe_load_scripts( array $posts ) : array;

    // Register our shortcode's default settings and behaviors.
    public abstract static function shortcode( $atts = [] ) : string;

    // Protected:

    // Separate functions to load our scripts and styles
    protected abstract static function _load_scripts();
    protected abstract static function _load_styles();
}
?>