// initialisation
/********************************/
$(document).ready(function() {
    $.getJSON("test/data.json", function(data) {
        console.log(data['root']);
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

function createTable() {
    $('#file-list').DataTable({
        "scrollY": "80vh",
        "scrollCollapse": true,
        "paging": false,
        "info": false,
        "searching": false,
        "columnDefs": [
            { className: "afm-right-table", "targets": [1, 2] },
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