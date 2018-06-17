function fieldsValidation() {

    var validation = true;

    $('input, select').each(function () {
        if($(this).val() == "") {

            validation = false;
        }
    });

    return validation;
}

function newRace() {

    if (fieldsValidation() == true) {

        $.ajax({
            url: 'https://projetos.wosilva.com/mycar/api/public/corrida/criar',
            type: 'post',
            data: {id_driver: $('#driver').val(), id_passenger: $('#passenger').val(), departure: $('#from').val(), destination: $('#to').val(), price: $('#price').val(), id_payment: $('#payment').val()},
            success: function (data) {

                window.location.href = "../corrida";

            }
        });

    }  else {

        alert("Por favor, preencha todos os campos");

    }
}

function tblRaces() {

    $.ajax({
        url: "https://projetos.wosilva.com/mycar/api/public/corrida/listar",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                $("#tblRaces tbody").append('<tr><td>' + data[i].driver + '</td><td>' + data[i].passenger + '</td><td>' + data[i].departure + '</td><td>'+ data[i].destination +'</td><td>' + data[i].price +'</td><td class="buttons"> <a class="waves-effect waves-light btn-small"><i class="material-icons">visibility</i></a></td></tr>');
            }

            $('#tblRaces').DataTable();

            $('select').formSelect();
        }
    });

}

function autoCompleteDriver() {

    var obj = {};

    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/motorista/listar',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].status == 1) {
                    obj[data[i].id_driver + ' - ' + data[i].name] = null;
                }
            }
        }
    });

    return obj;

}

function autoCompletePassenger() {

    var obj = {};

    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/passageiro/listar',
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                obj[data[i].id_passenger + ' - ' + data[i].name] = null;
            }
        }
    })

    return obj;

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