$( document ).ready(function() {
    buscar_dados();
    initSelect2NomeCompleto();
    initSelect2NomeAdd();
    initSelect2CpfAdd();
    $('#cep').mask('00000-000');
    $('#telefone').mask('(00) 0000-0000');
    $('#celular').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#filter_cpf').mask('000.000.000-00', {reverse: true});
    $('#rg').mask('00.000.000-A', {reverse: true});
    $('#filter_rg').mask('00.000.000-A', {reverse: true});
    $('#cep_edit').mask('00000-000');
    $('#telefone_edit').mask('(00) 0000-0000');
    $('#celular_edit').mask('(00) 00000-0000');
    $('#cpf_edit').mask('000.000.000-00', {reverse: true});
    $('#rg_edit').mask('00.000.000-A', {reverse: true});

    $("#tb_pessoa_fisica").bootstrapTable({
        locate: 'pt-br',
        toolbar: '#toolbar',
    });

    $('#exportar').click(function(){

        $('#tb_pessoa_fisica').tableExport({
            type: 'csv',
            fileName: 'tabela pessoa fisica',
            exportOptions: {
                ignoreColumn: []
            },
            csvSeparator: ';'
        }); 
    });
});



function open_md_cadastro(){
    $('#md_adicionar_pessoa_fisica').modal('show');
}

function buscar_dados(){

    let nome_completo               = $('#select2_nome_completo').val();
    let nome_add                    = $('#select2_nome_add').val();
    let cpf                         = $('#filter_cpf').val();
    let email                       = $('#filter_email').val();
    let tipo                        = $('#filter_tipo').val();

    $.ajax({
        type: "POST",
        url: 'rotinas/usuarios.php',
        dataType:"json",
        data:{
            nome_completo               : nome_completo,
            nome_add                    : nome_add,
            cpf                         : btoa(cpf),
            email                       : email,
            tipo                        : tipo,
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
    let nome_completo   = $('#select2_nome_add').val();
    let cpf             = $('#select2_cpf_add').val();

    $.ajax({
        type: "POST",
        url: 'rotinas/usuarios.php',
        dataType:"json",
        data:{
            nome_completo   : nome_completo,
            cpf             : btoa (cpf),
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
        url: 'rotinas/usuarios.php',
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

    let id = $('#valor_id_editar_tipo').val();

    let tipo = $('#filter_edit_tipo').val();

        if(tipo == ''){
            alert_page('Erro', 'Verifique seu tipo', 'warning');
            return false;
        }
        
        $.ajax({
            type: "POST",
            url: 'rotinas/usuarios.php',
            dataType:"json",
            data:{
                id              : id,
                tipo            : tipo,  
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
    $('#valor_id_editar_tipo').val(id);

    $.ajax({
        type: "POST",
        url: 'rotinas/usuarios.php',
        dataType:"json",
        data:{
            id            : id,  
            acao          : btoa ('editar_formulario')        
        },
        success: function(response){
            console.log(response)
            if(response.status == true){
                $('#filter_edit_tipo').val(response.row[0].tipo);
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
    $('#select2_nome_completo_u').select2({
        language: "pt-BR",
        ajax: {
            type: "POST",
            url: 'rotinas/usuarios.php',
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

function initSelect2NomeAdd() {
    $('#select2_nome_add').select2({
        dropdownParent: $('#md_adicionar_pessoa_fisica'),
        language: "pt-BR",
        ajax: {
            type: "POST",
            url: 'rotinas/usuarios.php',
            dataType: "json",
            data: function(params) {
                return {
                    acao: btoa('add_nome'),
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

function initSelect2CpfAdd() {
    $('#select2_cpf_add').select2({
        dropdownParent: $('#md_adicionar_pessoa_fisica'),
        language: "pt-BR",
        ajax: {
            type: "POST",
            url: 'rotinas/usuarios.php',
            dataType: "json",
            data: function(params) {
                return {
                    acao: btoa('add_cpf'),
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
        placeholder: 'Digite um CPF',
        minimumInputLength: 3
    });
}
    