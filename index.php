<?php

//Routing

$q = isset($_GET['q']) ? $_GET['q'] : '';

if($q === '' || $q == 'home' || $q == 'accueil' || $q == 'acceuil')
{
    $page = 'home';
}


//else if($q === 'COMPLETER')
//{
//    $page = 'COMPLETER';
//}

else
{
    $page = '404';
}

ob_start();
include 'views/pages/'.$page.'.php';
$content = ob_get_clean();

include 'views/partials/header.php';
echo $content;
include 'views/partials/footer.php';
