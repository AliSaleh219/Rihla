<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TripsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TripsRepository::class)]
#[ApiResource]
class Trips
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'trips')]
    private ?Governorates $governorate = null;

    /**
     * @var Collection<int, Rating>
     */
    #[ORM\OneToMany(targetEntity: Rating::class, mappedBy: 'trips')]
    private Collection $rating;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    /**
     * @var Collection<int, Booking>
     */
    #[ORM\OneToMany(targetEntity: Booking::class, mappedBy: 'trip')]
    private Collection $bookings;

    /**
     * @var Collection<int, TripImage>
     */
    #[ORM\OneToMany(targetEntity: TripImage::class, mappedBy: 'trip')]
    private Collection $tripImages;

    /**
     * @var Collection<int, ItineraryDay>
     */
    #[ORM\OneToMany(targetEntity: ItineraryDay::class, mappedBy: 'trip')]
    private Collection $itineraryDays;

    /**
     * @var Collection<int, Favorite>
     */
    #[ORM\OneToMany(targetEntity: Favorite::class, mappedBy: 'trip')]
    private Collection $favorites;

    

    public function __construct()
    {
        $this->rating = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->tripImages = new ArrayCollection();
        $this->itineraryDays = new ArrayCollection();
        $this->favorites = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getGovernorate(): ?Governorates
    {
        return $this->governorate;
    }

    public function setGovernorate(?Governorates $governorate): static
    {
        $this->governorate = $governorate;

        return $this;
    }

    /**
     * @return Collection<int, Rating>
     */
    public function getRating(): Collection
    {
        return $this->rating;
    }

    public function addRating(Rating $rating): static
    {
        if (!$this->rating->contains($rating)) {
            $this->rating->add($rating);
            $rating->setTrips($this);
        }

        return $this;
    }

    public function removeRating(Rating $rating): static
    {
        if ($this->rating->removeElement($rating)) {
            // set the owning side to null (unless already changed)
            if ($rating->getTrips() === $this) {
                $rating->setTrips(null);
            }
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setTrip($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getTrip() === $this) {
                $booking->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, TripImage>
     */
    public function getTripImages(): Collection
    {
        return $this->tripImages;
    }

    public function addTripImage(TripImage $tripImage): static
    {
        if (!$this->tripImages->contains($tripImage)) {
            $this->tripImages->add($tripImage);
            $tripImage->setTrip($this);
        }

        return $this;
    }

    public function removeTripImage(TripImage $tripImage): static
    {
        if ($this->tripImages->removeElement($tripImage)) {
            // set the owning side to null (unless already changed)
            if ($tripImage->getTrip() === $this) {
                $tripImage->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ItineraryDay>
     */
    public function getItineraryDays(): Collection
    {
        return $this->itineraryDays;
    }

    public function addItineraryDay(ItineraryDay $itineraryDay): static
    {
        if (!$this->itineraryDays->contains($itineraryDay)) {
            $this->itineraryDays->add($itineraryDay);
            $itineraryDay->setTrip($this);
        }

        return $this;
    }

    public function removeItineraryDay(ItineraryDay $itineraryDay): static
    {
        if ($this->itineraryDays->removeElement($itineraryDay)) {
            // set the owning side to null (unless already changed)
            if ($itineraryDay->getTrip() === $this) {
                $itineraryDay->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Favorite>
     */
    public function getFavorites(): Collection
    {
        return $this->favorites;
    }

    public function addFavorite(Favorite $favorite): static
    {
        if (!$this->favorites->contains($favorite)) {
            $this->favorites->add($favorite);
            $favorite->setTrip($this);
        }

        return $this;
    }

    public function removeFavorite(Favorite $favorite): static
    {
        if ($this->favorites->removeElement($favorite)) {
            // set the owning side to null (unless already changed)
            if ($favorite->getTrip() === $this) {
                $favorite->setTrip(null);
            }
        }

        return $this;
    }

}
