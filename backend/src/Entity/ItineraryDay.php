<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ItineraryDayRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Attribute\Groups;


#[ORM\Entity(repositoryClass: ItineraryDayRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['day:read']],
)]
#[ApiFilter(SearchFilter::class, properties: ['trip' => 'exact'])]

class ItineraryDay
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['day:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['day:read'])]
    private ?int $dayNumber = null;

    #[ORM\Column(length: 255)]
    #[Groups(['day:read'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['day:read'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'itineraryDays')]
    #[Groups(['day:read'])]
    private ?Trips $trip = null;

    /**
     * @var Collection<int, ItineraryActivity>
     */
    #[ORM\OneToMany(targetEntity: ItineraryActivity::class, mappedBy: 'day')]
    #[Groups(['day:read'])]
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
