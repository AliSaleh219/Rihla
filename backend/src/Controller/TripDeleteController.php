<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Trips;

final class TripDeleteController extends AbstractController
{   
    public function __construct(private EntityManagerInterface $entityManager) {}

    #[Route('/trips/{id}', name: 'app_trip_delete', methods: ['DELETE'])]
    public function __invoke(int $id, Request $request): JsonResponse
    {
        $trip = $this->entityManager->getRepository(Trips::class)->find($id);
        if (!$trip) {
            return $this->json([
                'error' => 'Trip not found.'
            ], Response::HTTP_NOT_FOUND);
        }
        // Decrement tripsCount in Governorates
        $governorate = $trip->getGovernorate();
        if ($governorate) {
            $currentCount = $governorate->getTripsCount() ?? 0;
            $governorate->setTripsCount(max(0, $currentCount - 1));
            $this->entityManager->persist($governorate);
        }
        $this->entityManager->remove($trip);
        $this->entityManager->flush();
        return $this->json([
            'message' => 'Trip deleted successfully.'
        ], Response::HTTP_OK);
    }
}
