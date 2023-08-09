<?php 

include_once(__DIR__ . '../../database/conexao.php');

$acao = base64_decode($_POST['acao']);

switch ($acao){
    case 'salvar_formulario':
        salvar_formulario($conexao);
        break;
    case 'buscar_dados':
        buscar_dados($conexao);
        break;
    case 'excluir_formulario':
        excluir_formulario($conexao);
        break;
    case 'editar_formulario':
        editar_formulario($conexao);
        break;  
    case 'salvar_editar':
        salvar_editar($conexao);
        break; 
    case 'buscar_nome_completo':
        buscar_nome_completo($conexao);
        break;
    case 'add_nome';
        add_nome($conexao);
        break;

}

function salvar_editar($conexao){

    try{
        define('status', 'status');
        define('msg', 'msg');
        
        $id                 = $_POST['id'];
        $nome_completo      = $_POST['nome_completo'];
        $cpf                = base64_decode($_POST ['cpf']); 
        $cpf                = str_replace('.','',$cpf);
        $cpf                = str_replace('-','',$cpf);            
        $email              = $_POST['email']; 
        
        

        if($nome_completo == ''){
            $mensagem = 'Preencha o campo nome completo';
            $resposta = array(status => false, msg => $mensagem);
            return json_encode($resposta);
            exit;
        }
        if($cpf == ''){
            $mensagem = 'Preencha o campo cpf';
            $resposta = array(status => false, msg => $mensagem);
            return json_encode($resposta);
            exit;
        }
        
        if($email == ''){
            $mensagem = 'Preencha o campo email';
            $resposta = array(status => false, msg => $mensagem);
            return json_encode($resposta);
            exit;
        }
        
        $sql =  "UPDATE public.usuarios
                    SET nome_completo   = '$nome_completo',
                        cpf             = '$cpf',
                        email           = '$email',
                  WHERE id_cadastro     = $id";
        
        $resultado = mysqli_query($conexao, $sql);
        
        if ($resultado){
            $mensagem = 'Atualização feita com sucesso';
            $resposta = array(status =>true, msg => $mensagem);
        }else{
            $mensagem = 'Erro ao atualizar';
            $resposta = array(status =>false, msg => $mensagem);
            }

        mysqli_close($conexao);
        echo json_encode($resposta);

    
    } catch (Exception $e) {
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status =>false, msg => $mensagem);
        echo json_encode($resposta);
    }
}

function salvar_formulario($conexao){

    try{
        define('status', 'status');
        define('msg', 'msg');
        
        $nome_completo      = $_POST['nome_completo'];
        $cpf                = base64_decode($_POST ['cpf']); 
        $cpf                = str_replace('.','',$cpf);
        $cpf                = str_replace('-','',$cpf);                
        $email              = $_POST['email'];

        if($nome_completo == ''){
            $mensagem = 'Preencha o campo nome completo';
            $resposta = array(status => false, msg => $mensagem);
            return json_encode($resposta);
            exit;
        }
        if($cpf == ''){
            $mensagem = 'Preencha o campo cpf';
            $resposta = array(status => false, msg => $mensagem);
            return json_encode($resposta);
            exit;
        }
        if($email == ''){
            $mensagem = 'Preencha o campo email';
            $resposta = array(status => false, msg => $mensagem);
            return json_encode($resposta);
            exit;
        }
        
        $sql =  "INSERT INTO public.cadastro(nome_completo, data_nascimento, cpf, rg, telefone, celular, email, logradouro, bairro, numero, complemento, cep, sexo) 
            VALUES('$nome_completo','$cpf','$email')";

        $resultado = mysqli_query($conexao, $sql);

        if ($resultado){
            $mensagem = 'Cadastro feito com sucesso';
            $resposta = array(status =>true, msg => $mensagem);
        }else{
            $mensagem = 'Erro ao fazer o cadastro';
            $resposta = array(status =>false, msg => $mensagem);
            }

        mysqli_close($conexao);
        echo json_encode($resposta);

    
    } catch (Exception $e) {
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status =>false, msg => $mensagem);
        echo json_encode($resposta);
    }
}

function editar_formulario($conexao){
    try{
        define('status', 'status');
        define('msg', 'msg');
        define('row', 'row');
        $i = 0;
            
        $id = $_POST['id'];
        $sql = "SELECT * FROM public.usuarios WHERE id_cadastro = $id";
        $resultado = mysqli_query($conexao, $sql);
        $row = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
        
        $row[$i]['cpf']             = substr($row[$i]['cpf'], 0, 3) . '.' . substr($row[$i]['cpf'], 3, 3) . '.' . substr($row[$i]['cpf'], 6, 3) . '-' . substr($row[$i]['cpf'], 9, 2);
        

        if ($resultado){
            $resposta = array(status =>true, row => $row);
        }else{
            $mensagem = 'Erro ao buscar dados';
            $resposta = array(status =>false, row => '', msg => $mensagem);
            }

        mysqli_close($conexao);
        echo json_encode($resposta);

    } catch (Exception $e){
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status => false, msg => $mensagem);
        echo json_encode($resposta);
    }
}

function excluir_formulario($conexao){

    try{

        define('status', 'status');
        define('msg', 'msg');
            
        $id = $_POST['id'];

        $sql = "UPDATE public.cadastro SET situacao = 0 WHERE id_cadastro = '$id'";
        $resultado = mysqli_query($conexao, $sql);

        if ($resultado){
            $mensagem = 'Excluído com sucesso';
            $resposta = array(status =>true, msg => $mensagem);
        }else{
            $mensagem = 'Erro excluir o cadastro';
            $resposta = array(status =>false, msg => $mensagem);
        }

        mysqli_close($conexao);
        echo json_encode($resposta);

    } catch (Exception $e) {
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status => false, msg => $mensagem);
        echo json_encode($resposta);
    }
}
   
function buscar_dados($conexao){ 
  
    try { 

        define('status', 'status');
        define('msg', 'msg');
        define('row', 'row');

        $id                 = $_POST['id'];
        $id_nome_completo   = $_POST['nome_completo'];
        $nome_add           = $_POST['nome_add'];
        $cpf                = $_POST['cpf'];
        $cpf                = base64_decode($cpf);
        $email              = $_POST['email'];
        $tipo               = $_POST['tipo'];
        

        if($id > 0 ){
            $clausula = "AND id_cadastro = $id";
        } else {
            $clausula = '';
        }

        if($id_nome_completo != ''){
            $clausula = "AND id_cadastro = '$id_nome_completo'";
        }

        if($cpf != ''){
            $cpf = str_replace('.', '', $cpf);
            $cpf = str_replace('-', '', $cpf);
            $clausula = " AND cpf = '$cpf'";
        }

        if($email != ''){
            $clausula = " AND email = '$email'";
        }

        if($tipo != ''){
            $clausula = " AND tipo = '$tipo'";
        }

        if($nome_add != ''){
            $clausula = " AND tipo = '$nome_add'";
        }

        $sql = "SELECT a.email, cpf, nome_completo, tipo 
                FROM cadastro as a 
                JOIN usuarios as b ON a.id_cadastro = b.id_cadastro AND b.situacao = 1";
        $resultado = mysqli_query($conexao, $sql);
        $row = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

        for ($i = 0; $i < count($row); $i++) {
            $row[$i]['cpf']             = substr($row[$i]['cpf'], 0, 3) . '.' . substr($row[$i]['cpf'], 3, 3) . '.' . substr($row[$i]['cpf'], 6, 3) . '-' . substr($row[$i]['cpf'], 9, 2);
            $row[$i]['acao']            = create_acao($row[$i]['id_cadastro']);
        }
            
        if ($resultado){
            $resposta = array(status =>true, row => $row);
        }else{
            $mensagem = 'Erro ao buscar dados';
            $resposta = array(status =>false, row => '', msg => $mensagem);
            }

        mysqli_close($conexao);
        echo json_encode($resposta);

    } catch (Exception $e) {
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status => false, msg => $mensagem);
        echo json_encode($resposta);
    }
}

function create_acao($id){

    ob_start(); ?>

    <button type="button" class="btn btn-outline-dark" onclick="editar_formulario('<?= $id ?>')">
        <i class="bi bi-pencil"></i>
    </button>
    <button type="button" class="btn btn-outline-dark" onclick="excluir_formulario('<?= $id ?>')">
        <i class="bi bi-trash3"></i>
    </button>

    <?php  return ob_get_clean();
}

function buscar_nome_completo($conexao){
    try {

        define('status', 'status');
        define('row', 'row');
        define('msg', 'msg');

        $filtro = $_POST['filtro'];

        if (!empty($filtro)) {
            $clausula = "AND nome_completo LIKE '%$filtro%' ";
        }

        $sql = "SELECT id_cadastro as id, concat_ws(' - ', id_cadastro, nome_completo) as text FROM public.cadastro WHERE situacao = 1 $clausula";
        $resultado = mysqli_query($conexao, $sql);
        $row = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

        if ($resultado) {
            $resposta = array(status => true, row => $row);
        } else {
            $mensagem = 'Erro ao buscar dados';
            $resposta = array(status => false, row => '', msg => $mensagem);
        }

        mysqli_close($conexao);
        echo json_encode($resposta);


    } catch (Exception $e) {
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status => false, msg => $mensagem);
        echo json_encode($resposta);
    }
}

function add_nome($conexao){
    try {

        define('status', 'status');
        define('row', 'row');
        define('msg', 'msg');

        $filtro = $_POST['filtro'];

        if (!empty($filtro)) {
            $clausula = "AND nome_completo LIKE '%$filtro%' ";
        }

        $sql = "SELECT id_cadastro as id, concat_ws(' - ', id_cadastro, nome_completo) as text FROM public.cadastro WHERE situacao = 1 $clausula";
        $resultado = mysqli_query($conexao, $sql);
        $row = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

        if ($resultado) {
            $resposta = array(status => true, row => $row);
        } else {
            $mensagem = 'Erro ao buscar dados';
            $resposta = array(status => false, row => '', msg => $mensagem);
        }

        mysqli_close($conexao);
        echo json_encode($resposta);


    } catch (Exception $e) {
        $mensagem = 'Erro ao se comunicar com servidor ' . $e->getMessage();
        $resposta = array(status => false, msg => $mensagem);
        echo json_encode($resposta);
    }
}