<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class AuthController extends AbstractController
{
    // ─── Register ────────────────────────────────────────────
    #[Route('/register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $hasher,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setEmail($data['email'] ?? '');
        $user->setUsername($data['username'] ?? '');
        $user->setRoles(['ROLE_USER']);
        $user->setPhone($data['phone'] ?? '');


        // تحقق من الـ validation قبل ما نشفر الـ password
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $this->json(['errors' => $messages], 422);
        }

        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Account created successfully',
            'user'    => $this->formatUser($user),
        ], 201);
    }

    // ─── Login ───────────────────────────────────────────────
    #[Route('/login', methods: ['POST'])]
    public function login(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $hasher,
        JWTTokenManagerInterface $jwtManager,
        RefreshTokenGeneratorInterface $refreshTokenGenerator,
        RefreshTokenManagerInterface $refreshTokenManager,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $user = $userRepository->findOneBy(['email' => $data['email'] ?? '']);

        if (!$user || !$hasher->isPasswordValid($user, $data['password'] ?? '')) {
            return $this->json(['message' => 'Invalid credentials'], 401);
        }

        // إنشاء الـ Access Token
        $accessToken = $jwtManager->create($user);

        // إنشاء الـ Refresh Token وحفظه بالـ DB
        $refreshToken = $refreshTokenGenerator->createForUserWithTtl($user, 604800);
        $refreshTokenManager->save($refreshToken);

        $response = $this->json([
            'message' => 'Logged in successfully',
            'user'    => $this->formatUser($user),
        ]);

        // حط الـ tokens بالكوكيز
        $this->setAccessTokenCookie($response, $accessToken);
        $this->setRefreshTokenCookie($response, $refreshToken->getRefreshToken());

        return $response;
    }

    // ─── Logout ──────────────────────────────────────────────
    #[Route('/logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $response = $this->json(['message' => 'Logged out successfully']);

        // امسح الكوكيز
        $response->headers->clearCookie('BEARER', '/', null, true, true, 'lax');
        $response->headers->clearCookie('REFRESH_TOKEN', '/api/token/refresh', null, true, true, 'lax');

        return $response;
    }

    // ─── Me ──────────────────────────────────────────────────
    #[Route('/me', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function me(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        return $this->json(['user' => $this->formatUser($user)]);
    }

    // ─── Private Helpers ─────────────────────────────────────
    private function formatUser(User $user): array
    {
        return [
            'id'       => $user->getId(),
            'email'    => $user->getEmail(),
            'username' => $user->getUsername(),
            'roles'    => $user->getRoles(),
            'phone'    => $user->getPhone(),
            'createdAt' => $user->getCreatedAt()
        ];
    }

    private function setAccessTokenCookie(JsonResponse $response, string $token): void
    {
        $response->headers->setCookie(
            Cookie::create('BEARER')
                ->withValue($token)
                ->withExpires(time() + 900)  // 15 دقيقة
                ->withPath('/')
                ->withSecure(false)          // false لـ localhost، true بالـ production
                ->withHttpOnly(true)
                ->withSameSite('lax')
        );
    }

    private function setRefreshTokenCookie(JsonResponse $response, string $token): void
    {
        $response->headers->setCookie(
            Cookie::create('REFRESH_TOKEN')
                ->withValue($token)
                ->withExpires(time() + 604800) // 7 أيام
                ->withPath('/api/token/refresh')
                ->withSecure(false)            // false لـ localhost، true بالـ production
                ->withHttpOnly(true)
                ->withSameSite('lax')
        );
    }
}
