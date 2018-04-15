<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsZhsVariedad
 *
 * @ORM\Table(name="ns_zhs_variedad", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_zhs_variedad", columns={"id_ns_zhs", "id_gen_variedad", "id_gen_compania", "moneda", "unidad", "id_gen_temporada_version"})}, indexes={@ORM\Index(name="IDX_B4BC79A5B559D320", columns={"id_ns_zhs"}), @ORM\Index(name="IDX_B4BC79A54E622007", columns={"id_gen_temporada_version"}), @ORM\Index(name="IDX_B4BC79A5A7B14B5E", columns={"id_gen_variedad"}), @ORM\Index(name="IDX_B4BC79A566E326F7", columns={"id_gen_compania"})})
 * @ORM\Entity
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
     * @var \NsZhs
     *
     * @ORM\ManyToOne(targetEntity="NsZhs")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_ns_zhs", referencedColumnName="id")
     * })
     */
    private $idNsZhs;

    /**
     * @var \GenTemporadaVersion
     *
     * @ORM\ManyToOne(targetEntity="GenTemporadaVersion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_temporada_version", referencedColumnName="id")
     * })
     */
    private $idGenTemporadaVersion;

    /**
     * @var \GenVariedad
     *
     * @ORM\ManyToOne(targetEntity="GenVariedad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_variedad", referencedColumnName="id")
     * })
     */
    private $idGenVariedad;

    /**
     * @var \GenCompania
     *
     * @ORM\ManyToOne(targetEntity="GenCompania")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_compania", referencedColumnName="id")
     * })
     */
    private $idGenCompania;



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
     * Set moneda
     *
     * @param string $moneda
     *
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
     *
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
     * Set idNsZhs
     *
     * @param \NormasBundle\Entity\NsZhs $idNsZhs
     *
     * @return NsZhsVariedad
     */
    public function setIdNsZhs(\NormasBundle\Entity\NsZhs $idNsZhs = null)
    {
        $this->idNsZhs = $idNsZhs;

        return $this;
    }

    /**
     * Get idNsZhs
     *
     * @return \NormasBundle\Entity\NsZhs
     */
    public function getIdNsZhs()
    {
        return $this->idNsZhs;
    }

    /**
     * Set idGenTemporadaVersion
     *
     * @param \NormasBundle\Entity\GenTemporadaVersion $idGenTemporadaVersion
     *
     * @return NsZhsVariedad
     */
    public function setIdGenTemporadaVersion(\NormasBundle\Entity\GenTemporadaVersion $idGenTemporadaVersion = null)
    {
        $this->idGenTemporadaVersion = $idGenTemporadaVersion;

        return $this;
    }

    /**
     * Get idGenTemporadaVersion
     *
     * @return \NormasBundle\Entity\GenTemporadaVersion
     */
    public function getIdGenTemporadaVersion()
    {
        return $this->idGenTemporadaVersion;
    }

    /**
     * Set idGenVariedad
     *
     * @param \NormasBundle\Entity\GenVariedad $idGenVariedad
     *
     * @return NsZhsVariedad
     */
    public function setIdGenVariedad(\NormasBundle\Entity\GenVariedad $idGenVariedad = null)
    {
        $this->idGenVariedad = $idGenVariedad;

        return $this;
    }

    /**
     * Get idGenVariedad
     *
     * @return \NormasBundle\Entity\GenVariedad
     */
    public function getIdGenVariedad()
    {
        return $this->idGenVariedad;
    }

    /**
     * Set idGenCompania
     *
     * @param \NormasBundle\Entity\GenCompania $idGenCompania
     *
     * @return NsZhsVariedad
     */
    public function setIdGenCompania(\NormasBundle\Entity\GenCompania $idGenCompania = null)
    {
        $this->idGenCompania = $idGenCompania;

        return $this;
    }

    /**
     * Get idGenCompania
     *
     * @return \NormasBundle\Entity\GenCompania
     */
    public function getIdGenCompania()
    {
        return $this->idGenCompania;
    }
}
