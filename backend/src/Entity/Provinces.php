<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProvincesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProvincesRepository::class)]
#[ApiResource]
class Provinces
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name_en = null;

    #[ORM\Column(length: 255)]
    private ?string $name_ar = null;

    #[ORM\Column(length: 255)]
    private ?string $slug = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $cover_image = null;

    #[ORM\Column]
    private ?int $trips_count = null;

    #[ORM\Column]
    private ?bool $is_active = null;

    /**
     * @var Collection<int, Sites>
     */
    #[ORM\OneToMany(targetEntity: Sites::class, mappedBy: 'province_id')]
    private Collection $sites;

    public function __construct()
    {
        $this->sites = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameEn(): ?string
    {
        return $this->name_en;
    }

    public function setNameEn(string $name_en): static
    {
        $this->name_en = $name_en;

        return $this;
    }

    public function getNameAr(): ?string
    {
        return $this->name_ar;
    }

    public function setNameAr(string $name_ar): static
    {
        $this->name_ar = $name_ar;

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
        return $this->cover_image;
    }

    public function setCoverImage(?string $cover_image): static
    {
        $this->cover_image = $cover_image;

        return $this;
    }

    public function getTripsCount(): ?int
    {
        return $this->trips_count;
    }

    public function setTripsCount(int $trips_count): static
    {
        $this->trips_count = $trips_count;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): static
    {
        $this->is_active = $is_active;

        return $this;
    }

    /**
     * @return Collection<int, Sites>
     */
    public function getSites(): Collection
    {
        return $this->sites;
    }

    public function addSite(Sites $site): static
    {
        if (!$this->sites->contains($site)) {
            $this->sites->add($site);
            $site->setProvinceId($this);
        }

        return $this;
    }

    public function removeSite(Sites $site): static
    {
        if ($this->sites->removeElement($site)) {
            // set the owning side to null (unless already changed)
            if ($site->getProvinceId() === $this) {
                $site->setProvinceId(null);
            }
        }

        return $this;
    }
}
