<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenComuna
 *
 * @ORM\Table(name="gen_comuna", indexes={@ORM\Index(name="index_nonclutered_gencomuna_idproducto", columns={"region"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenComunaRepository")
 */
class GenComuna
{
    /**
     * @var string
     *
     * @ORM\Column(name="idcomuna", type="string", length=12, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_comuna_idcomuna_seq", allocationSize=1, initialValue=1)
     */
    private $idcomuna;

    /**
     * @var string
     *
     * @ORM\Column(name="region", type="string", length=2, nullable=true)
     */
    private $region;

    /**
     * @var string
     *
     * @ORM\Column(name="nombrecomuna", type="string", length=80, nullable=true)
     */
    private $nombrecomuna;

    /**
     * @var string
     *
     * @ORM\Column(name="resolucion", type="string", length=3, nullable=true)
     */
    private $resolucion;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecharesolucion", type="datetime", nullable=true)
     */
    private $fecharesolucion;

    /**
     * @var string
     *
     * @ORM\Column(name="comunaide", type="string", length=10, nullable=true)
     */
    private $comunaide;

    /**
     * @var string
     *
     * @ORM\Column(name="idprovincia", type="string", length=3, nullable=true)
     */
    private $idprovincia;

    /**
     * @var string
     *
     * @ORM\Column(name="zonaextrema", type="string", length=1, nullable=true)
     */
    private $zonaextrema;



    /**
     * Get idcomuna
     *
     * @return string 
     */
    public function getIdcomuna()
    {
        return $this->idcomuna;
    }

    /**
     * Set region
     *
     * @param string $region
     * @return GenComuna
     */
    public function setRegion($region)
    {
        $this->region = $region;

        return $this;
    }

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
     * Set nombrecomuna
     *
     * @param string $nombrecomuna
     * @return GenComuna
     */
    public function setNombrecomuna($nombrecomuna)
    {
        $this->nombrecomuna = $nombrecomuna;

        return $this;
    }

    /**
     * Get nombrecomuna
     *
     * @return string 
     */
    public function getNombrecomuna()
    {
        return $this->nombrecomuna;
    }

    /**
     * Set resolucion
     *
     * @param string $resolucion
     * @return GenComuna
     */
    public function setResolucion($resolucion)
    {
        $this->resolucion = $resolucion;

        return $this;
    }

    /**
     * Get resolucion
     *
     * @return string 
     */
    public function getResolucion()
    {
        return $this->resolucion;
    }

    /**
     * Set fecharesolucion
     *
     * @param \DateTime $fecharesolucion
     * @return GenComuna
     */
    public function setFecharesolucion($fecharesolucion)
    {
        $this->fecharesolucion = $fecharesolucion;

        return $this;
    }

    /**
     * Get fecharesolucion
     *
     * @return \DateTime 
     */
    public function getFecharesolucion()
    {
        return $this->fecharesolucion;
    }

    /**
     * Set comunaide
     *
     * @param string $comunaide
     * @return GenComuna
     */
    public function setComunaide($comunaide)
    {
        $this->comunaide = $comunaide;

        return $this;
    }

    /**
     * Get comunaide
     *
     * @return string 
     */
    public function getComunaide()
    {
        return $this->comunaide;
    }

    /**
     * Set idprovincia
     *
     * @param string $idprovincia
     * @return GenComuna
     */
    public function setIdprovincia($idprovincia)
    {
        $this->idprovincia = $idprovincia;

        return $this;
    }

    /**
     * Get idprovincia
     *
     * @return string 
     */
    public function getIdprovincia()
    {
        return $this->idprovincia;
    }

    /**
     * Set zonaextrema
     *
     * @param string $zonaextrema
     * @return GenComuna
     */
    public function setZonaextrema($zonaextrema)
    {
        $this->zonaextrema = $zonaextrema;

        return $this;
    }

    /**
     * Get zonaextrema
     *
     * @return string 
     */
    public function getZonaextrema()
    {
        return $this->zonaextrema;
    }
}
