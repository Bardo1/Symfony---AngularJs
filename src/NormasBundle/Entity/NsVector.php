<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsVector
 *
 * @ORM\Table(name="ns_vector", uniqueConstraints={@ORM\UniqueConstraint(name="ns_vector_unique", columns={"id_gen_rubro", "nombre"})}, indexes={@ORM\Index(name="IDX_2F46A84DB4C0FC53", columns={"id_gen_rubro"})})
 * @ORM\Entity
 */
class NsVector
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="ns_vector_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=150, nullable=true)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="columna", type="string", length=20, nullable=false)
     */
    private $columna;

    /**
     * @var integer
     *
     * @ORM\Column(name="prioridad", type="integer", nullable=true)
     */
    private $prioridad;

    /**
     * @var string
     *
     * @ORM\Column(name="ns", type="string", length=3, nullable=true)
     */
    private $ns;

    /**
     * @var string
     *
     * @ORM\Column(name="operador", type="string", length=5, nullable=true)
     */
    private $operador;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo;

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
     * Set nombre
     *
     * @param string $nombre
     *
     * @return NsVector
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
     * Set columna
     *
     * @param string $columna
     *
     * @return NsVector
     */
    public function setColumna($columna)
    {
        $this->columna = $columna;

        return $this;
    }

    /**
     * Get columna
     *
     * @return string
     */
    public function getColumna()
    {
        return $this->columna;
    }

    /**
     * Set prioridad
     *
     * @param integer $prioridad
     *
     * @return NsVector
     */
    public function setPrioridad($prioridad)
    {
        $this->prioridad = $prioridad;

        return $this;
    }

    /**
     * Get prioridad
     *
     * @return integer
     */
    public function getPrioridad()
    {
        return $this->prioridad;
    }

    /**
     * Set ns
     *
     * @param string $ns
     *
     * @return NsVector
     */
    public function setNs($ns)
    {
        $this->ns = $ns;

        return $this;
    }

    /**
     * Get ns
     *
     * @return string
     */
    public function getNs()
    {
        return $this->ns;
    }

    /**
     * Set operador
     *
     * @param string $operador
     *
     * @return NsVector
     */
    public function setOperador($operador)
    {
        $this->operador = $operador;

        return $this;
    }

    /**
     * Get operador
     *
     * @return string
     */
    public function getOperador()
    {
        return $this->operador;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return NsVector
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
     * Set idGenRubro
     *
     * @param \NormasBundle\Entity\GenRubro $idGenRubro
     *
     * @return NsVector
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
