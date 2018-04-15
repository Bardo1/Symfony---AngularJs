<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenTemporadaVersion
 *
 * @ORM\Table(name="gen_temporada_version", uniqueConstraints={@ORM\UniqueConstraint(name="gen_temporada_version_unique", columns={"id_gen_temporada", "temporada_version"})}, indexes={@ORM\Index(name="IDX_9FD5B70744F2FA11", columns={"id_gen_temporada"})})
 * @ORM\Entity
 */
class GenTemporadaVersion
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_temporada_version_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="temporada_version", type="integer", nullable=false)
     */
    private $temporadaVersion;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=true)
     */
    private $activo;

    /**
     * @var \GenTemporada
     *
     * @ORM\ManyToOne(targetEntity="GenTemporada")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_temporada", referencedColumnName="id")
     * })
     */
    private $idGenTemporada;



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
     * Set temporadaVersion
     *
     * @param integer $temporadaVersion
     *
     * @return GenTemporadaVersion
     */
    public function setTemporadaVersion($temporadaVersion)
    {
        $this->temporadaVersion = $temporadaVersion;

        return $this;
    }

    /**
     * Get temporadaVersion
     *
     * @return integer
     */
    public function getTemporadaVersion()
    {
        return $this->temporadaVersion;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenTemporadaVersion
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

    /**
     * Set idGenTemporada
     *
     * @param \NormasBundle\Entity\GenTemporada $idGenTemporada
     *
     * @return GenTemporadaVersion
     */
    public function setIdGenTemporada(\NormasBundle\Entity\GenTemporada $idGenTemporada = null)
    {
        $this->idGenTemporada = $idGenTemporada;

        return $this;
    }

    /**
     * Get idGenTemporada
     *
     * @return \NormasBundle\Entity\GenTemporada
     */
    public function getIdGenTemporada()
    {
        return $this->idGenTemporada;
    }
}
