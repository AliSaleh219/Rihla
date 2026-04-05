<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RatingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RatingRepository::class)]
#[ApiResource]
class Rating
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $rate = null;

    #[ORM\ManyToOne(targetEntity: Trips::class, inversedBy: 'rating')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Trips $trips = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'rate')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRate(): ?int
    {
        return $this->rate;
    }

    public function setRate(int $rate): static
    {
        $this->rate = $rate;

        return $this;
    }

    public function getTrips(): ?Trips
    {
        return $this->trips;
    }

    public function setTrips(?Trips $trips): static
    {
        $this->trips = $trips;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
