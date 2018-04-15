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
     * @ORM\Column(name="rutcompañia", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_compania_rutcompañia_seq", allocationSize=1, initialValue=1)
     */
    private $rutcompa�ia;

    /**
     * @var string
     *
     * @ORM\Column(name="dvcompañia", type="string", length=1, nullable=true)
     */
    private $dvcompa�ia;

    /**
     * @var string
     *
     * @ORM\Column(name="siglacompañia", type="string", length=20, nullable=true)
     */
    private $siglacompa�ia;

    /**
     * @var string
     *
     * @ORM\Column(name="nombrecompañia", type="string", length=80, nullable=true)
     */
    private $nombrecompa�ia;



    /**
     * Get rutcompa�ia
     *
     * @return integer 
     */
    public function getRutcompa�ia()
    {
        return $this->rutcompa�ia;
    }

    /**
     * Set dvcompa�ia
     *
     * @param string $dvcompa�ia
     * @return GenCompania
     */
    public function setDvcompa�ia($dvcompa�ia)
    {
        $this->dvcompa�ia = $dvcompa�ia;

        return $this;
    }

    /**
     * Get dvcompa�ia
     *
     * @return string 
     */
    public function getDvcompa�ia()
    {
        return $this->dvcompa�ia;
    }

    /**
     * Set siglacompa�ia
     *
     * @param string $siglacompa�ia
     * @return GenCompania
     */
    public function setSiglacompa�ia($siglacompa�ia)
    {
        $this->siglacompa�ia = $siglacompa�ia;

        return $this;
    }

    /**
     * Get siglacompa�ia
     *
     * @return string 
     */
    public function getSiglacompa�ia()
    {
        return $this->siglacompa�ia;
    }

    /**
     * Set nombrecompa�ia
     *
     * @param string $nombrecompa�ia
     * @return GenCompania
     */
    public function setNombrecompa�ia($nombrecompa�ia)
    {
        $this->nombrecompa�ia = $nombrecompa�ia;

        return $this;
    }

    /**
     * Get nombrecompa�ia
     *
     * @return string 
     */
    public function getNombrecompa�ia()
    {
        return $this->nombrecompa�ia;
    }
}
