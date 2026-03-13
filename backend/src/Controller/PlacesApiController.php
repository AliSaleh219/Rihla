<?php

namespace App\Controller;

use App\Entity\Places;
use App\Repository\PlacesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_places_')]
final class PlacesApiController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(PlacesRepository $placesRepository): JsonResponse
    {
        $places = $placesRepository->findBy([], ['id' => 'ASC']);

        $data = array_map(
            fn (Places $place): array => $this->normalize($place),
            $places
        );

        return $this->json($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(Places $place): JsonResponse
    {
        return $this->json($this->normalize($place));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json(['error' => 'Invalid JSON body.'], Response::HTTP_BAD_REQUEST);
        }

        $name = isset($payload['name']) ? trim((string) $payload['name']) : '';
        $dire = isset($payload['dire']) ? trim((string) $payload['dire']) : '';

        if ($name === '' || $dire === '') {
            return $this->json(
                ['error' => 'Both "name" and "dire" are required.'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $place = new Places();
        $place->setName($name);
        $place->setDire($dire);

        $entityManager->persist($place);
        $entityManager->flush();

        return $this->json($this->normalize($place), Response::HTTP_CREATED);
    }

    private function normalize(Places $place): array
    {
        return [
            'id' => $place->getId(),
            'name' => $place->getName(),
            'dire' => $place->getDire(),
        ];
    }
}
