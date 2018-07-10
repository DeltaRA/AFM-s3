<?php

require 'autoload_afm.php';

$path = $_POST['p'];

try {
    $result = $s3->doesObjectExist($bucket, $path);
    if ($result) {
        echo 'Folder exists';
    } else {
        $s3->putObject(array(
            'Bucket' => $bucket,
            'Key' => $path,
            'Body' => "",
        ));
    }
} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}
