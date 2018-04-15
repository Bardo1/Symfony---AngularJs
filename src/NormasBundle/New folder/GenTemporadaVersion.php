<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenTemporadaVersion
 *
 * @ORM\Table(name="gen_temporada_version", indexes={@ORM\Index(name="IDX_9FD5B70784DE49F8", columns={"temporada_version"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenTemporadaVersionRepository")
 */
class GenTemporadaVersion
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_temporada_version_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="temporada", type="integer", nullable=false)
     */
    private $temporada;

    /**
     * @var \GenTemporadaagricola
     *
     * @ORM\ManyToOne(targetEntity="GenTemporadaagricola")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="temporada_version", referencedColumnName="temporadaagricola")
     * })
     */
    private $temporadaVersion;



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
     * Set temporada
     *
     * @param integer $temporada
     * @return GenTemporadaVersion
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
     * Set temporadaVersion
     *
     * @param \NormasBundle\Entity\GenTemporadaagricola $temporadaVersion
     * @return GenTemporadaVersion
     */
    public function setTemporadaVersion(\NormasBundle\Entity\GenTemporadaagricola $temporadaVersion = null)
    {
        $this->temporadaVersion = $temporadaVersion;

        return $this;
    }

    /**
     * Get temporadaVersion
     *
     * @return \NormasBundle\Entity\GenTemporadaagricola 
     */
    public function getTemporadaVersion()
    {
        return $this->temporadaVersion;
    }
}
