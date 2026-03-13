<?php

namespace App\Entity;

use App\Enum\siteTypeEnum;
use App\Repository\SitesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SitesRepository::class)]
class Sites
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?Provinces $province_id = null;

    #[ORM\Column(length: 255)]
    private ?string $name_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name_ar = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(enumType: siteTypeEnum::class)]
    private ?siteTypeEnum $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $cover_image = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 7)]
    private ?string $latitude = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 7)]
    private ?string $longitude = null;

    #[ORM\Column]
    private ?bool $is_active = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProvinceId(): ?Provinces
    {
        return $this->province_id;
    }

    public function setProvinceId(?Provinces $province_id): static
    {
        $this->province_id = $province_id;

        return $this;
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

    public function setNameAr(?string $name_ar): static
    {
        $this->name_ar = $name_ar;

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

    public function getType(): ?siteTypeEnum
    {
        return $this->type;
    }

    public function setType(siteTypeEnum $type): static
    {
        $this->type = $type;

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

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(string $longitude): static
    {
        $this->longitude = $longitude;

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
}
