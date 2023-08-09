<?php session_start();

if(!isset($_SESSION['id_cadastro'])){
  header('location: http://iisoul-formulario.local/login.html');
  exit();
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Formulario</title>

    <!-- css -->
    <link href="css/links.css" rel="stylesheet">
    <link href="css/index.css" rel="stylesheet">
    
</head>
<body>

    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
        <a class="navbar-brand" href="index.php">iiSoul</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link active"><?php echo 'Olá, '.$_SESSION['nome_completo'] ?></a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" onclick="open_page('cadastro.html')">Cadastro</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" onclick="open_page('usuarios.html')">Usuários</a>
            </li>
            <li class="nav-item">
                <a href="logout.php" class="nav-link active"><i class="bi bi-box-arrow-right"></i></a>
            </li>
        </div>
        </div>
    </nav>

    <div id="content-wrapper"></div>

    <script>
        function open_page(page){
            $('#content-wrapper').load(page);
        }
    </script>

    <script src="js/scripts.js" type="text/javascript"></script>
   
</body>

</html>



