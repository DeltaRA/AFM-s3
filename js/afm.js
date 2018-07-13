// initialisation
/********************************/
var viewMode = 0; // 0 = List, 1 = Square
var dataTable, json, json_tmp;
var path_folder = ['root'];
var path_position = 0;

$(document).ready(function() {
    $.getJSON("api/getData.php", function(data) {
        console.log(data);
        json = data;
        json_tmp = json['root'].slice();
        json_tmp.reverse();
        for (let i = 0; i < json_tmp.length; i++) {
            if (json_tmp[i]['id'].slice(-1) == '/') {
                $('#afm-sidebar').append('<div class="afm-sidebar-item" data-file-path="' + json_tmp[i]['id'] + '"><img src="img/icons/icons8-folder.png" /><span> ' + json_tmp[i]['name'] + '</span></div>')
            }
            addRow(json_tmp[i]);
        }
        var sidebar = document.getElementsByClassName("afm-sidebar-item");
        var dblclickSquare = function() {
            path_position++
            if (path_position <= path_folder.length) {
                path_folder = path_folder.slice(0, path_position + 1);
            }
            openFolder(this.getAttribute('data-file-path'))
        };
        for (var i = 0; i < sidebar.length; i++) {
            sidebar[i].addEventListener('click', dblclickSquare, false);
        }
        createTable();
    });

    $.contextMenu({
        selector: '#afm-content',
        callback: function(key, options) {
            switch (key) {
                case 'edit':
                    rename();
                    break;
                case 'cut':
                    console.log('cu')
                    break;
                case 'copy':
                    console.log('co')
                    break;
                case 'paste':
                    console.log('p')
                    break;
                case 'download':
                    download();
                    break;

                default:
                    break;
            }
        },
        items: {
            "edit": {
                name: "Rename",
                icon: "fas fa-edit"
            },
            "cut": {
                name: "Cut",
                icon: "fas fa-cut"
            },
            copy: {
                name: "Copy",
                icon: "fas fa-copy"
            },
            "paste": {
                name: "Paste",
                icon: "fas fa-paste"
            },
            "sep1": "---------",
            "download": {
                name: "Download",
                icon: "fas fa-download"
            },
        }
    });

    $('.context-menu-one').on('click', function(e) {
        console.log('clicked', this);
    })
});
/********************************/

// Table Sorting
/********************************/
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "de_datetime-asc": function(a, b) {
        var x, y;
        if (jQuery.trim(a) !== '') {
            var deDatea = jQuery.trim(a).split(' ');
            var deTimea = deDatea[1].split(':');
            var deDatea2 = deDatea[0].split('.');
            if (typeof deTimea[2] != 'undefined') {
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1] + deTimea[2]) * 1;
            } else {
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            }
        } else {
            x = -Infinity;
        }

        if (jQuery.trim(b) !== '') {
            var deDateb = jQuery.trim(b).split(' ');
            var deTimeb = deDateb[1].split(':');
            deDateb = deDateb[0].split('.');
            if (typeof deTimeb[2] != 'undefined') {
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1] + deTimeb[2]) * 1;
            } else {
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            }
        } else {
            y = -Infinity;
        }
        var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
        return z;
    },

    "de_datetime-desc": function(a, b) {
        var x, y;
        if (jQuery.trim(a) !== '') {
            var deDatea = jQuery.trim(a).split(' ');
            var deTimea = deDatea[1].split(':');
            var deDatea2 = deDatea[0].split('.');
            if (typeof deTimea[2] != 'undefined') {
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1] + deTimea[2]) * 1;
            } else {
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            }
        } else {
            x = Infinity;
        }

        if (jQuery.trim(b) !== '') {
            var deDateb = jQuery.trim(b).split(' ');
            var deTimeb = deDateb[1].split(':');
            deDateb = deDateb[0].split('.');
            if (typeof deTimeb[2] != 'undefined') {
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1] + deTimeb[2]) * 1;
            } else {
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            }
        } else {
            y = -Infinity;
        }
        var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
        return z;
    }
});
jQuery.fn.dataTable.ext.type.order['file-size-pre'] = function(data) {
    var matches = data.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)/i);
    var multipliers = {
        b: 1,
        bytes: 1,
        kb: 1000,
        kib: 1024,
        mb: 1000000,
        mib: 1048576,
        gb: 1000000000,
        gib: 1073741824,
        tb: 1000000000000,
        tib: 1099511627776,
        pb: 1000000000000000,
        pib: 1125899906842624
    };

    if (matches) {
        var multiplier = multipliers[matches[2].toLowerCase()];
        return parseFloat(matches[1]) * multiplier;
    } else {
        return -1;
    };
};
jQuery.fn.dataTable.ext.type.order['file-pre'] = function(data) {
    var tmp = data.search('<img src="img/icons/icons8-folder.png">');
    if (tmp != -1) {
        return data.split('">')[1].toLowerCase();
    } else {
        return '<' + data.split('">')[1].toLowerCase();
    }

};
/********************************/

//Table e data
/********************************/
function createTable() {
    console.log(json['root']);
    dataTable = $('#file-list').DataTable({
        "scrollY": "85vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "searching": false,
        select: true,
        "columnDefs": [{
                className: "afm-right-table",
                "targets": [1, 2]
            },
            {
                type: 'file-size',
                targets: 2
            },
            {
                type: 'de_datetime',
                targets: 1
            },
            {
                type: 'file',
                targets: 0
            }
        ]
    });

    var squares = document.getElementsByClassName("afm-square-item");
    var fSquares = document.getElementsByClassName("afm-square-item-folder");
    var list = document.getElementsByClassName("afm-list-item-folder");
    var focusSquare = function() {
        var self = this;
        if (self.style.backgroundColor == 'rgb(233, 233, 233)') {
            self.style.backgroundColor = '';
        } else {
            self.style.backgroundColor = '#e9e9e9';
        }

    };
    var dblclickSquare = function() {
        path_position++;
        if (path_position <= path_folder.length) {
            path_folder = path_folder.slice(0, path_position + 1);
        }
        openFolder(this.getAttribute('data-file-path'))
    };
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', focusSquare, false);

    }
    for (let i = 0; i < list.length; i++) {
        fSquares[i].addEventListener('dblclick', dblclickSquare, false);
        list[i].addEventListener('dblclick', dblclickSquare, false);
    }
    stopLoading();
}

function addRow(data) {
    if (data['id'].slice(-1) == '/') {
        $('#afm-file-body').append('<tr class="afm-list-item afm-list-item-folder" ondrop="drop(event)" ondragenter="dragEnter(event)" ondragleave="dragExit(event)" draggable="true" ondragstart="drag(event)" data-file-path="' + data['id'] + '"><td><img src="img/icons/icons8-' + data['icon'] + '.png" /> ' + data['name'] + '</td><<td>' + data['date'] + '</td><td>' + data['size']['value'] + '</td></tr>');
        $('#afm-square').append('<div class="afm-square-item afm-square-item-folder" ondrop="drop(event)" ondragenter="dragEnter(event)" ondragleave="dragExit(event)" draggable="true" ondragstart="drag(event)" data-file-path="' + data['id'] + '"><img draggable="false" src="img/icons/icons8-' + data['icon'] + '.png" /><p>' + data['name'] + '</p></div>');
    } else {
        $('#afm-file-body').append('<tr class="afm-list-item"  draggable="true" ondragstart="drag(event)" data-file-path="' + data['id'] + '"><td><img src="img/icons/icons8-' + data['icon'] + '.png" /> ' + data['name'] + '</td><<td>' + data['date'] + '</td><td>' + data['size']['value'] + '</td></tr>');
        $('#afm-square').append('<div class="afm-square-item" draggable="true" ondragstart="drag(event)" data-file-path="' + data['id'] + '"><img draggable="false" src="img/icons/icons8-' + data['icon'] + '.png" /><p>' + data['name'] + '</p></div>');
    }
}

function reload() {
    $.getJSON("api/getData.php", function(data) {
        json = data;
        json_tmp = json['root'].slice();
        json_tmp.reverse();
        openFolder(path_folder[path_position]);
        stopLoading();
    });
}
/********************************/

//Toggle views
/********************************/
function toggleViewSquare() {
    document.getElementById("file-list_wrapper").style.display = 'none';
    document.getElementById("afm-square").style.display = 'block';

    viewMode = 1;
}

function toggleViewList() {
    document.getElementById("file-list_wrapper").style.display = 'block';
    document.getElementById("afm-square").style.display = 'none';

    viewMode = 0;
}

function openNewFolder() {

    document.getElementById("afm-new-folder").style.display = 'flex';
}

function closeNewFolder() {
    $("#new_folder").val("");
    document.getElementById("afm-new-folder").style.display = 'none';
}

function closeRename() {
    $("#new_name").val("");
    document.getElementById("afm-rename").style.display = 'none';
}

function startLoading() {
    document.getElementById("afm-loading").style.display = 'block';
}

function stopLoading() {
    document.getElementById("afm-loading").style.display = 'none';
}
/********************************/

//Drag and Drop
/********************************/
function dragEnter(ev) {
    ev.preventDefault();
    if (viewMode == 1) {
        for (let index = 0; index < ev.path.length; index++) {
            if (ev.path[index].classList != null) {
                if (ev.path[index].classList[0] == 'afm-square-item') {
                    ev.path[index].style.backgroundColor = "#e9e9e9";
                }
            }


        }
    } else {

        ev.path[1].style.backgroundColor = "#e9e9e9";
    }

}

function dragExit(ev) {
    ev.preventDefault();
    if (viewMode == 1) {
        for (let index = 0; index < ev.path.length; index++) {
            if (ev.path[index].classList != null) {
                if (ev.path[index].classList[0] == 'afm-square-item') {
                    ev.path[index].style.backgroundColor = "#ffffff";
                }
            }


        }
    } else {
        console.log(ev.path);
        ev.path[1].style.backgroundColor = "#ffffff";
    }
}

function drag(ev) {
    console.log(ev);
    //ev.dataTransfer.setData("id", ev.target);
}

function drop(ev) {
    ev.preventDefault();
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
}
/********************************/

// AWS Commands
/********************************/

function openFolder(id) {
    path_folder[path_position] = id;

    dataTable.clear().draw();
    dataTable.destroy();
    var myNode = document.getElementById("afm-square");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var myNode = document.getElementById("afm-file-body");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    json_tmp = json[id].slice();
    json_tmp.reverse();

    for (let i = 0; i < json_tmp.length; i++) {
        addRow(json_tmp[i]);

    }
    createTable();
    if (viewMode == 1) {
        toggleViewSquare();
    } else {
        toggleViewList();
    }
}

function back() {
    if (path_position != 0) {
        path_position--;
        openFolder(path_folder[path_position]);
    }
}

function forward() {
    if (path_position != path_folder.length - 1) {
        path_position++;
        openFolder(path_folder[path_position]);
    }
}

function newFolder() {
    var name = $("#new_folder").val();
    if (name.length < 1 || name == ' ' || name == null) {
        alert('Error create folder');
    } else {
        if (checkString(name)) {

            if (path_folder[path_position] == 'root') {
                var path = name + '/';
            } else {
                var path = path_folder[path_position] + '' + name + '/';
            }
            closeNewFolder();
            startLoading();
            var date = new Date();
            var d = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            $.post("api/newFolder.php", {
                p: path
            }, function(result) {
                if (result != '') {
                    console.log('Error new folder:' + result)
                }
                reload();
            });
        }
    }

}

function download() {
    var path;
    var selected = document.getElementsByClassName("afm-list-item selected");
    var link = document.createElement('a');

    link.setAttribute('download', null);
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    document.body.appendChild(link);

    for (let i = 0; i < selected.length; i++) {
        path = selected[i].getAttribute('data-file-path');
        if (path.substr(path.length - 1) != '/') {
            $.post("api/download.php", {
                p: path,
                f: 0
            }, function(result) {
                var tmp = path.split('/');
                link.setAttribute('download', tmp[tmp.length - 1]);
                link.setAttribute('href', result);
                link.click();
            });
        } else {
            $.post("api/download.php", {
                p: path,
                f: 1
            }, function(result) {
                var tmp = path.split('/');
                link.setAttribute('download', tmp[tmp.length - 2]);
                link.setAttribute('href', result);
                link.click();
            });
        }

    }
    document.body.removeChild(link);
}

function rename() {
    var selected = document.getElementsByClassName("afm-list-item selected");
    if (selected.length == 1) {
        var rect = selected[0].getBoundingClientRect();;
        document.getElementById("afm-rename").style.top = rect.top + 30;
        document.getElementById("afm-rename").style.left = rect.left;
        document.getElementById("afm-rename").style.display = 'flex';
    } else {
        alert('Select one row');
    }
}

/********************************/

//Controller
/********************************/

//Check valid char in according to AWS: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html
function checkString(string) {
    var letters = /[^A-Za-z0-9!()._-]/g;
    if (string.match(letters) == null) {
        return true;
    } else {
        alert('invalid char')
        return false;
    }
}