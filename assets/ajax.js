$(document).ready(function () {
    selector();
    listado();
    //modal se queda estatico y no se cierra
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

function selector() {
    $.ajax({
        type: "POST",
        url: "app/listadorol.php",
        dataType: "json",
        success: function (data) {
            html = "<select class='form-select' aria-label='Default select example' id='rol' name='rol' required>";
            html += "<option selected disabled >--Seleccione--</option>";
            for (var key in data) {
                html += `<option value="${data[key]['id_roles']}"> ${data[key]['nombres']}</option>`;
            }
            html += "</select>";
            $("#selectroles").html(html);
        }
    });
}


//listado de los datos
function listado() {
    $.ajax({
        type: "POST",
        url: "app/listadousuario.php",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped' id='tablafiltro'  width='100%' cellspacing='0'><thead>";
            html += "<tr><th scope='col'>Nombre</th><th scope='col'>Email</th><th scope='col'>Rol</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['nombres'] + "</td>";
                html += "<td>" + data[key]['email'] + "</td>";
                html += "<td>" + data[key]['roles'] + "</td>";
                html += `<td>
                <a href="#" id="edit" value="${data[key]['id_usuarios']}" class="btn btn-sm btn-dark" title="Editar">
                <i class="fa fa-pencil"></i>
                </a>
                <a href="#" id="del" value="${data[key]['id_usuarios']}" class="btn btn-sm btn-danger" title="Eliminar">
                <i class="fa fa-trash"></i>
                </a>
                </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tablausuarios").html(html);
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
        let id = $("#id").val();
        let data = $("#index").serialize();
        if ($.trim(id) == "") {
            guardar(data);
        } else {
            modificar(data);
        }
    }
    e.preventDefault();
});

//guardar datos
function guardar(data) {
    $.ajax({
        type: "POST",
        url: "app/guardarusuario.php",
        data: data,
        success: function (response) {
            if (response) {
                $.notify("Success: Usuario guardado", "success");
                $("#exampleModal").modal("hide");
                $("#index")[0].reset();
                listado();
            }
        }
    });
}

//modificar datos
function modificar(data) {
    $.ajax({
        type: "POST",
        url: "app/actualizarusuario.php",
        data: data,
        success: function (response) {
            if (response) {
                $.notify("Success: Usuario modificado", "success");
                $("#exampleModal").modal("hide");
                $("#index")[0].reset();
                listado();
            }
        }
    });
}




//obtener el id
$(document).on("click", "#edit", function (e) {
    let idEditar = $(this).attr("value");

    $.ajax({
        type: "POST",
        url: "app/obtenerID.php",
        data: "id=" + idEditar,
        success: function (r) {
            if (r) {
                r = JSON.parse(r);
                $("#exampleModal").modal("show");//abro el modal
                $("#id").val(r['id_usuarios']);
                $("#nombre").val(r['nombres']);
                $("#email").val(r['email']);
                $("#rol").val(r['id_roles']);
            }
        },
    });
    e.preventDefault();
});


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
                url: "app/eliminarusuario.php",
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



//limpiar las cajas de texto
function limpiar() {
    $('#rol').get(0).selectedIndex = 0;
    document.getElementById("id").value = '';
    document.getElementById("nombre").value = '';
    document.getElementById("email").value = '';

    //$("#modaladd")[0].reset();
}


//validaciones
function validaciones() {
    let rol = $("#rol").val();
    let nombre = $("#nombre").val();
    let email = $("#email").val();
    if ($.trim(rol) == "") {
        $.notify("Warning: Eliga un rol", "warn");
        $("#rol").focus();
    } else if ($.trim(nombre) == "") {
        $.notify("Warning: Ingrese un nombre", "warn");
        $("#nombre").focus();
    } else if ($.trim(email) == "") {
        $.notify("Warning: Ingrese un email", "warn");
        $("#email").focus();
    } else {
        if (validarEmail(email)) {
            return true;
        }
    }
}


//validar email
function validarEmail(valor) {
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(valor)) {
        return true;
    } else {
        $.notify("Error: Formato de email no existe", "error");
        $("#email").focus();
        return false;
    }
}


//hacer que empiece el autofocus en el modal
$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#rol').focus();
    })
});