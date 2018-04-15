<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * GenSacRubroZhs
 * 
 * @ORM\Table(name="gen_sac_rubro_zhs", uniqueConstraints={@ORM\UniqueConstraint(name="gen_sac_rubro_zhs_unique", columns={"id_gen_rubro", "id_ns_zhs", "id_gen_sac"})}, indexes={@ORM\Index(name="IDX_E7D6E323B559D320", columns={"id_ns_zhs"}), @ORM\Index(name="IDX_E7D6E323B4C0FC53", columns={"id_gen_rubro"}), @ORM\Index(name="IDX_E7D6E3231E5FF059", columns={"id_gen_sac"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenSacRubroZhsRepository"))
 */
class GenSacRubroZhs
{

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sac_rubro_zhs_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo = '1';

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
     * @var \GenRubro
     *
     * @ORM\ManyToOne(targetEntity="GenRubro")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_rubro", referencedColumnName="id")
     * })
     */
    private $idGenRubro;

    /**
     * @var \GenSac
     *
     * @ORM\ManyToOne(targetEntity="GenSac")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_sac", referencedColumnName="id")
     * })
     */
    private $idGenSac;



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
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenSacRubroZhs
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
     * Set idNsZhs
     *
     * @param \NormasBundle\Entity\NsZhs $idNsZhs
     *
     * @return GenSacRubroZhs
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
     * Set idGenRubro
     *
     * @param \NormasBundle\Entity\GenRubro $idGenRubro
     *
     * @return GenSacRubroZhs
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

    /**
     * Set idGenSac
     *
     * @param \NormasBundle\Entity\GenSac $idGenSac
     *
     * @return GenSacRubroZhs
     */
    public function setIdGenSac(\NormasBundle\Entity\GenSac $idGenSac = null)
    {
        $this->idGenSac = $idGenSac;

        return $this;
    }

    /**
     * Get idGenSac
     *
     * @return \NormasBundle\Entity\GenSac
     */
    public function getIdGenSac()
    {
        return $this->idGenSac;
    }
}
