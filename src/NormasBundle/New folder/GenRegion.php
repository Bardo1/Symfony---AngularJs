<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenRegion
 *
 * @ORM\Table(name="gen_region")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenRegionRepository")
 */
class GenRegion
{
    /**
     * @var string
     *
     * @ORM\Column(name="region", type="string", length=2, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_region_region_seq", allocationSize=1, initialValue=1)
     */
    private $region;

    /**
     * @var string
     *
     * @ORM\Column(name="nombreregion", type="string", length=50, nullable=true)
     */
    private $nombreregion;

    /**
     * @var string
     *
     * @ORM\Column(name="romanoregion", type="string", length=4, nullable=true)
     */
    private $romanoregion;

    /**
     * @var integer
     *
     * @ORM\Column(name="ordenregion", type="integer", nullable=true)
     */
    private $ordenregion;



    /**
     * Get region
     *
     * @return string 
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * Set nombreregion
     *
     * @param string $nombreregion
     * @return GenRegion
     */
    public function setNombreregion($nombreregion)
    {
        $this->nombreregion = $nombreregion;

        return $this;
    }

    /**
     * Get nombreregion
     *
     * @return string 
     */
    public function getNombreregion()
    {
        return $this->nombreregion;
    }

    /**
     * Set romanoregion
     *
     * @param string $romanoregion
     * @return GenRegion
     */
    public function setRomanoregion($romanoregion)
    {
        $this->romanoregion = $romanoregion;

        return $this;
    }

    /**
     * Get romanoregion
     *
     * @return string 
     */
    public function getRomanoregion()
    {
        return $this->romanoregion;
    }

    /**
     * Set ordenregion
     *
     * @param integer $ordenregion
     * @return GenRegion
     */
    public function setOrdenregion($ordenregion)
    {
        $this->ordenregion = $ordenregion;

        return $this;
    }

    /**
     * Get ordenregion
     *
     * @return integer 
     */
    public function getOrdenregion()
    {
        return $this->ordenregion;
    }
}
