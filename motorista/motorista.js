session();


function fieldsValidation() {

    var validation = true;

    $('input, select').each(function () {
        if($(this).val() == "") {

            validation = false;
        }
    });

    return validation;
}

function newDriver() {

    console.log($('#birth').val())

    if (fieldsValidation() == true) {

        $.ajax({
           url: 'https://projetos.wosilva.com/mycar/api/public/motorista/criar',
           type: 'post',
           data: {name: $('#name').val(), cpf: $('#cpf').val(), birth: $('#birth').val(), car: $('#carModel').val(), status: $('#status').val(), sex: $('#sex').val(), email: $('#email').val(), phone: $('#phone').val(), brand: $('#car').val()},
           success: function (callBack) {
                window.location = 'editar?id=' + callBack.id_driver;
           }
        });

    }  else {

        alert("Por favor, preencha todos os campos");

    }
}

function editDriver() {

    id = $('#id').val();

    if (fieldsValidation() == true) {

        $.ajax({
            url: 'https://projetos.wosilva.com/mycar/api/public/motorista/editar/' + id,
            type: 'post',
            data: {
                name: $('#name').val(),
                cpf: $('#cpf').val(),
                birth: $('#birth').val(),
                car: $('#carModel').val(),
                status: $('#status').val(),
                sex: $('#sex').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                car: $('#carModel').val(),
                brand: $('#car').val()
            },
            success: function (data) {

                modal($('#modal'), data.code);

            }
        });

    } else {

        alert("Preencha todos os campos");

    }
}

function getParameter(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function driverData(id) {



    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/motorista/listar/' + id,
        success: function (data) {

            $('#id').attr('value', data[0].id_driver)
            $('#name').val(data[0].name);
            $('#cpf').val(data[0].cpf);
            $('#birth').attr('value', data[0].birth);
            $('#birth').datepicker( 'setDate' , data[0].birth);
            $('#carModel').val(data[0].car);
            $('#status').val(data[0].status);
            $('#sex').val(data[0].sex);
            $('#car').val(data[0].brand);
            getCarros(data[0].brand);
            $('#carModel').val(data[0].car);
            $('#email').val(data[0].email);
            $('#phone').val(data[0].phone);
            $("select").formSelect();


            }
        });
}

function tableDriver() {
    
    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/motorista/listar',
        success: function (data) {

            for (i = 0; i < data.length; i++) {

                if(data[i].status == 1) {
                    var status = "Ativo";
                } else {
                    var status = 'Inativo';
                }

                $('#tblDrivers tbody').append('<tr><td>'+ data[i].id_driver +'</td><td>' + data[i].name + '</td><td>' + data[i].email + '</td><td>' + status + '</td><td class="buttons"><a href="editar?id='+ data[i].id_driver +'" class="waves-effect waves-light btn-small"><i class="material-icons">edit</i></a> <a class="waves-effect waves-light btn-small"><i class="material-icons">visibility</i></a></td></tr>');
            }

            $('#tblDrivers').DataTable();

            $("select").formSelect();
        }
    });
    
}

function modal(element, code) {

    if(code == '1') {

        $('#modal h4').text('Motorista atualizado com sucesso');

    } else {


    }

    element.modal();
    element.modal('open');

}

function getMarcas() {
    $.ajax({
        url: 'https://fipeapi.appspot.com/api/1/carros/marcas.json',
        success: function(data) {
            for (i = 0; i < data.length; i++) {
                $('#car').append('<option value="'+ data[i].id +'">'+ data[i].fipe_name +'</option>');
            }

            $('#car').formSelect();

        }
    })
}

function getCarros(carId) {

    $('#carModel option').each(function() {
        $(this).remove();
    });

    $.ajax({
        url: 'https://fipeapi.appspot.com/api/1/carros/veiculos/'+ carId + '.json',
        success: function(data) {
            for (i = 0; i < data.length; i++) {
                $('#carModel').append('<option value="'+ data[i].id +'">'+ data[i].fipe_name +'</option>');
            }

            $('#carModel').formSelect();

        }
    })

}
