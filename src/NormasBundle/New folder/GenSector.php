<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSector
 *
 * @ORM\Table(name="gen_sector")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenSectorRepository")
 */
class GenSector
{
    /**
     * @var string
     *
     * @ORM\Column(name="idsector", type="string", length=2, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sector_idsector_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="sector", type="string", length=20, nullable=true)
     */
    private $sector;

    /**
     * @var integer
     *
     * @ORM\Column(name="ordensector", type="integer", nullable=true)
     */
    private $ordensector;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcioncantidadasegurada", type="string", length=50, nullable=true)
     */
    private $descripcioncantidadasegurada;

    /**
     * @var string
     *
     * @ORM\Column(name="cantidadasegurada", type="string", length=10, nullable=true)
     */
    private $cantidadasegurada;

    /**
     * @var integer
     *
     * @ORM\Column(name="idtiporiesgo", type="integer", nullable=true)
     */
    private $idtiporiesgo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombretiporiesgo", type="string", length=255, nullable=true)
     */
    private $nombretiporiesgo;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=true)
     */
    private $activo;



    /**
     * Get idsector
     *
     * @return string 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set sector
     *
     * @param string $sector
     * @return GenSector
     */
    public function setSector($sector)
    {
        $this->sector = $sector;
        return $this;
    }

    /**
     * Get sector
     *
     * @return string 
     */
    public function getSector()
    {
        return $this->sector;
    }

    /**
     * Set ordensector
     *
     * @param integer $ordensector
     * @return GenSector
     */
    public function setOrdensector($ordensector)
    {
        $this->ordensector = $ordensector;
        return $this;
    }

    /**
     * Get ordensector
     *
     * @return integer 
     */
    public function getOrdensector()
    {
        return $this->ordensector;
    }

    /**
     * Set descripcioncantidadasegurada
     *
     * @param string $descripcioncantidadasegurada
     * @return GenSector
     */
    public function setDescripcioncantidadasegurada($descripcioncantidadasegurada)
    {
        $this->descripcioncantidadasegurada = $descripcioncantidadasegurada;
        return $this;
    }

    /**
     * Get descripcioncantidadasegurada
     *
     * @return string 
     */
    public function getDescripcioncantidadasegurada()
    {
        return $this->descripcioncantidadasegurada;
    }

    /**
     * Set cantidadasegurada
     *
     * @param string $cantidadasegurada
     * @return GenSector
     */
    public function setCantidadasegurada($cantidadasegurada)
    {
        $this->cantidadasegurada = $cantidadasegurada;
        return $this;
    }

    /**
     * Get cantidadasegurada
     *
     * @return string 
     */
    public function getCantidadasegurada()
    {
        return $this->cantidadasegurada;
    }

    /**
     * Set idtiporiesgo
     *
     * @param integer $idtiporiesgo
     * @return GenSector
     */
    public function setIdtiporiesgo($idtiporiesgo)
    {
        $this->idtiporiesgo = $idtiporiesgo;
        return $this;
    }

    /**
     * Get idtiporiesgo
     *
     * @return integer 
     */
    public function getIdtiporiesgo()
    {
        return $this->idtiporiesgo;
    }

    /**
     * Set nombretiporiesgo
     *
     * @param string $nombretiporiesgo
     * @return GenSector
     */
    public function setNombretiporiesgo($nombretiporiesgo)
    {
        $this->nombretiporiesgo = $nombretiporiesgo;

        return $this;
    }

    /**
     * Get nombretiporiesgo
     *
     * @return string 
     */
    public function getNombretiporiesgo()
    {
        return $this->nombretiporiesgo;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     * @return GenSector
     */
    public function setActivo($activo)
    {
        $this->activo = $activo;

        return $this;
    }

    /**
     * Get activo
     *
     * @return integer 
     */
    public function getActivo()
    {
        return $this->activo;
    }
}
