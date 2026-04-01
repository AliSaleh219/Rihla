<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ItineraryDayRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ItineraryDayRepository::class)]
#[ApiResource]
class ItineraryDay
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $dayNumber = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'itineraryDays')]
    private ?Trips $trip = null;

    /**
     * @var Collection<int, ItineraryActivity>
     */
    #[ORM\OneToMany(targetEntity: ItineraryActivity::class, mappedBy: 'day')]
    private Collection $itineraryActivities;

    public function __construct()
    {
        $this->itineraryActivities = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayNumber(): ?int
    {
        return $this->dayNumber;
    }

    public function setDayNumber(int $dayNumber): static
    {
        $this->dayNumber = $dayNumber;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getTrip(): ?Trips
    {
        return $this->trip;
    }

    public function setTrip(?Trips $trip): static
    {
        $this->trip = $trip;

        return $this;
    }

    /**
     * @return Collection<int, ItineraryActivity>
     */
    public function getItineraryActivities(): Collection
    {
        return $this->itineraryActivities;
    }

    public function addItineraryActivity(ItineraryActivity $itineraryActivity): static
    {
        if (!$this->itineraryActivities->contains($itineraryActivity)) {
            $this->itineraryActivities->add($itineraryActivity);
            $itineraryActivity->setDay($this);
        }

        return $this;
    }

    public function removeItineraryActivity(ItineraryActivity $itineraryActivity): static
    {
        if ($this->itineraryActivities->removeElement($itineraryActivity)) {
            // set the owning side to null (unless already changed)
            if ($itineraryActivity->getDay() === $this) {
                $itineraryActivity->setDay(null);
            }
        }

        return $this;
    }
}
