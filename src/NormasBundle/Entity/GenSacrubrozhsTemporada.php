<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSacRubroZhsTemporada
 *
 * @ORM\Table(name="gen_sac_rubro_zhs_temporada", uniqueConstraints={@ORM\UniqueConstraint(name="gen_sac_rubro_zhs_temporada_unique", columns={"id_gen_sac_rubro_zhs", "id_gen_temporada_version"})}, indexes={@ORM\Index(name="IDX_76539D5F4E622007", columns={"id_gen_temporada_version"}), @ORM\Index(name="IDX_76539D5F16E18B34", columns={"id_gen_sac_rubro_zhs"})})
 * @ORM\Entity
 */
class GenSacRubroZhsTemporada
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sac_rubro_zhs_temporada_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

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
     * @var \GenSacRubroZhs
     *
     * @ORM\ManyToOne(targetEntity="GenSacRubroZhs")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_sac_rubro_zhs", referencedColumnName="id")
     * })
     */
    private $idGenSacRubroZhs;



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
     * Set idGenTemporadaVersion
     *
     * @param \NormasBundle\Entity\GenTemporadaVersion $idGenTemporadaVersion
     *
     * @return GenSacRubroZhsTemporada
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
     * Set idGenSacRubroZhs
     *
     * @param \NormasBundle\Entity\GenSacRubroZhs $idGenSacRubroZhs
     *
     * @return GenSacRubroZhsTemporada
     */
    public function setIdGenSacRubroZhs(\NormasBundle\Entity\GenSacRubroZhs $idGenSacRubroZhs = null)
    {
        $this->idGenSacRubroZhs = $idGenSacRubroZhs;

        return $this;
    }

    /**
     * Get idGenSacRubroZhs
     *
     * @return \NormasBundle\Entity\GenSacRubroZhs
     */
    public function getIdGenSacRubroZhs()
    {
        return $this->idGenSacRubroZhs;
    }
}
