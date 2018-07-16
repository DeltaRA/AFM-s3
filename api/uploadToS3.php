<?php

require 'autoload_afm.php';

$path = $_POST['p'];
$source = $_POST['s'];
try {
    $result = $s3->putObject(array(
        'Bucket' => $bucket,
        'Key' => $path,
        'SourceFile' => 'tmp/'.$source,
    ));
} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}
