<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSac
 *
 * @ORM\Table(name="gen_sac", uniqueConstraints={@ORM\UniqueConstraint(name="gen_sac_un", columns={"idsac", "nombresac", "iddac"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenSacRepository")
 */
class GenSac
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_sac_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="idsac", type="integer", nullable=false)
     */
    private $idsac;

    /**
     * @var integer
     *
     * @ORM\Column(name="idcomuna", type="integer", nullable=true)
     */
    private $idcomuna;

    /**
     * @var string
     *
     * @ORM\Column(name="nombresac", type="string", length=150, nullable=true)
     */
    private $nombresac;

    /**
     * @var integer
     *
     * @ORM\Column(name="iddac", type="integer", nullable=true)
     */
    private $iddac;



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
     * Set idsac
     *
     * @param integer $idsac
     * @return GenSac
     */
    public function setIdsac($idsac)
    {
        $this->idsac = $idsac;

        return $this;
    }

    /**
     * Get idsac
     *
     * @return integer 
     */
    public function getIdsac()
    {
        return $this->idsac;
    }

    /**
     * Set idcomuna
     *
     * @param integer $idcomuna
     * @return GenSac
     */
    public function setIdcomuna($idcomuna)
    {
        $this->idcomuna = $idcomuna;

        return $this;
    }

    /**
     * Get idcomuna
     *
     * @return integer 
     */
    public function getIdcomuna()
    {
        return $this->idcomuna;
    }

    /**
     * Set nombresac
     *
     * @param string $nombresac
     * @return GenSac
     */
    public function setNombresac($nombresac)
    {
        $this->nombresac = $nombresac;

        return $this;
    }

    /**
     * Get nombresac
     *
     * @return string 
     */
    public function getNombresac()
    {
        return $this->nombresac;
    }

    /**
     * Set iddac
     *
     * @param integer $iddac
     * @return GenSac
     */
    public function setIddac($iddac)
    {
        $this->iddac = $iddac;

        return $this;
    }

    /**
     * Get iddac
     *
     * @return integer 
     */
    public function getIddac()
    {
        return $this->iddac;
    }
}
