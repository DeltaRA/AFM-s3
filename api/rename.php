<?php

require 'autoload_afm.php';

$old = $_POST['o'];
$new = $_POST['n'];
$isFolder = $_POST['f'];

try {
    $result = $s3->doesObjectExist($bucket, $new);
    if ($result) {
        echo 'Name exists';
    } else {
        if ($isFolder == 0) {
            $s3->copyObject(array(
                'Bucket' => $bucket,
                'Key' => $new,
                'CopySource' => "{$bucket}/{$old}",
            ));

            $s3->deleteObject(array(
                'Bucket' => $bucket,
                'Key' => $old,
            ));
        } else {
            $objects = $s3->getIterator('ListObjects', array('Bucket' => $bucket, 'Prefix' => $old));
            foreach ($objects as $object) {
                $tmp = '**' . $object['Key'];
                $tmpSource = '**' . $old;
                $newPath = str_replace($tmpSource, $new, $tmp);
                $s3->copyObject(array(
                    'Bucket' => $bucket,
                    'Key' => $newPath,
                    'CopySource' => "{$bucket}/{$object['Key']}",
                ));
            }
            $s3->deleteMatchingObjects($bucket, $old);
        }
    }
} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}
