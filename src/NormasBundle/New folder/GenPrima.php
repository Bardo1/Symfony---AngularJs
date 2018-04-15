<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenPrima
 *
 * @ORM\Table(name="gen_prima")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenPrimaRepository")
 */
class GenPrima
{
    /**
     * @var integer
     *
     * @ORM\Column(name="temporada", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $temporada;

    /**
     * @var string
     *
     * @ORM\Column(name="version", type="string", length=2, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $version;

    /**
     * @var string
     *
     * @ORM\Column(name="tipoprima", type="string", length=3, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $tipoprima;

    /**
     * @var string
     *
     * @ORM\Column(name="moneda", type="string", length=2, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $moneda;

    /**
     * @var string
     *
     * @ORM\Column(name="idrubro", type="string", length=3, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $idrubro;

    /**
     * @var integer
     *
     * @ORM\Column(name="rutbeneficiario", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $rutbeneficiario;

    /**
     * @var integer
     *
     * @ORM\Column(name="rutcompaÃ±ia", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $rutcompaã±ia;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string", length=120, nullable=true)
     */
    private $descripcion;

    /**
     * @var string
     *
     * @ORM\Column(name="tipovalor", type="string", length=1, nullable=true)
     */
    private $tipovalor;

    /**
     * @var float
     *
     * @ORM\Column(name="valor1", type="float", precision=10, scale=0, nullable=true)
     */
    private $valor1;

    /**
     * @var float
     *
     * @ORM\Column(name="valor2", type="float", precision=10, scale=0, nullable=true)
     */
    private $valor2;

    /**
     * @var integer
     *
     * @ORM\Column(name="resolucion", type="integer", nullable=true)
     */
    private $resolucion;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecharesolucion", type="datetime", nullable=true)
     */
    private $fecharesolucion;



    /**
     * Set temporada
     *
     * @param integer $temporada
     * @return GenPrima
     */
    public function setTemporada($temporada)
    {
        $this->temporada = $temporada;

        return $this;
    }

    /**
     * Get temporada
     *
     * @return integer 
     */
    public function getTemporada()
    {
        return $this->temporada;
    }

    /**
     * Set version
     *
     * @param string $version
     * @return GenPrima
     */
    public function setVersion($version)
    {
        $this->version = $version;

        return $this;
    }

    /**
     * Get version
     *
     * @return string 
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * Set tipoprima
     *
     * @param string $tipoprima
     * @return GenPrima
     */
    public function setTipoprima($tipoprima)
    {
        $this->tipoprima = $tipoprima;

        return $this;
    }

    /**
     * Get tipoprima
     *
     * @return string 
     */
    public function getTipoprima()
    {
        return $this->tipoprima;
    }

    /**
     * Set moneda
     *
     * @param string $moneda
     * @return GenPrima
     */
    public function setMoneda($moneda)
    {
        $this->moneda = $moneda;

        return $this;
    }

    /**
     * Get moneda
     *
     * @return string 
     */
    public function getMoneda()
    {
        return $this->moneda;
    }

    /**
     * Set idrubro
     *
     * @param string $idrubro
     * @return GenPrima
     */
    public function setIdrubro($idrubro)
    {
        $this->idrubro = $idrubro;

        return $this;
    }

    /**
     * Get idrubro
     *
     * @return string 
     */
    public function getIdrubro()
    {
        return $this->idrubro;
    }

    /**
     * Set rutbeneficiario
     *
     * @param integer $rutbeneficiario
     * @return GenPrima
     */
    public function setRutbeneficiario($rutbeneficiario)
    {
        $this->rutbeneficiario = $rutbeneficiario;

        return $this;
    }

    /**
     * Get rutbeneficiario
     *
     * @return integer 
     */
    public function getRutbeneficiario()
    {
        return $this->rutbeneficiario;
    }

    /**
     * Set rutcompaã±ia
     *
     * @param integer $rutcompaã±ia
     * @return GenPrima
     */
    public function setRutcompaã±ia($rutcompaã±ia)
    {
        $this->rutcompaã±ia = $rutcompaã±ia;

        return $this;
    }

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
     * Set descripcion
     *
     * @param string $descripcion
     * @return GenPrima
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string 
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set tipovalor
     *
     * @param string $tipovalor
     * @return GenPrima
     */
    public function setTipovalor($tipovalor)
    {
        $this->tipovalor = $tipovalor;

        return $this;
    }

    /**
     * Get tipovalor
     *
     * @return string 
     */
    public function getTipovalor()
    {
        return $this->tipovalor;
    }

    /**
     * Set valor1
     *
     * @param float $valor1
     * @return GenPrima
     */
    public function setValor1($valor1)
    {
        $this->valor1 = $valor1;

        return $this;
    }

    /**
     * Get valor1
     *
     * @return float 
     */
    public function getValor1()
    {
        return $this->valor1;
    }

    /**
     * Set valor2
     *
     * @param float $valor2
     * @return GenPrima
     */
    public function setValor2($valor2)
    {
        $this->valor2 = $valor2;

        return $this;
    }

    /**
     * Get valor2
     *
     * @return float 
     */
    public function getValor2()
    {
        return $this->valor2;
    }

    /**
     * Set resolucion
     *
     * @param integer $resolucion
     * @return GenPrima
     */
    public function setResolucion($resolucion)
    {
        $this->resolucion = $resolucion;

        return $this;
    }

    /**
     * Get resolucion
     *
     * @return integer 
     */
    public function getResolucion()
    {
        return $this->resolucion;
    }

    /**
     * Set fecharesolucion
     *
     * @param \DateTime $fecharesolucion
     * @return GenPrima
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
}
