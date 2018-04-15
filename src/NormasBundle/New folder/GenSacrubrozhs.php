<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSacrubrozhs
 *
 * @ORM\Table(name="gen_sacrubrozhs", indexes={@ORM\Index(name="IDX_4863E27118AE3E78", columns={"idsac"}), @ORM\Index(name="IDX_4863E271448300F6", columns={"idrubro"}), @ORM\Index(name="IDX_4863E271DB0AAEDA", columns={"idzhs"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenrubrozhsRepository")
 */
class GenSacrubrozhs
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idsacrubrozhs", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sacrubrozhs_idsacrubrozhs_seq", allocationSize=1, initialValue=1)
     */
    private $idsacrubrozhs;

    /**
     * @var \GenSac
     *
     * @ORM\ManyToOne(targetEntity="GenSac")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idsac", referencedColumnName="id")
     * })
     */
    private $idsac;

    /**
     * @var \GenRubro
     *
     * @ORM\ManyToOne(targetEntity="GenRubro")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idrubro", referencedColumnName="idrubro")
     * })
     */
    private $idrubro;

    /**
     * @var \NsZhs
     *
     * @ORM\ManyToOne(targetEntity="NsZhs")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idzhs", referencedColumnName="id")
     * })
     */
    private $idzhs;



    /**
     * Get idsacrubrozhs
     *
     * @return integer 
     */
    public function getIdsacrubrozhs()
    {
        return $this->idsacrubrozhs;
    }

    /**
     * Set idsac
     *
     * @param \NormasBundle\Entity\GenSac $idsac
     * @return GenSacrubrozhs
     */
    public function setIdsac(\NormasBundle\Entity\GenSac $idsac = null)
    {
        $this->idsac = $idsac;

        return $this;
    }

    /**
     * Get idsac
     *
     * @return \NormasBundle\Entity\GenSac 
     */
    public function getIdsac()
    {
        return $this->idsac;
    }

    /**
     * Set idrubro
     *
     * @param \NormasBundle\Entity\GenRubro $idrubro
     * @return GenSacrubrozhs
     */
    public function setIdrubro(\NormasBundle\Entity\GenRubro $idrubro = null)
    {
        $this->idrubro = $idrubro;

        return $this;
    }

    /**
     * Get idrubro
     *
     * @return \NormasBundle\Entity\GenRubro 
     */
    public function getIdrubro()
    {
        return $this->idrubro;
    }

    /**
     * Set idzhs
     *
     * @param \NormasBundle\Entity\NsZhs $idzhs
     * @return GenSacrubrozhs
     */
    public function setIdzhs(\NormasBundle\Entity\NsZhs $idzhs = null)
    {
        $this->idzhs = $idzhs;

        return $this;
    }

    /**
     * Get idzhs
     *
     * @return \NormasBundle\Entity\NsZhs 
     */
    public function getIdzhs()
    {
        return $this->idzhs;
    }
}
