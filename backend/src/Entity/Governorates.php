<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GovernoratesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: GovernoratesRepository::class)]
#[ApiResource()]
class Governorates
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trip:read'])]
    private ?string $nameEn = null;

    #[ORM\Column(length: 255)]
    private ?string $nameAr = null;

    #[ORM\Column(length: 255)]
    private ?string $slug = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $coverImage = null;

    #[ORM\Column]
    private ?int $tripsCount = null;

    #[ORM\Column]
    private ?bool $isActive = null;

    /**
     * @var Collection<int, Trips>
     */
    #[ORM\OneToMany(targetEntity: Trips::class, mappedBy: 'governorate')]
    private Collection $trips;

    public function __construct()
    {
        $this->trips = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameEn(): ?string
    {
        return $this->nameEn;
    }

    public function setNameEn(string $name_en): static
    {
        $this->nameEn = $name_en;

        return $this;
    }

    public function getNameAr(): ?string
    {
        return $this->nameAr;
    }

    public function setNameAr(string $name_ar): static
    {
        $this->nameAr = $name_ar;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCoverImage(): ?string
    {
        return $this->coverImage;
    }

    public function setCoverImage(?string $coverImage): static
    {
        $this->coverImage = $coverImage;

        return $this;
    }

    public function getTripsCount(): ?int
    {
        return $this->tripsCount;
    }

    public function setTripsCount(int $tripsCount): static
    {
        $this->tripsCount = $tripsCount;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * @return Collection<int, Trips>
     */
    public function getTrips(): Collection
    {
        return $this->trips;
    }

    public function addTrip(Trips $trip): static
    {
        if (!$this->trips->contains($trip)) {
            $this->trips->add($trip);
            $trip->setGovernorate($this);
        }

        return $this;
    }

    public function removeTrip(Trips $trip): static
    {
        if ($this->trips->removeElement($trip)) {
            // set the owning side to null (unless already changed)
            if ($trip->getGovernorate() === $this) {
                $trip->setGovernorate(null);
            }
        }

        return $this;
    }
}
