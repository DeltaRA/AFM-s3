<?php

require 'autoload_afm.php';

$path = $_POST['p'];
$isFolder = $_POST['f'];

try {
    if ($isFolder == 0) {
        $cmd = $s3->getCommand('GetObject', [
            'Bucket' => $bucket,
            'Key' => $path,
        ]);

        $request = $s3->createPresignedRequest($cmd, '5 minutes');
        $presignedUrl = (string) $request->getUri();
        echo $presignedUrl;
    } else {
        $name = explode('/', $path);
        $name = $name[Count($name) - 2];

        $tmp = time();
        $basePath = 'tmp/' . $tmp . "/" . $path;
        $s3->downloadBucket($basePath, $bucket, $path);

        $zip_file_name = 'tmp/' . $tmp . '/' . $name . '.zip';

        $za = new FlxZipArchive;
        $res = $za->open($zip_file_name, ZipArchive::CREATE);
        if ($res === true) {
            $za->addDir($basePath, basename($basePath));
            $za->close();
        } else {echo 'Could not create a zip archive';}

        echo 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . '/' . $zip_file_name;

    }
} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}

class FlxZipArchive extends ZipArchive
{
    /** Add a Dir with Files and Subdirs to the archive;;;;; @param string $location Real Location;;;;  @param string $name Name in Archive;;; @author Nicolas Heimann;;;; @access private  **/
    public function addDir($location, $name)
    {
        $this->addEmptyDir($name);
        $this->addDirDo($location, $name);
    } // EO addDir;

    /**  Add Files & Dirs to archive;;;; @param string $location Real Location;  @param string $name Name in Archive;;;;;; @author Nicolas Heimann * @access private   **/
    private function addDirDo($location, $name)
    {
        $name .= '/';
        $location .= '/';
        // Read all Files in Dir
        $dir = opendir($location);
        while ($file = readdir($dir)) {
            if ($file == '.' || $file == '..') {
                continue;
            }

            // Rekursiv, If dir: FlxZipArchive::addDir(), else ::File();
            $do = (filetype($location . $file) == 'dir') ? 'addDir' : 'addFile';
            $this->$do($location . $file, $name . $file);
        }
    }
}
