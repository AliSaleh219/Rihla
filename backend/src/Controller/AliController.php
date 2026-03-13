<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class AliController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    #[Route('/ali', name: 'app_ali')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Hello Ali!',
            'path' => 'src/Controller/AliController.php',
        ]);
    }
}
