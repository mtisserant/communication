<?php
// file path control
if (!isset($_GET['badge']) || !preg_match('/^[a-z]+$/', $_GET['badge']) || !isset($_GET['format']) || !preg_match('/^[a-z0-9]+$/', $_GET['format'])) {
    header('HTTP/1.0 400 Bad Request', true, 400);
    die('invalid data : '.__LINE__);
}

// file content check
$svg = file_get_contents('banners/'.$_GET['format'].'/'.$_GET['badge'].'.svg');
if (!$svg) {
    header('HTTP/1.0 400 Bad Request', true, 400);
    die('invalid data : '.__LINE__);
}

// colors check
$colorNames = array('primaryColor', 'secondaryColor', 'ternaryColor');
foreach ($colorNames as $colorName) {
    if (!isset($_GET[$colorName]) || !preg_match('/^(?:[0-9a-fA-F]{3}){1,2}$/', $_GET[$colorName])) {
        header('HTTP/1.0 400 Bad Request', true, 400);
        die('invalid data : '.__LINE__);
    }
    ${$colorName} = '#'.$_GET[$colorName];
}

// update colors
// SVG paths are stylised through CSS, with three colors
// SVG is loaded as a string here so we use a simple string function to change colors
// color codes (#012345, #56789a, #abcdef) have been chosen to avoid collision with other data
// but who knows
$svg = str_replace('#012345', $primaryColor, $svg); 
$svg = str_replace('#56789a', $secondaryColor, $svg); 
$svg = str_replace('#abcdef', $ternaryColor, $svg); 

$image = new Imagick();
$image->setBackgroundColor(new ImagickPixel('transparent'));
$image->readImageBlob($svg);
$image->setImageFormat("png24");

header('Content-type:image/png');
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"PHPTourLyon2014_banner_728x90.png\"");
echo $image->getImage();

$image->clear();
$image->destroy();
