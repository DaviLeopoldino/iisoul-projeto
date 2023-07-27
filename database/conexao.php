<?php 

    $dbHost = 'iisoul-cadastro-db-1';
    $dbUsername = 'root';
    $dbPassword = 'root';
    $db = 'public';
    

    $conexao = NEW mysqli($dbHost,$dbUsername,$dbPassword, $db);

    if($conexao->connect_errno){
        die("Connection failed: " . $conexao->connect_error);

        
    }//else{
      //echo "conexao efetuada com sucesso";
    //}
    return $conexao
    
?>