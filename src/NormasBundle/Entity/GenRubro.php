<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenRubro
 *
 * @ORM\Table(name="gen_rubro", uniqueConstraints={@ORM\UniqueConstraint(name="gen_rubro_idx", columns={"codigo"})}, indexes={@ORM\Index(name="IDX_34F54074895260DF", columns={"id_gen_sector"})})
 * @ORM\Entity
 */
class GenRubro
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_rubro_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="codigo", type="string", length=3, nullable=false)
     */
    private $codigo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=50, nullable=false)
     */
    private $nombre;

    /**
     * @var integer
     *
     * @ORM\Column(name="orden", type="integer", nullable=true)
     */
    private $orden;

    /**
     * @var string
     *
     * @ORM\Column(name="categoria", type="string", length=20, nullable=true)
     */
    private $categoria;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo = '1';

    /**
     * @var \GenSector
     *
     * @ORM\ManyToOne(targetEntity="GenSector")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_sector", referencedColumnName="id")
     * })
     */
    private $idGenSector;



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
     * @return GenRubro
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
     * @return GenRubro
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
     * @return GenRubro
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
     * Set categoria
     *
     * @param string $categoria
     *
     * @return GenRubro
     */
    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;

        return $this;
    }

    /**
     * Get categoria
     *
     * @return string
     */
    public function getCategoria()
    {
        return $this->categoria;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenRubro
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
     * Set idGenSector
     *
     * @param \NormasBundle\Entity\GenSector $idGenSector
     *
     * @return GenRubro
     */
    public function setIdGenSector(\NormasBundle\Entity\GenSector $idGenSector = null)
    {
        $this->idGenSector = $idGenSector;

        return $this;
    }

    /**
     * Get idGenSector
     *
     * @return \NormasBundle\Entity\GenSector
     */
    public function getIdGenSector()
    {
        return $this->idGenSector;
    }
}
