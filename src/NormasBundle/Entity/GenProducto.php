<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenProducto
 *
 * @ORM\Table(name="gen_producto", uniqueConstraints={@ORM\UniqueConstraint(name="gen_producto_unique", columns={"codigo"})}, indexes={@ORM\Index(name="IDX_A6C01A8AB4C0FC53", columns={"id_gen_rubro"})})
 * @ORM\Entity
 */
class GenProducto
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_producto_id_seq", allocationSize=1, initialValue=1)
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
     * @ORM\Column(name="nombre", type="string", length=120, nullable=false)
     */
    private $nombre;

    /**
     * @var integer
     *
     * @ORM\Column(name="categoria", type="integer", nullable=false)
     */
    private $categoria;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo;

    /**
     * @var string
     *
     * @ORM\Column(name="resolucion", type="string", length=3, nullable=true)
     */
    private $resolucion;

    /**
     * @var string
     *
     * @ORM\Column(name="fecha_resolucion", type="string", nullable=false)
     */
    private $fechaResolucion;

    /**
     * @var \GenRubro
     *
     * @ORM\ManyToOne(targetEntity="GenRubro")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_rubro", referencedColumnName="id")
     * })
     */
    private $idGenRubro;



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
     * @return GenProducto
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
     * @return GenProducto
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
     * Set categoria
     *
     * @param integer $categoria
     *
     * @return GenProducto
     */
    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;

        return $this;
    }

    /**
     * Get categoria
     *
     * @return integer
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
     * @return GenProducto
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
     * Set resolucion
     *
     * @param string $resolucion
     *
     * @return GenProducto
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
     * @param String $fechaResolucion
     *
     * @return GenProducto
     */
    public function setFechaResolucion($fechaResolucion)
    {
        $this->fechaResolucion = $fechaResolucion;
        return $this;
    }

    /**
     * Get fechaResolucion
     *
     * @return String
     */
    public function getFechaResolucion()
    {
        return $this->fechaResolucion;
    }

    /**
     * Set idGenRubro
     *
     * @param \NormasBundle\Entity\GenRubro $idGenRubro
     *
     * @return GenProducto
     */
    public function setIdGenRubro(\NormasBundle\Entity\GenRubro $idGenRubro = null)
    {
        $this->idGenRubro = $idGenRubro;

        return $this;
    }

    /**
     * Get idGenRubro
     *
     * @return \NormasBundle\Entity\GenRubro
     */
    public function getIdGenRubro()
    {
        return $this->idGenRubro;
    }
}
