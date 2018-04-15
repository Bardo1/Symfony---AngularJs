<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenTiporiesgo
 *
 * @ORM\Table(name="gen_tiporiesgo")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenTiporiesgoRepository")
 */
class GenTiporiesgo
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idtiporiesgo", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_tiporiesgo_idtiporiesgo_seq", allocationSize=1, initialValue=1)
     */
    private $idtiporiesgo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombretiporiesgo", type="string", length=255, nullable=true)
     */
    private $nombretiporiesgo;



    /**
     * Get idtiporiesgo
     *
     * @return integer 
     */
    public function getIdtiporiesgo()
    {
        return $this->idtiporiesgo;
    }

    /**
     * Set nombretiporiesgo
     *
     * @param string $nombretiporiesgo
     * @return GenTiporiesgo
     */
    public function setNombretiporiesgo($nombretiporiesgo)
    {
        $this->nombretiporiesgo = $nombretiporiesgo;

        return $this;
    }

    /**
     * Get nombretiporiesgo
     *
     * @return string 
     */
    public function getNombretiporiesgo()
    {
        return $this->nombretiporiesgo;
    }
}
