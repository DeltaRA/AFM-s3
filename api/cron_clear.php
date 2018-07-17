<?php
/*
* cron_clear.php
* Delete all tmp files used for downloads and uploads
* This script must be run with a cronjob
*
* @author Ruben Sala (DeltaRA)
*/

recursive_rmdir('./tmp/');

/**
 * Remove directory recursively.
 *
 * @param string $dirPath Directory you want to remove.
 */
function recursive_rmdir($dirPath)
{
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dirPath, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST) as $path) {
        $pathName = $path->getPathname();

        ($path->isDir() and ($path->isLink() === false)) ? rmdir($pathName) : unlink($pathName);
    }
}