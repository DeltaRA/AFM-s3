<?php

require '../vendor/aws-autoloader.php';

include 'access_credentials.php';

use Aws\S3\S3Client;


$s3 = S3Client::factory(array(
    'credentials' => [
        'key' => $access_key,
        'secret' => $access_secret,
    ],
    'region' => $region,
    'version' => "latest",
));


