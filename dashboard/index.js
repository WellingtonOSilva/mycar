function dashboard() {

    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/motorista/listar',
        success: function (data) {
            $('#card-motoristas').text('Você possui ' + data.length + ' motoristas cadastrados');
        }
    });


    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/corrida/listar',
        success: function (data) {
            $('#card-corridas').text('Você possui ' + data.length  + ' corridas no total');
        }
    });


    $.ajax({
        url: 'https://projetos.wosilva.com/mycar/api/public/passageiro/listar',
        success: function (data) {
            $('#card-passageiros').text('Você possui ' + data.length + ' passageiros cadastrados');
        }
    });

}