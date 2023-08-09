<?php 

include_once(__DIR__ . '../../database/conexao.php');

$acao = base64_decode($_POST['acao']);

switch ($acao){
    case 'login':
        login($conexao);
        break;

}

function login($conexao){

    try{

    define('status', 'status');
    define('msg', 'msg');

    $email = $_POST['email'];
    $senha = $_POST['senha'];

    if($email == '' || $senha == ''){
        $resposta = array(status => false, msg => 'Preencha todos os campos!');
        echo json_encode($resposta);
        exit;
    }

    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
    $query = mysqli_query($conexao, $sql);
    $total = mysqli_num_rows($query);
    $data = mysqli_fetch_all($query, MYSQLI_ASSOC);

    $id     = $data[0]['id_cadastro'];

    $sql_user = "SELECT a.nome_completo 
                 FROM cadastro as a 
                 JOIN usuarios as b ON a.id_cadastro = b.id_cadastro AND b.situacao = 1 
                 WHERE a.id_cadastro = '$id'";

    $query_user = mysqli_query($conexao, $sql_user);
    $data_user = mysqli_fetch_all($query_user, MYSQLI_ASSOC);

    if($total == 0){
        $resposta = array(status => false, msg => 'Usuário ou senha inválidos!');
    }else{

        $tipo   = $data[0]['tipo'];
        $tema   = $data[0]['tema'];
        $nome   = $data_user[0]['nome_completo'];
        
        session_start();
        $_SESSION['id_cadastro']    = $id;
        $_SESSION['tipo']           = $tipo;
        $_SESSION['tema']           = $tema;
        $_SESSION['nome_completo']  = $nome;

        $resposta = array(status => true, msg => 'Login efetuado com sucesso!');
    }

    mysqli_close($conexao);
    echo json_encode($resposta);

} catch (Exception $e) {
    $resposta = array(status => false, msg => 'Erro ao efetuar login!');
    echo json_encode($resposta);
    exit();

}


}