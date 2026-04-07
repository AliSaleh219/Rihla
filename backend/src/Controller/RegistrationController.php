<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
final class RegistrationController extends AbstractController
{
    public function __construct(
        private UserPasswordHasherInterface $userPasswordHasher,
        private EntityManagerInterface $entityManager,
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
            $data = json_decode($request->getContent(), true);
            $user = new User();
            $user->setUsername($data['username'] ?? '');
            $user->setEmail($data['email'] ?? '');
            $user->setPhone($data['phone'] ?? '');
            $user->setAvatar($data['avatar'] ?? '');
            $hashedPassword = $this->userPasswordHasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);
            $this->entityManager->persist($user);
            $this->entityManager->flush();

        return $this->json($data, 201);    
    }
}
