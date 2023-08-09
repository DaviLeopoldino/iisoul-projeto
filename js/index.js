$( document ).ready(function() {
    buscar_dados();
    initSelect2NomeCompleto();
    $('#cep').mask('00000-000');
    $('#telefone').mask('(00) 0000-0000');
    $('#celular').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#rg').mask('00.000.000-A', {reverse: true});
    $('#cep_edit').mask('00000-000');
    $('#telefone_edit').mask('(00) 0000-0000');
    $('#celular_edit').mask('(00) 00000-0000');
    $('#cpf_edit').mask('000.000.000-00', {reverse: true});
    $('#rg_edit').mask('00.000.000-A', {reverse: true});
    $("#tb_pessoa_fisica").bootstrapTable({ locale: 'pt-br'})

});

function open_md_cadastro(){
    $('#md_cadastro_pessoa_fisica').modal('show');
}

function buscar_dados(){

    let nome_completo = $('#select2_nome_completo').val();

    $.ajax({
        type: "POST",
        url: 'rotinas/index.php',
        dataType:"json",
        data:{
            nome_completo : nome_completo,
            acao : btoa('buscar_dados')        
        },
        success: function(response){
            if(response.status == true){
                $("#tb_pessoa_fisica").bootstrapTable('load', response.row);
                
            }else{
                alert_page('Erro!', response.msg, 'warning');
            }
        },
        error: function(e){
            alert_page('Erro!', e, 'warning');

        }
    });

}

function salvar(){
    let nome_completo   = $('#nome').val();
    let data_nascimento = $('#nascimento').val();
    let cpf             = $('#cpf').val();
    let rg              = $('#rg').val();
    let telefone        = $('#telefone').val();
    let celular         = $('#celular').val();
    let email           = $('#email').val();
    let logradouro      = $('#logradouro').val();
    let bairro          = $('#bairro').val();
    let numero          = $('#numero').val();
    let complemento     = $('#complemento').val();
    let cep             = $('#cep').val();
    let sexo            = $('input[name="sexo"]:checked').val();

   
        if(nome_completo == ''){
            alert_page('Erro', 'Verifique seu nome', 'warning');
            return false;
        }
        if(data_nascimento == ''){
            alert_page('Erro', 'Verifique sua data de nascimento', 'warning');
            return false;
        }
        if(cpf == ''){
            alert_page('Erro', 'Verifique seu CPF', 'warning');
            return false;
        }
        if(rg == ''){
            alert_page('Erro', 'verifique seu RG', 'warning');
            return false;
        }
        if(telefone == ''){
            alert_page('Erro', 'verifique seu telefone', 'warning');
            return false;
        }
        if(celular == ''){
            alert_page('Erro', 'verifique seu celular', 'warning');
            return false;
        }
        if(email == ''){
            alert_page('Erro', 'verifique seu email', 'warning');
            return false;
        }
        if(logradouro == ''){
            alert_page('Erro', 'verifique seu logradouro', 'warning');
            return false;
        }
        if(bairro == ''){
            alert_page('Erro', 'verifique seu bairro', 'warning');
            return false;
        }
        if(numero == ''){
            alert_page('Erro', 'verifique seu numero', 'warning');
            return false;
        }
        if(cep == ''){
            alert_page('Erro', 'verifique seu CEP', 'warning');
            return false;
        }
    $.ajax({
        type: "POST",
        url: 'rotinas/index.php',
        dataType:"json",
        data:{
            nome_completo   : nome_completo,
            data_nascimento : data_nascimento,
            cpf             : btoa (cpf),          
            rg              : rg,             
            telefone        : telefone,        
            celular         : celular,         
            email           : email,           
            logradouro      : logradouro,      
            bairro          : bairro,         
            numero          : numero,         
            complemento     : complemento,   
            cep             : cep,           
            sexo            : sexo,  
            acao            : btoa ('salvar_formulario')        
        },
        success: function(response){
            //console.log(response)
            if(response.status == true){
                alert_page('Sucesso!', response.msg, 'success');
                clean_form();
                $('#md_cadastro_pessoa_fisica').modal('hide');
                buscar_dados();
            }else{
                alert_page('Erro!', response.msg, 'warning');
            }
        },
        error: function(e){
            alert_page('Erro!', e, 'warning');

        }
    });
}

function excluir(){

    let id = $('#valor_id_excluir').val();


    $.ajax({
        type: "POST",
        url: 'rotinas/index.php',
        dataType:"json",
        data:{    
            id            : id,  
            acao          : btoa ('excluir_formulario')        
        },
        success: function(response){
            //console.log(response)
            if(response.status == true){
                alert_page('Sucesso!', response.msg, 'success');
                $('#valor_id_excluir').val('');
                $('#md_excluir_pessoa_fisica').modal('hide');
                buscar_dados();
            }else{
                alert_page('Erro!', response.msg, 'warning');
            }
        },
        error: function(e){
            alert_page('Erro!', e, 'warning');

        }
    });
}

function excluir_formulario(id){
    $('#md_excluir_pessoa_fisica').modal('show');
    $('#valor_id_excluir').val(id);
}

function editar(){

    let id = $('#valor_id_editar').val();

    let nome_completo   = $('#nome_edit').val();
    let data_nascimento = $('#nascimento_edit').val();
    let cpf             = $('#cpf_edit').val();
    let rg              = $('#rg_edit').val();
    let telefone        = $('#telefone_edit').val();
    let celular         = $('#celular_edit').val();
    let email           = $('#email_edit').val();
    let logradouro      = $('#logradouro_edit').val();
    let bairro          = $('#bairro_edit').val();
    let numero          = $('#numero_edit').val();
    let complemento     = $('#complemento_edit').val();
    let cep             = $('#cep_edit').val();
    let sexo            = $('input[name="sexo_edit"]:checked').val();

        if(nome_completo == ''){
            alert_page('Erro', 'Verifique seu nome', 'warning');
            return false;
        }
        if(data_nascimento == ''){
            alert_page('Erro', 'Verifique sua data de nascimento', 'warning');
            return false;
        }
        if(cpf == ''){
            alert_page('Erro', 'Verifique seu CPF', 'warning');
            return false;
        }
        if(rg == ''){
            alert_page('Erro', 'verifique seu RG', 'warning');
            return false;
        }
        if(telefone == ''){
            alert_page('Erro', 'verifique seu telefone', 'warning');
            return false;
        }
        if(celular == ''){
            alert_page('Erro', 'verifique seu celular', 'warning');
            return false;
        }
        if(email == ''){
            alert_page('Erro', 'verifique seu email', 'warning');
            return false;
        }
        if(logradouro == ''){
            alert_page('Erro', 'verifique seu logradouro', 'warning');
            return false;
        }
        if(bairro == ''){
            alert_page('Erro', 'verifique seu bairro', 'warning');
            return false;
        }
        if(numero == ''){
            alert_page('Erro', 'verifique seu numero', 'warning');
            return false;
        }
        if(cep == ''){
            alert_page('Erro', 'verifique seu CEP', 'warning');
            return false;
        }
        
        $.ajax({
            type: "POST",
            url: 'rotinas/index.php',
            dataType:"json",
            data:{
                id              : id,
                nome_completo   : nome_completo,
                data_nascimento : data_nascimento,
                cpf             : btoa (cpf),          
                rg              : rg,             
                telefone        : telefone,        
                celular         : celular,         
                email           : email,           
                logradouro      : logradouro,      
                bairro          : bairro,         
                numero          : numero,         
                complemento     : complemento,   
                cep             : cep,           
                sexo            : sexo,  
                acao            : btoa ('salvar_editar')        
            },
            success: function(response){
                //console.log(response)
                if(response.status == true){
                    alert_page('Sucesso!', response.msg, 'success');
                    
                    $('#md_editar_pessoa_fisica').modal('hide');
                    buscar_dados();
                }else{
                    alert_page('Erro!', response.msg, 'warning');
                }
            },
            error: function(e){
                alert_page('Erro!', e, 'warning');
    
            }
        });
}
   
function editar_formulario(id){
    $('#md_editar_pessoa_fisica').modal('show');
    $('#valor_id_editar').val(id);

    $.ajax({
        type: "POST",
        url: 'rotinas/index.php',
        dataType:"json",
        data:{    
            id            : id,  
            acao          : btoa ('editar_formulario')        
        },
        success: function(response){
            //console.log(response)
            if(response.status == true){
                $('#nome_edit').val(response.row[0].nome_completo);
                $('#nascimento_edit').val(response.row[0].data_nascimento);
                $('#cpf_edit').val(response.row[0].cpf);
                $('#rg_edit').val(response.row[0].rg);
                $('#telefone_edit').val(response.row[0].telefone);
                $('#celular_edit').val(response.row[0].celular);
                $('#email_edit').val(response.row[0].email);
                $('#logradouro_edit').val(response.row[0].logradouro);
                $('#bairro_edit').val(response.row[0].bairro);
                $('#numero_edit').val(response.row[0].numero);
                $('#complemento_edit').val(response.row[0].complemento);
                $('#cep_edit').val(response.row[0].cep);

                if (row[0].sexo == 'M'){
                    $('#masculino_edit').prop('checked', true);
                }else{
                    $('#feminino_edit').prop('checked', true);
                }
            }else{
                alert_page('Erro!', response.msg, 'warning');
            }
        },
        error: function(e){
            alert_page('Erro!', e, 'warning');

        }
    });
      
}

function clean_form(){
    $('#nome').val('');
    $('#nascimento').val('');
    $('#cpf').val('');
    $('#rg').val('');
    $('#telefone').val('');
    $('#celular').val('');
    $('#email').val('');
    $('#logradouro').val('');
    $('#bairro').val('');
    $('#numero').val('');
    $('#complemento').val('');
    $('#cep').val('');
    $('#masculino').prop('checked', true);

}

function initSelect2NomeCompleto() {
    $('#select2_nome_completo').select2({
        language: "pt-BR",
        ajax: {
            type: "POST",
            url: 'rotinas/index.php',
            dataType: "json",
            data: function(params) {
                return {
                    acao: btoa('buscar_nome_completo'),
                    filtro: params.term
                };
            },
            processResults: function(response) {

                if(response.status == true){
                    return {
                        results: response.row
                    };
                } else {
                    alert_page('Erro!', response.msg, 'Warning');
                    return {
                        results: []
                    };
                }
            },
            cache:true
        },
        placeholder: 'Digite um nome',
        minimumInputLength: 3
    });
}
    