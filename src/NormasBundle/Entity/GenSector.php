<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSector
 *
 * @ORM\Table(name="gen_sector", uniqueConstraints={@ORM\UniqueConstraint(name="gen_sector_unique", columns={"codigo"})})
 * @ORM\Entity
 */
class GenSector
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sector_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="codigo", type="string", length=2, nullable=false)
     */
    private $codigo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=20, nullable=true)
     */
    private $nombre;

    /**
     * @var integer
     *
     * @ORM\Column(name="orden", type="integer", nullable=true)
     */
    private $orden;

    /**
     * @var integer
     *
     * @ORM\Column(name="tipo_riesgo", type="integer", nullable=true)
     */
    private $tipoRiesgo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre_tipo_riesgo", type="string", length=150, nullable=true)
     */
    private $nombreTipoRiesgo;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo = '1';



    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set codigo
     *
     * @param string $codigo
     *
     * @return GenSector
     */
    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;

        return $this;
    }

    /**
     * Get codigo
     *
     * @return string
     */
    public function getCodigo()
    {
        return $this->codigo;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     *
     * @return GenSector
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set orden
     *
     * @param integer $orden
     *
     * @return GenSector
     */
    public function setOrden($orden)
    {
        $this->orden = $orden;

        return $this;
    }

    /**
     * Get orden
     *
     * @return integer
     */
    public function getOrden()
    {
        return $this->orden;
    }

    /**
     * Set tipoRiesgo
     *
     * @param integer $tipoRiesgo
     *
     * @return GenSector
     */
    public function setTipoRiesgo($tipoRiesgo)
    {
        $this->tipoRiesgo = $tipoRiesgo;

        return $this;
    }

    /**
     * Get tipoRiesgo
     *
     * @return integer
     */
    public function getTipoRiesgo()
    {
        return $this->tipoRiesgo;
    }

    /**
     * Set nombreTipoRiesgo
     *
     * @param string $nombreTipoRiesgo
     *
     * @return GenSector
     */
    public function setNombreTipoRiesgo($nombreTipoRiesgo)
    {
        $this->nombreTipoRiesgo = $nombreTipoRiesgo;

        return $this;
    }

    /**
     * Get nombreTipoRiesgo
     *
     * @return string
     */
    public function getNombreTipoRiesgo()
    {
        return $this->nombreTipoRiesgo;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
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
