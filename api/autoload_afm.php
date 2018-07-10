<?php

require '../vendor/aws-autoloader.php';

include 'key.php';

use Aws\S3\S3Client;

//Inizializzo il framework AWS SDK
$s3 = S3Client::factory(array(
    'credentials' => [
        'key' => $access_key,
        'secret' => $access_secret,
    ],
    'region' => 'eu-central-1',
    'version' => "latest",
));

$bucket = "afm-s3";
