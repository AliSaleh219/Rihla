<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Trips;
use Doctrine\ORM\EntityManagerInterface;
final class TripMakerController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {}
    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!is_array($data)) {
            return $this->json(['error' => 'Invalid JSON.'], Response::HTTP_BAD_REQUEST);
        }
        // Validate required fields
        if (empty($data['title']) || empty($data['governorate'])) {
            return $this->json([
                'error' => 'Missing required fields: title and governorate.'
            ], Response::HTTP_BAD_REQUEST);
        }
        // Extract governorate ID from IRI string (e.g., '/api/governorates/29')
        if (preg_match('#/([0-9]+)$#', $data['governorate'], $matches)) {
            $governorateId = $matches[1];
        } else {
            return $this->json([
                'error' => 'Invalid governorate format.'
            ], Response::HTTP_BAD_REQUEST);
        }
        $province = $this->entityManager
            ->getRepository(\App\Entity\Governorates::class)
            ->find($governorateId);
        if (!$province) {
            return $this->json([
                'error' => 'Governorate not found.'
            ], Response::HTTP_NOT_FOUND);
        }
        $trip = new Trips();
        $trip->setTitle($data['title']);
        $trip->setImage($data['image'] ?? '');
        $trip->setDescription($data['description'] ?? '');
        $trip->setGovernorate($province);
        $province->setTripsCount($province->getTripsCount() + 1);
        $this->entityManager->persist($trip);
        $this->entityManager->flush();
        return $trip;
    }
}
