<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSacrubrozhsTemporada
 *
 * @ORM\Table(name="gen_sacrubrozhs_temporada", indexes={@ORM\Index(name="IDX_F33CA42D594D98FB", columns={"idsacrubrozhs"}), @ORM\Index(name="IDX_F33CA42DEF80A763", columns={"idgentemporadaversion"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenSacrubrozhsTemporadaRepository")
 */
class GenSacrubrozhsTemporada
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sacrubrozhs_temporada_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var \GenSacrubrozhs
     *
     * @ORM\ManyToOne(targetEntity="GenSacrubrozhs")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idsacrubrozhs", referencedColumnName="idsacrubrozhs")
     * })
     */
    private $idsacrubrozhs;

    /**
     * @var \GenTemporadaVersion
     *
     * @ORM\ManyToOne(targetEntity="GenTemporadaVersion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idgentemporadaversion", referencedColumnName="id")
     * })
     */
    private $idgentemporadaversion;



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
     * Set idsacrubrozhs
     *
     * @param \NormasBundle\Entity\GenSacrubrozhs $idsacrubrozhs
     * @return GenSacrubrozhsTemporada
     */
    public function setIdsacrubrozhs(\NormasBundle\Entity\GenSacrubrozhs $idsacrubrozhs = null)
    {
        $this->idsacrubrozhs = $idsacrubrozhs;

        return $this;
    }

    /**
     * Get idsacrubrozhs
     *
     * @return \NormasBundle\Entity\GenSacrubrozhs 
     */
    public function getIdsacrubrozhs()
    {
        return $this->idsacrubrozhs;
    }

    /**
     * Set idgentemporadaversion
     *
     * @param \NormasBundle\Entity\GenTemporadaVersion $idgentemporadaversion
     * @return GenSacrubrozhsTemporada
     */
    public function setIdgentemporadaversion(\NormasBundle\Entity\GenTemporadaVersion $idgentemporadaversion = null)
    {
        $this->idgentemporadaversion = $idgentemporadaversion;

        return $this;
    }

    /**
     * Get idgentemporadaversion
     *
     * @return \NormasBundle\Entity\GenTemporadaVersion 
     */
    public function getIdgentemporadaversion()
    {
        return $this->idgentemporadaversion;
    }
}
