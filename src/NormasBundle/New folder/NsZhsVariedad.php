<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsZhsVariedad
 *
 * @ORM\Table(name="ns_zhs_variedad", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_zhs_variedad", columns={"zhs", "idvariedad", "rutcompania", "moneda", "unidad", "temporada", "temporadaversion"})}, indexes={@ORM\Index(name="IDX_B4BC79A52FDE6ABE", columns={"idvariedad"}), @ORM\Index(name="IDX_B4BC79A5C20FF5BD", columns={"zhs"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\NsZhsVariedadRepository")
 */
class NsZhsVariedad
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="ns_zhs_variedad_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="rutcompania", type="integer", nullable=false)
     */
    private $rutcompania;

    /**
     * @var integer
     *
     * @ORM\Column(name="temporada", type="integer", nullable=false)
     */
    private $temporada;

    /**
     * @var integer
     *
     * @ORM\Column(name="temporadaversion", type="integer", nullable=false)
     */
    private $temporadaversion;

    /**
     * @var string
     *
     * @ORM\Column(name="moneda", type="string", length=2, nullable=false)
     */
    private $moneda;

    /**
     * @var string
     *
     * @ORM\Column(name="unidad", type="string", length=10, nullable=false)
     */
    private $unidad;

    /**
     * @var \NsVariedad
     *
     * @ORM\ManyToOne(targetEntity="NsVariedad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idvariedad", referencedColumnName="id")
     * })
     */
    private $idvariedad;

    /**
     * @var \NsZhs
     *
     * @ORM\ManyToOne(targetEntity="NsZhs")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="zhs", referencedColumnName="id")
     * })
     */
    private $zhs;



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
     * Set rutcompania
     *
     * @param integer $rutcompania
     * @return NsZhsVariedad
     */
    public function setRutcompania($rutcompania)
    {
        $this->rutcompania = $rutcompania;

        return $this;
    }

    /**
     * Get rutcompania
     *
     * @return integer 
     */
    public function getRutcompania()
    {
        return $this->rutcompania;
    }

    /**
     * Set temporada
     *
     * @param integer $temporada
     * @return NsZhsVariedad
     */
    public function setTemporada($temporada)
    {
        $this->temporada = $temporada;

        return $this;
    }

    /**
     * Get temporada
     *
     * @return integer 
     */
    public function getTemporada()
    {
        return $this->temporada;
    }

    /**
     * Set temporadaversion
     *
     * @param integer $temporadaversion
     * @return NsZhsVariedad
     */
    public function setTemporadaversion($temporadaversion)
    {
        $this->temporadaversion = $temporadaversion;

        return $this;
    }

    /**
     * Get temporadaversion
     *
     * @return integer 
     */
    public function getTemporadaversion()
    {
        return $this->temporadaversion;
    }

    /**
     * Set moneda
     *
     * @param string $moneda
     * @return NsZhsVariedad
     */
    public function setMoneda($moneda)
    {
        $this->moneda = $moneda;

        return $this;
    }

    /**
     * Get moneda
     *
     * @return string 
     */
    public function getMoneda()
    {
        return $this->moneda;
    }

    /**
     * Set unidad
     *
     * @param string $unidad
     * @return NsZhsVariedad
     */
    public function setUnidad($unidad)
    {
        $this->unidad = $unidad;

        return $this;
    }

    /**
     * Get unidad
     *
     * @return string 
     */
    public function getUnidad()
    {
        return $this->unidad;
    }

    /**
     * Set idvariedad
     *
     * @param \NormasBundle\Entity\NsVariedad $idvariedad
     * @return NsZhsVariedad
     */
    public function setIdvariedad(\NormasBundle\Entity\NsVariedad $idvariedad = null)
    {
        $this->idvariedad = $idvariedad;

        return $this;
    }

    /**
     * Get idvariedad
     *
     * @return \NormasBundle\Entity\NsVariedad 
     */
    public function getIdvariedad()
    {
        return $this->idvariedad;
    }

    /**
     * Set zhs
     *
     * @param \NormasBundle\Entity\NsZhs $zhs
     * @return NsZhsVariedad
     */
    public function setZhs(\NormasBundle\Entity\NsZhs $zhs = null)
    {
        $this->zhs = $zhs;

        return $this;
    }

    /**
     * Get zhs
     *
     * @return \NormasBundle\Entity\NsZhs 
     */
    public function getZhs()
    {
        return $this->zhs;
    }
}
