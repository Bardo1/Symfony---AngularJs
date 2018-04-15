<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenVariedad
 *
 * @ORM\Table(name="gen_variedad", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_variedad", columns={"codigo"})}, indexes={@ORM\Index(name="IDX_84703E2C85016FF8", columns={"id_gen_producto"})})
 * @ORM\Entity
 */
class GenVariedad
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_variedad_id_seq", allocationSize=1, initialValue=1)
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
     * @var string
     *
     * @ORM\Column(name="fecha_producto_nuevo", type="string", nullable=true)
     */
    private $fechaProductoNuevo;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo = '1';

    /**
     * @var \GenProducto
     *
     * @ORM\ManyToOne(targetEntity="GenProducto")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_producto", referencedColumnName="id")
     * })
     */
    private $idGenProducto;



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
     * @return GenVariedad
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
     * @return GenVariedad
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
     * Set fechaProductoNuevo
     *
     * @param string $fechaProductoNuevo
     *
     * @return GenVariedad
     */
    public function setFechaProductoNuevo($fechaProductoNuevo)
    {
        $this->fechaProductoNuevo = $fechaProductoNuevo;

        return $this;
    }

    /**
     * Get fechaProductoNuevo
     *
     * @return string
     */
    public function getFechaProductoNuevo()
    {
        return $this->fechaProductoNuevo;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenVariedad
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
     * Set idGenProducto
     *
     * @param \NormasBundle\Entity\GenProducto $idGenProducto
     *
     * @return GenVariedad
     */
    public function setIdGenProducto(\NormasBundle\Entity\GenProducto $idGenProducto = null)
    {
        $this->idGenProducto = $idGenProducto;

        return $this;
    }

    /**
     * Get idGenProducto
     *
     * @return \NormasBundle\Entity\GenProducto
     */
    public function getIdGenProducto()
    {
        return $this->idGenProducto;
    }
}
