# CAH Faculty Staff Plugin v3.0

A WordPress plugin that provides a faculty/staff index page for the CAH family of sites. Powered by VueJS and Vuex.

## How to Use This Plugin

This is a shortcode-driven plugin. The shortcode keyword is: `[cah_faculty]`. When you use it, you should also specify a department number with the `dept` attribute. If you don't know which department number you need, contact [CAH Web](mailto:cahweb@ucf.edu).

There are quite a few different attributes you can use. They are as follows:

* `dept`: As mentioned above, this is the department number for the department whose faculty you want to display.
* `img_format`: This determines how faculty portraits appear. For the moment, the two settings are `circle` for a circular portrait and `rounded` for a rounded square. Defaults to `circle`.
* `filterable`: This determines whether the filter menu appears on the left-hand side of the page, for sorting faculty by subdepartment. If set to `false`, there will be two buttons at the top which will allow the user to switch between a list with portraits or a simple, text-based list. Defaults to `true`.
* `format`: Determines whether the alphabetically-sorted list of faculty members which first appears includes faculty portraits. Recognized values are either `a-z` or `picture`. Defaults to `a-z`. *Note: the `picture` setting works best if `filterable` is set to `false`.*
* `include_interests`: Whether to include a shortened version of each faculty member's listed research interests, if any. Defaults to `false`.
* `vertical`: Determines whether the filter menu appears to the left of the faculty display or above it. Defaults to `false`.
* `tiered`: Determines whether to sort the entries by Full-Time, Part-Time, and Staff categories. Works best with `format` set to `'picture'` and `filterable` set to `false`. Defaults to `false`.
* `btn_color`: Determines which button color class to attach to the filter buttons, corresponding to the color classes defined in the [Athena Framework](https://ucf.github.io/Athena-Framework/components/buttons/). Default is `primary`. Other options are:
  * `default`
  * `secondary`
  * `complementary`
  * `success`'
  * `info`
  * `warning`
  * `danger`
  * `inverse`
  * `link`