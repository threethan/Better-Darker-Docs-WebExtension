# Better Darker Docs
Provides custom scripts and styles to give the google docs suite a proper dark mode, including subpixel hinting (ClearType/TrueType) on text in docs and sheets.
*Subpixel hinting relies on the `moz-opaque` property and will only work in Firefox. This may cause slight inconsistencies in document layout.*

Since this hooks document rendering (through canvas function overrides), document appearance will be much more accurate than css-only modifications offered by other extensions.

Licenced under the MIT LICENSE