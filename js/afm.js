// initialisation
/********************************/
$(document).ready(function() {
    $.getJSON("test/data.json", function(data) {
        $.each(data, function(key, val) {
            if (key == 'root') {
                for (let index = 0; index < val.length; index++) {
                    if (val[index]['id'].slice(-1) == '/') {
                        $('#afm-sidebar').append('<div class="afm-sidebar-item"><img src="img/icons/icons8-folder.png" /><span>' + val[index]['name'] + '</span></div>')
                        $('tbody').append('<tr ondrop="drop(event)" ondragenter="dragEnter(event)" ondragleave="dragExit(event)" draggable="true" ondragstart="drag(event)"><td><img src="img/icons/icons8-' + val[index]['icon'] + '.png" /> ' + val[index]['name'] + '</td><<td>' + val[index]['date'] + '</td><td>' + val[index]['size'] + '</td></tr>');
                        $('#afm-square').append('<div class="afm-square-item" ondrop="drop(event)" ondragenter="dragEnter(event)" ondragleave="dragExit(event)" draggable="true" ondragstart="drag(event)"><img draggable="false" src="img/icons/icons8-' + val[index]['icon'] + '.png" /><p>' + val[index]['name'] + '</p></div>');
                    } else {
                        $('tbody').append('<tr draggable="true" ondragstart="drag(event)"><td><img src="img/icons/icons8-' + val[index]['icon'] + '.png" /> ' + val[index]['name'] + '</td><<td>' + val[index]['date'] + '</td><td>' + val[index]['size'] + '</td></tr>');
                        $('#afm-square').append('<div class="afm-square-item" draggable="true" ondragstart="drag(event)"><img draggable="false" src="img/icons/icons8-' + val[index]['icon'] + '.png" /><p>' + val[index]['name'] + '</p></div>');
                    }
                }
            }

            createTable();
        });


    });
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
            x = -Infinity; // = l'an 1000 ...
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
        return data.split('">')[1];
    } else {
        return '<' + data.split('">')[1];
    }

};
/********************************/

//Create table
/********************************/
function createTable() {
    $('#file-list').DataTable({
        "scrollY": "85vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "searching": false,
        "columnDefs": [
            { className: "afm-right-table", "targets": [1, 2] },
            { type: 'file-size', targets: 2 },
            { type: 'de_datetime', targets: 1 },
            { type: 'file', targets: 0 }
        ]
    });

    var squares = document.getElementsByClassName("afm-square-item");

    var focusSquare = function() {
        var self = this;
        if (self.style.backgroundColor == 'rgb(233, 233, 233)') {
            self.style.backgroundColor = '';
        } else {
            self.style.backgroundColor = '#e9e9e9';
        }

    };

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', focusSquare, false);
    }
}
/********************************/

//Toggle views
/********************************/
function toggleViewSquare() {
    document.getElementById("file-list_wrapper").style.display = 'none';
    document.getElementById("afm-square").style.display = 'block';
}

function toggleViewList() {
    document.getElementById("file-list_wrapper").style.display = 'block';
    document.getElementById("afm-square").style.display = 'none';
}
/********************************/

//Drag and Drop
/********************************/
function dragEnter(ev) {
    ev.preventDefault();
    if (ev.fromElement.tagName != "TD") {
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
    if (ev.fromElement.tagName != "TD") {
        for (let index = 0; index < ev.path.length; index++) {
            if (ev.path[index].classList != null) {
                if (ev.path[index].classList[0] == 'afm-square-item') {
                    ev.path[index].style.backgroundColor = "#ffffff";
                }
            }


        }
    } else {
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