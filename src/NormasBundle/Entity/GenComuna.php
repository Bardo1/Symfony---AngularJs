<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenComuna
 *
 * @ORM\Table(name="gen_comuna", uniqueConstraints={@ORM\UniqueConstraint(name="gen_comuna_unique", columns={"codigo"})}, indexes={@ORM\Index(name="index_nonclutered_gencomuna_idproducto", columns={"id_gen_region"})})
 * @ORM\Entity
 */
class GenComuna
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_comuna_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="codigo", type="integer", nullable=false)
     */
    private $codigo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=80, nullable=true)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="ide", type="string", length=10, nullable=true)
     */
    private $ide;

    /**
     * @var string
     *
     * @ORM\Column(name="provincia", type="string", length=3, nullable=true)
     */
    private $provincia;

    /**
     * @var integer
     *
     * @ORM\Column(name="zona_extrema", type="integer", nullable=false)
     */
    private $zonaExtrema;

    /**
     * @var string
     *
     * @ORM\Column(name="resolucion", type="string", length=3, nullable=true)
     */
    private $resolucion;

    /**
     * @var string
     *
     * @ORM\Column(name="fecha_resolucion", type="string", nullable=true)
     */
    private $fechaResolucion;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=true)
     */
    private $activo;

    /**
     * @var \GenRegion
     *
     * @ORM\ManyToOne(targetEntity="GenRegion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_region", referencedColumnName="id")
     * })
     */
    private $idGenRegion;



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
     * @param integer $codigo
     *
     * @return GenComuna
     */
    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;

        return $this;
    }

    /**
     * Get codigo
     *
     * @return integer
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
     * @return GenComuna
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
     * Set ide
     *
     * @param string $ide
     *
     * @return GenComuna
     */
    public function setIde($ide)
    {
        $this->ide = $ide;

        return $this;
    }

    /**
     * Get ide
     *
     * @return string
     */
    public function getIde()
    {
        return $this->ide;
    }

    /**
     * Set provincia
     *
     * @param string $provincia
     *
     * @return GenComuna
     */
    public function setProvincia($provincia)
    {
        $this->provincia = $provincia;

        return $this;
    }

    /**
     * Get provincia
     *
     * @return string
     */
    public function getProvincia()
    {
        return $this->provincia;
    }

    /**
     * Set zonaExtrema
     *
     * @param integer $zonaExtrema
     *
     * @return GenComuna
     */
    public function setZonaExtrema($zonaExtrema)
    {
        $this->zonaExtrema = $zonaExtrema;

        return $this;
    }

    /**
     * Get zonaExtrema
     *
     * @return integer
     */
    public function getZonaExtrema()
    {
        return $this->zonaExtrema;
    }

    /**
     * Set resolucion
     *
     * @param string $resolucion
     *
     * @return GenComuna
     */
    public function setResolucion($resolucion)
    {
        $this->resolucion = $resolucion;

        return $this;
    }

    /**
     * Get resolucion
     *
     * @return string
     */
    public function getResolucion()
    {
        return $this->resolucion;
    }

    /**
     * Set fechaResolucion
     *
     * @param string $fechaResolucion
     *
     * @return GenComuna
     */
    public function setFechaResolucion($fechaResolucion)
    {
        $this->fechaResolucion = $fechaResolucion;

        return $this;
    }

    /**
     * Get fechaResolucion
     *
     * @return string
     */
    public function getFechaResolucion()
    {
        return $this->fechaResolucion;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenComuna
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

    /**
     * Set idGenRegion
     *
     * @param \NormasBundle\Entity\GenRegion $idGenRegion
     *
     * @return GenComuna
     */
    public function setIdGenRegion(\NormasBundle\Entity\GenRegion $idGenRegion = null)
    {
        $this->idGenRegion = $idGenRegion;

        return $this;
    }

    /**
     * Get idGenRegion
     *
     * @return \NormasBundle\Entity\GenRegion
     */
    public function getIdGenRegion()
    {
        return $this->idGenRegion;
    }
}
