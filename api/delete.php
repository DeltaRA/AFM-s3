<?php

require 'autoload_afm.php';

$path = $_POST['p'];
$isFolder = $_POST['f'];

try {
    if ($isFolder == 0) {
        $s3->deleteObject(array(
            'Bucket' => $bucket,
            'Key'    => $path
        ));
    } else {
        $s3->deleteMatchingObjects($bucket, $path);
    }


} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}
