function login() {

    let email_login = $('#email_login').val()
    let email_senha = $('#email_senha').val()

    $.ajax({
        url: 'rotinas/login.php',
        method: 'POST',
        dataType: 'json',
        data: {
            email   : email_login,
            senha   : email_senha,
            acao    : btoa('login')
        },
        success: function(data){
            if(data.status == true){
                window.location.href = 'http://iisoul-formulario.local/index.php'
                alert_page('Sucesso!', data.msg, 'success');
            }else{
                alert_page('Erro!', data.msg, 'warning');
            }
        }
    })
}