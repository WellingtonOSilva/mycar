function fieldsValidation() {

    var validation = true;

    $('input, select').each(function () {
       if($(this).val() == "") {

           validation = false;
       }
    });

    return validation;
}

function newPassenger() {

    console.log($('#birth').val())

    if (fieldsValidation() == true) {

        $.ajax({
            url: 'https://projetos.wosilva.com/mycar/api/public/passageiro/criar',
            type: 'post',
            data: {name: $('#name').val(), cpf: $('#cpf').val(), birth: $('#birth').val(), sex: $('#sex').val(), email: $('#email').val(), phone: $('#phone').val(), payment: $('#payment').val()},
            success: function (data) {
                console.log(data);

                window.location = 'editar?id=' + data.id_passenger;
            }
        });

    }  else {

        alert('Preencha todos os campos');

    }
}

function editPassenger() {

    var id = $('#id').val();

    if (fieldsValidation() == true) {

        $.ajax({
            url: 'https://projetos.wosilva.com/mycar/api/public/passageiro/editar/' + id,
            type: 'post',
            data: {
                name: $('#name').val(),
                cpf: $('#cpf').val(),
                birth: $('#birth').val(),
                payment: $('#payment').val(),
                sex: $('#sex').val(),
                email: $('#email').val(),
                phone: $('#phone').val()

            },
            success: function (data) {
                console.log(data);
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

function passengerData(id) {

    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/passageiro/listar/' + id,
        success: function (data) {

            $('#id').attr('value', data[0].id_passenger)
            $('#name').val(data[0].name);
            $('#cpf').val(data[0].cpf);
            $('#birth').attr('value', data[0].birth);
            $('#birth').datepicker( 'setDate' , data[0].birth);
            $('#email').val(data[0].email);
            $('#phone').val(data[0].phone);
            $('#sex').val(data[0].sex);
            $('#payment').val(data[0].id_payment);
            $("select").formSelect();


        }
    });
}

function tblPassenger() {

    $.ajax({
        url: "https://projetos.wosilva.com/mycar/api/public/passageiro/listar",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $("#tblPassenger tbody").append('<tr><td>' + data[i].name + '</td><td>' + data[i].cpf + '</td><td>' + data[i].email + '</td><td class="buttons"><a href="editar?id=' + data[i].id_passenger + '" class="waves-effect waves-light btn-small"><i class="material-icons">edit</i></a> <a class="waves-effect waves-light btn-small"><i class="material-icons">visibility</i></a></td></tr>');
            }

            $("#tblPassenger").DataTable();

            $("select").formSelect();
        }
    })
    
}

function getPayment() {

    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/pagamentos/listar',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $('#payment').append('<option value="' + data[i].id_payment +'">' + data[i].payment +'</option>');
                $('select').formSelect();

            }
        }
    })
}

function modal(element, code) {

    if(code == '1') {

        $('#modal h4').text('Passageiro atualizado com sucesso');

    } else {


    }

    element.modal();
    element.modal('open');

}

