<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Trips;

final class TripDeleteController extends AbstractController
{   
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function __invoke(Trips $trip): ?Trips
    {
        // Decrement tripsCount in Governorates
        $governorate = $trip->getGovernorate();
        if ($governorate) {
            $currentCount = $governorate->getTripsCount() ?? 0;
            $governorate->setTripsCount(max(0, $currentCount - 1));
            $this->entityManager->persist($governorate);
        }
        $this->entityManager->remove($trip);
        $this->entityManager->flush();
        return null;
    }
}
