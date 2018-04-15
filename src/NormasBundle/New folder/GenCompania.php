<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenCompania
 *
 * @ORM\Table(name="gen_compania")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenCompaniaRepository")
 */
class GenCompania
{
    /**
     * @var integer
     *
     * @ORM\Column(name="rutcompaÃ±ia", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_compania_rutcompaÃ±ia_seq", allocationSize=1, initialValue=1)
     */
    private $rutcompaã±ia;

    /**
     * @var string
     *
     * @ORM\Column(name="dvcompaÃ±ia", type="string", length=1, nullable=true)
     */
    private $dvcompaã±ia;

    /**
     * @var string
     *
     * @ORM\Column(name="siglacompaÃ±ia", type="string", length=20, nullable=true)
     */
    private $siglacompaã±ia;

    /**
     * @var string
     *
     * @ORM\Column(name="nombrecompaÃ±ia", type="string", length=80, nullable=true)
     */
    private $nombrecompaã±ia;



    /**
     * Get rutcompaã±ia
     *
     * @return integer 
     */
    public function getRutcompaã±ia()
    {
        return $this->rutcompaã±ia;
    }

    /**
     * Set dvcompaã±ia
     *
     * @param string $dvcompaã±ia
     * @return GenCompania
     */
    public function setDvcompaã±ia($dvcompaã±ia)
    {
        $this->dvcompaã±ia = $dvcompaã±ia;

        return $this;
    }

    /**
     * Get dvcompaã±ia
     *
     * @return string 
     */
    public function getDvcompaã±ia()
    {
        return $this->dvcompaã±ia;
    }

    /**
     * Set siglacompaã±ia
     *
     * @param string $siglacompaã±ia
     * @return GenCompania
     */
    public function setSiglacompaã±ia($siglacompaã±ia)
    {
        $this->siglacompaã±ia = $siglacompaã±ia;

        return $this;
    }

    /**
     * Get siglacompaã±ia
     *
     * @return string 
     */
    public function getSiglacompaã±ia()
    {
        return $this->siglacompaã±ia;
    }

    /**
     * Set nombrecompaã±ia
     *
     * @param string $nombrecompaã±ia
     * @return GenCompania
     */
    public function setNombrecompaã±ia($nombrecompaã±ia)
    {
        $this->nombrecompaã±ia = $nombrecompaã±ia;

        return $this;
    }

    /**
     * Get nombrecompaã±ia
     *
     * @return string 
     */
    public function getNombrecompaã±ia()
    {
        return $this->nombrecompaã±ia;
    }
}
