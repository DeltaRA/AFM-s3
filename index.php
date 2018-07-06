<html>
<head>
<link rel="stylesheet" href="css/afm.css">

<link rel="stylesheet" type="text/css" href="plugins/DataTables/datatables.min.css"/>

</head>
<body style="width: 80%; margin: 0 auto;">
    <div id="afm-body" >
        <div id="afm-toolbar">
            <div class="afm-toolbar-item">
                <img src="img/icons/icons8-new-folder.png" />
                <span>New Folder</span>
            </div>
            <div class="afm-toolbar-item">
                <img src="img/icons/icons8-download.png" />
                <span>Download</span>
            </div>
            <div class="afm-toolbar-item">
                <img src="img/icons/icons8-upload.png" />
                <span>Upload</span>
            </div>
        </div>
        <div id="afm-sidebar">
            <div class="afm-sidebar-item">
                <img src="img/icons/icons8-folder.png" />
                <span>Home</span>
            </div>
            <div class="afm-sidebar-item">
                <img src="img/icons/icons8-folder.png" />
                <span>Folder A</span>
            </div>
            <div class="afm-sidebar-item">
                <img src="img/icons/icons8-folder.png" />
                <span>Folder B</span>
            </div>
        </div><!--
--><div id="afm-content">
            <table id="example" class="hover row-border" style="width:75%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>tmp.zip</td>
                        <td>11/12/2017 16:59</td>
                        <td>700 KB</td>
                    </tr>
                    <tr>
                        <td>tmp.zip</td>
                        <td>11/12/2017 16:59</td>
                        <td>700 KB</td>
                    </tr>
                    <tr>
                        <td>tmp.zip</td>
                        <td>11/12/2017 16:59</td>
                        <td>700 KB</td>
                    </tr>
                    <tr>
                        <td>Cartella A</td>
                        <td>11/12/2017 16:59</td>
                        <td>700 KB</td>
                    </tr>
                    <tr>
                        <td>Cartella B</td>
                        <td>01/04/2018 13:14</td>
                        <td>70.5 MB</td>
                    </tr>
                    <tr>
                        <td>Cartella C</td>
                        <td>11/12/2017 16:59</td>
                        <td>700 KB</td>
                    </tr>
                    <tr>
                        <td>Cartella D</td>
                        <td>11/12/2017 16:59</td>
                        <td>100 KB</td>
                    </tr>
                    <tr>
                        <td>Cartella E</td>
                        <td>11/12/2017 16:59</td>
                        <td>500 KB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                    <tr>
                        <td>image.png</td>
                        <td>21/06/2018 18:56</td>
                        <td>1.3 MB</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="plugins/DataTables/datatables.min.js"></script>
<script>
$(document).ready(function() {
    $('#example').DataTable({
        "scrollY":        "80vh",
        "scrollCollapse": true,
        "paging":         false,
        "info": false,
        "searching": false,
        "columnDefs": [
        { className: "afm-right", "targets": [1,2] },
        ]
    });
} );
</script>
</html>
 