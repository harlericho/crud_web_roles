$(document).ready(function () {
    listado();
    //modal se queda estatico y no se cierra
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});



//listado de los datos
function listado() {
    $.ajax({
        type: "POST",
        url: "app/listadorol.php",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped' id='tablafiltro'  width='100%' cellspacing='0'><thead>";
            html += "<tr><th scope='col'>Nombre</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['nombres'] + "</td>";
                html += `<td>
                <a href="#" id="del" value="${data[key]['id_roles']}" class="btn btn-sm btn-danger" title="Eliminar">
                <i class="fa fa-trash"></i>
                </a>
                </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tablaroles").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}


//boton evento guardar
$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let data = $("#rol").serialize();
        console.log(data);
        guardar(data);
    }
    e.preventDefault();
});


//guardar datos
function guardar(data) {
    $.ajax({
        type: "POST",
        url: "app/guardarrol.php",
        data: data,
        success: function (response) {
            if (response == 0) {
                $.notify("Error: Rol ya existe en la base", "error");
                $("#nombre").focus();
            } else {
                $.notify("Success: Rol guardado", "success");
                $("#exampleModal").modal("hide");
                $("#rol")[0].reset();
                listado();
            }
        }
    });
}


//eliminar o cambio de estado del registro
$(document).on("click", "#del", function (e) {
    let idEliminar = $(this).attr("value");
    Swal.fire({
        title: 'Seguro desea eliminar?',
        text: "Solo se cambiara el estado del registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "app/eliminarrol.php",
                data: { idEliminar: idEliminar },
                success: function (response) {
                    if (response) {
                        listado();
                    }
                }
            });
            Swal.fire(
                'Eliminado!',
                'Su registro cambio de estado',
                'success'
            )
        }
    })
    e.preventDefault();
});


//validaciones
function validaciones() {
    let nombre = $("#nombre").val();
    if ($.trim(nombre) == "") {
        $.notify("Warning: Ingrese un rol nuevo", "warn");
        $("#nombre").focus();
    } else {
        return true;
    }
}


$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#nombre').focus();
    })
});