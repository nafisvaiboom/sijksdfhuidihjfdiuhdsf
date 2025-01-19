<?php
$mod_rewrite = in_array('mod_rewrite', apache_get_modules());
$mod_headers = in_array('mod_headers', apache_get_modules());
$mod_expires = in_array('mod_expires', apache_get_modules());
$mod_deflate = in_array('mod_deflate', apache_get_modules());

echo "Apache Module Status:\n";
echo "mod_rewrite: " . ($mod_rewrite ? "Enabled" : "Disabled") . "\n";
echo "mod_headers: " . ($mod_headers ? "Enabled" : "Disabled") . "\n";
echo "mod_expires: " . ($mod_expires ? "Enabled" : "Disabled") . "\n";
echo "mod_deflate: " . ($mod_deflate ? "Enabled" : "Disabled") . "\n";
?>