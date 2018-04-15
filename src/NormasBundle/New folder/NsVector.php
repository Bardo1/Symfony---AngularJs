<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsVector
 *
 * @ORM\Table(name="ns_vector")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\NsVectorRepository")
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
     * @ORM\Column(name="idrubro", type="string", length=4, nullable=false)
     */
    private $idrubro;

    /**
     * @var string
     *
     * @ORM\Column(name="columna", type="string", length=20, nullable=false)
     */
    private $columna;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=50, nullable=true)
     */
    private $nombre;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo;

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
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idrubro
     *
     * @param string $idrubro
     * @return NsVector
     */
    public function setIdrubro($idrubro)
    {
        $this->idrubro = $idrubro;

        return $this;
    }

    /**
     * Get idrubro
     *
     * @return string 
     */
    public function getIdrubro()
    {
        return $this->idrubro;
    }

    /**
     * Set columna
     *
     * @param string $columna
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
     * Set nombre
     *
     * @param string $nombre
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
     * Set activo
     *
     * @param integer $activo
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
     * Set prioridad
     *
     * @param integer $prioridad
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
}
