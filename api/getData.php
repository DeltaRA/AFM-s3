<?php

use function GuzzleHttp\json_encode;

require 'autoload_afm.php';

$objects = $s3->getIterator('ListObjects', array(
    'Bucket' => 'afm-s3',
    'Prefix' => '',
));

$data = array();
$folders = array();
foreach ($objects as $object) {
    if (count(explode('/', $object['Key'])) > 1) {
        $folders = checkFolder($object['Key'], $folders);
        $key = explode('/', $object['Key']);
        $x = strlen($key[Count($key) - 1]) * -1;
        if ($x != 0) {
            $folder = substr($object['Key'], 0, $x);
            $date = $object['LastModified']->format(\DateTime::ISO8601);
            $new_date = dateFormat($date);
            $name = getName($object['Key']);
            $size = getSize($object['Size']);
            $icon = getIcon($name);
            $data[$folder][] = array("id" => $object['Key'], "name" => $name, "size" => array("value"=>$size,'bytes'=>$object['Size']), "date" => $new_date, "icon" => $icon);
        }
    } else {
        $date = $object['LastModified']->format(\DateTime::ISO8601);
        $new_date = dateFormat($date);
        $name = getName($object['Key']);
        $size = getSize($object['Size']);
        $icon = getIcon($name);
        $data['root'][] = array("id" => $object['Key'], "name" => $name, "size" => array("value"=>$size,'bytes'=>$object['Size']), "date" => $new_date, "icon" => $icon);
    }
}
//var_dump($folders);
$data = getFolders($folders, $data);
echo json_encode($data);

function checkFolder($key, $folders)
{
    $tmp = $key;
    $list = explode('/', $key);
    $f = array_reverse($list);
    for ($i = 0; $i < Count($list) - 1; $i++) {
        $x = strlen($f[$i]) * -1;
        if ($i != 0) {
            $x--;
        }
        if ($x != 0) {
            $tmp = substr($tmp, 0, $x);
        }
        if (in_array($tmp, $folders)) {

        } else {
            $folders[] = $tmp;
        }
    }
    return $folders;
}
function getFolders($folders, $data)
{
    $icon = 'folder';
    sort($folders);
    $folders = array_reverse($folders);
    foreach ($folders as $folder) {
        $size = 0;
        $date = date("d.m.Y H:i:s", 0);
        if (array_key_exists($folder,$data)) {
            foreach ($data[$folder] as $value) {
                $size += $value['size']['bytes'];
                if ($date < $value['date']) {
                    $date = $value['date'];
                }
            }
        } else {
            $data[$folder][] = array("id" => $folder."/empty_folder", "name" => 'empty_folder', "size" => array("value"=>0,'bytes'=>0), "date" => "-", "icon" => 'file');
        }
        if($date == '01.01.1970 00:00:00'){
            $date = '-';
        }
        $name = explode('/', $folder);
        $name = $name[Count($name) - 2];
        $x = (strlen($name) + 1) * -1;
        $parent = substr($folder, 0, $x);
        if ($parent == '' || $parent == null || $parent == ' ') {
            $data['root'][] = array("id" => $folder, "name" => $name, "size" => array("value"=>getSize($size),'bytes'=>$size), "date" => $date, "icon" => $icon);
        } else {
            $data[$parent][] = array("id" => $folder, "name" => $name, "size" => array("value"=>getSize($size),'bytes'=>$size), "date" => $date, "icon" => $icon);
        }
    }

    return $data;
}
function dateFormat($date)
{
    $date = explode('+', $date)[0];
    $date = explode('T', $date);
    $date = $date[0] . ' ' . $date[1];
    $date = strtotime($date);

    $new_date = date("d.m.Y H:i:s", strtotime('+2 hours', $date));

    return $new_date;
}
function getName($name)
{
    $name = explode('/', $name);
    $name = $name[Count($name) - 1];

    return $name;
}
function getSize($bytes, $precision = 2)
{
    $units = array('B', 'KB', 'MB', 'GB', 'TB');

    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= pow(1024, $pow);

    return round($bytes, $precision) . ' ' . $units[$pow];
}
function getIcon($name)
{
    $ext = explode('.', $name);
    if (Count($ext) < 2 || Count($ext) > 2) {
        $icon = 'file';
    } else {
        switch (strtolower($ext[1])) {
            case 'mp3':
                $icon = 'mp3';
                break;
            case 'apk':
                $icon = 'apk';
                break;
            case 'zip':
                $icon = 'archive';
                break;
            case 'rar':
                $icon = 'archive';
                break;
            case '7z':
                $icon = 'archive';
                break;
            case 'tar':
                $icon = 'archive';
                break;
            case 'avi':
                $icon = 'avi';
                break;
            case 'css':
                $icon = 'css';
                break;
            case 'csv':
                $icon = 'csv';
                break;
            case 'dll':
                $icon = 'dll';
                break;
            case 'exe':
                $icon = 'exe';
                break;
            case 'flv':
                $icon = 'flv';
                break;
            case 'html':
                $icon = 'html';
                break;
            case 'png':
                $icon = 'image';
                break;
            case 'jpeg':
                $icon = 'image';
                break;
            case 'jpg':
                $icon = 'image';
                break;
            case 'gif':
                $icon = 'image';
                break;
            case 'pptx':
                $icon = 'mpp';
                break;
            case 'pptm':
                $icon = 'mpp';
                break;
            case 'ppt':
                $icon = 'mpp';
                break;
            case 'mov':
                $icon = 'mov';
                break;
            case 'ogg':
                $icon = 'ogg';
                break;
            case 'ps':
                $icon = 'ps';
                break;
            case 'psd':
                $icon = 'psd';
                break;
            case 'txt':
                $icon = 'txt';
                break;
            case 'wav':
                $icon = 'wav';
                break;
            case 'doc':
                $icon = 'word';
                break;
            case 'docx':
                $icon = 'word';
                break;
            case 'docm':
                $icon = 'word';
                break;
            case 'xls':
                $icon = 'xls';
                break;
            case 'xlsx':
                $icon = 'xls';
                break;
            case 'xlsm':
                $icon = 'xls';
                break;
            case 'xml':
                $icon = 'xml';
                break;
            default:
                $icon = 'file';
        }

    }
    return $icon;
}
