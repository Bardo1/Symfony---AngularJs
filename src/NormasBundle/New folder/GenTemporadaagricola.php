<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenTemporadaagricola
 *
 * @ORM\Table(name="gen_temporadaagricola")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenTemporadaagricolaRepository")
 */
class GenTemporadaagricola
{
    /**
     * @var integer
     *
     * @ORM\Column(name="temporadaagricola", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_temporadaagricola_temporadaagricola_seq", allocationSize=1, initialValue=1)
     */
    private $temporadaagricola;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="iniciotemporada", type="datetime", nullable=true)
     */
    private $iniciotemporada;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="terminotemporada", type="datetime", nullable=true)
     */
    private $terminotemporada;

    /**
     * @var string
     *
     * @ORM\Column(name="vigente", type="string", length=1, nullable=true)
     */
    private $vigente;



    /**
     * Get temporadaagricola
     *
     * @return integer 
     */
    public function getTemporadaagricola()
    {
        return $this->temporadaagricola;
    }

    /**
     * Set iniciotemporada
     *
     * @param \DateTime $iniciotemporada
     * @return GenTemporadaagricola
     */
    public function setIniciotemporada($iniciotemporada)
    {
        $this->iniciotemporada = $iniciotemporada;

        return $this;
    }

    /**
     * Get iniciotemporada
     *
     * @return \DateTime 
     */
    public function getIniciotemporada()
    {
        return $this->iniciotemporada;
    }

    /**
     * Set terminotemporada
     *
     * @param \DateTime $terminotemporada
     * @return GenTemporadaagricola
     */
    public function setTerminotemporada($terminotemporada)
    {
        $this->terminotemporada = $terminotemporada;

        return $this;
    }

    /**
     * Get terminotemporada
     *
     * @return \DateTime 
     */
    public function getTerminotemporada()
    {
        return $this->terminotemporada;
    }

    /**
     * Set vigente
     *
     * @param string $vigente
     * @return GenTemporadaagricola
     */
    public function setVigente($vigente)
    {
        $this->vigente = $vigente;

        return $this;
    }

    /**
     * Get vigente
     *
     * @return string 
     */
    public function getVigente()
    {
        return $this->vigente;
    }
}
