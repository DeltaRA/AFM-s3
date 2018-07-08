<html>
<head>
<link rel="stylesheet" href="css/afm.css">
<link rel="stylesheet" href="plugins/fontawesome/css/all.css">
<link rel="stylesheet" type="text/css" href="plugins/DataTables/DataTables-1.10.18/css/jquery.datatables.min.css"/>

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
            <div class="afm-toolbar-item afm-right" onclick="toggleViewSquare()">
                <i class="fas fa-th"></i>
            </div>
            <div class="afm-toolbar-item afm-right" onclick="toggleViewList()">
                <i class="fas fa-th-list"></i>
            </div>
        </div>
        <div id="afm-sidebar">
            <div class="afm-sidebar-item">
                <img src="img/icons/icons8-folder.png" />
                <span>Home</span>
            </div>
        </div><!--
--><div id="afm-content">
            <div id="afm-square">
            </div>
            <table id="file-list" class="hover row-border" style="width:75%;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</body>
<script type="text/javascript" src="plugins/jquery/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="plugins/DataTables/DataTables-1.10.18/js/jquery.datatables.min.js"></script>
<script type="text/javascript" src="js/afm.js"></script>
</html>
 