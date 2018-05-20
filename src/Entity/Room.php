<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RoomRepository")
 * @UniqueEntity(fields={"name"}, message="This room already exists")
 */
class Room
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    private $properties = [];

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reserve", mappedBy="room", orphanRemoval=true)
     */
    private $reserves;

    public function __construct()
    {
        $this->reserves = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Reserve[]
     */
    public function getReserves(): Collection
    {
        return $this->reserves;
    }

    public function addReserve(Reserve $reserve): self
    {
        if (!$this->reserves->contains($reserve)) {
            $this->reserves[] = $reserve;
            $reserve->setRoom($this);
        }

        return $this;
    }

    public function removeReserve(Reserve $reserve): self
    {
        if ($this->reserves->contains($reserve)) {
            $this->reserves->removeElement($reserve);
            // set the owning side to null (unless already changed)
            if ($reserve->getRoom() === $this) {
                $reserve->setRoom(null);
            }
        }

        return $this;
    }

    public function toArray()
    {
        $array = $this->properties;

        $array['id'] = $this->getId();
        $array['name'] = $this->getName();
        $array['reserves'] = $this->getReserves();
        return $array;
    }
}
