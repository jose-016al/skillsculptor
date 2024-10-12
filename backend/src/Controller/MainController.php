<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(Security $security): Response
    {

        dump($security->getUser()->getId());

        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }
}
