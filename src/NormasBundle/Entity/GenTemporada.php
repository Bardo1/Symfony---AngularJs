<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenTemporada
 *
 * @ORM\Table(name="gen_temporada", uniqueConstraints={@ORM\UniqueConstraint(name="gen_temporada_unique", columns={"temporada"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenTemporadaRepository"))
 */

class GenTemporada
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_temporada_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="temporada", type="integer", nullable=false)
     */
    private $temporada;
    /**
     * @var \string
     *
     * @ORM\Column(name="fecha_inicio", type="string", nullable=false)
     */
    private $fechaInicio;

    /**
     * @var \string
     *
     * @ORM\Column(name="fecha_termino", type="string", nullable=false)
     */
    private $fechaTermino;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo = '1';



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
     * Set temporada
     *
     * @param integer $temporada
     *
     * @return GenTemporada
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
     * Set fechaInicio
     *
     * @param string $fechaInicio
     *
     * @return GenTemporada
     */
    public function setFechaInicio($fechaInicio)
    {
        $this->fechaInicio = $fechaInicio;

        return $this;
    }

    /**
     * Get fechaInicio
     *
     * @return string
     */
    public function getFechaInicio()
    {
        return $this->fechaInicio;
    }

    /**
     * Set fechaTermino
     *
     * @param string $fechaTermino
     *
     * @return GenTemporada
     */
    public function setFechaTermino($fechaTermino)
    {
        $this->fechaTermino = $fechaTermino;

        return $this;
    }

    /**
     * Get fechaTermino
     *
     * @return string
     */
    public function getFechaTermino()
    {
        return $this->fechaTermino;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenTemporada
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
}
