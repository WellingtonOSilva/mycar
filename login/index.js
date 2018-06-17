function login() {

    $('h5').text('Um momento...');

    $.ajax({
           url: 'https://projetos.wosilva.com/mycar/api/public/login',
           type: 'POST',
           data: {email: $('#email').val(), password: $('#password').val()},
           success: function (data) {
               console.log(data);
               if (data.logged == "1") {
                   setCookie('logged','true',1);

                   window.location.href = '../dashboard/';
               }  else {

                    $('h5').text('Email ou senha incorreta, tente novamente');
               }

           }
       })

}
