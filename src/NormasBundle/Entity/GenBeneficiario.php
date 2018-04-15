<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenBeneficiario
 *
 * @ORM\Table(name="gen_beneficiario", indexes={@ORM\Index(name="index_nonclutered_genbeneficiario_grupo", columns={"grupobeneficiario"}), @ORM\Index(name="index_nonclutered_genbeneficiario_sigla", columns={"siglabeneficiario"})})
 * @ORM\Entity
 */
class GenBeneficiario
{
    /**
     * @var integer
     *
     * @ORM\Column(name="rutbeneficiario", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_beneficiario_rutbeneficiario_seq", allocationSize=1, initialValue=1)
     */
    private $rutbeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="dvbeneficiario", type="string", length=1, nullable=true)
     */
    private $dvbeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="siglabeneficiario", type="string", length=50, nullable=true)
     */
    private $siglabeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="nombrebeneficiario", type="string", length=150, nullable=true)
     */
    private $nombrebeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="paternobeneficiario", type="string", length=80, nullable=true)
     */
    private $paternobeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="maternobeneficiario", type="string", length=80, nullable=true)
     */
    private $maternobeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="generobeneficiario", type="string", length=1, nullable=true)
     */
    private $generobeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="ordengrupo", type="string", length=1, nullable=true)
     */
    private $ordengrupo;

    /**
     * @var string
     *
     * @ORM\Column(name="grupobeneficiario", type="string", length=50, nullable=true)
     */
    private $grupobeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="mesinformado", type="string", length=6, nullable=true)
     */
    private $mesinformado;

    /**
     * @var string
     *
     * @ORM\Column(name="observaciones", type="string", length=255, nullable=true)
     */
    private $observaciones;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=false)
     */
    private $activo = '1';




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
     * Set dvbeneficiario
     *
     * @param string $dvbeneficiario
     *
     * @return GenBeneficiario
     */
    public function setDvbeneficiario($dvbeneficiario)
    {
        $this->dvbeneficiario = $dvbeneficiario;

        return $this;
    }

    /**
     * Get dvbeneficiario
     *
     * @return string
     */
    public function getDvbeneficiario()
    {
        return $this->dvbeneficiario;
    }

    /**
     * Set siglabeneficiario
     *
     * @param string $siglabeneficiario
     *
     * @return GenBeneficiario
     */
    public function setSiglabeneficiario($siglabeneficiario)
    {
        $this->siglabeneficiario = $siglabeneficiario;

        return $this;
    }

    /**
     * Get siglabeneficiario
     *
     * @return string
     */
    public function getSiglabeneficiario()
    {
        return $this->siglabeneficiario;
    }

    /**
     * Set nombrebeneficiario
     *
     * @param string $nombrebeneficiario
     *
     * @return GenBeneficiario
     */
    public function setNombrebeneficiario($nombrebeneficiario)
    {
        $this->nombrebeneficiario = $nombrebeneficiario;

        return $this;
    }

    /**
     * Get nombrebeneficiario
     *
     * @return string
     */
    public function getNombrebeneficiario()
    {
        return $this->nombrebeneficiario;
    }

    /**
     * Set paternobeneficiario
     *
     * @param string $paternobeneficiario
     *
     * @return GenBeneficiario
     */
    public function setPaternobeneficiario($paternobeneficiario)
    {
        $this->paternobeneficiario = $paternobeneficiario;

        return $this;
    }

    /**
     * Get paternobeneficiario
     *
     * @return string
     */
    public function getPaternobeneficiario()
    {
        return $this->paternobeneficiario;
    }

    /**
     * Set maternobeneficiario
     *
     * @param string $maternobeneficiario
     *
     * @return GenBeneficiario
     */
    public function setMaternobeneficiario($maternobeneficiario)
    {
        $this->maternobeneficiario = $maternobeneficiario;

        return $this;
    }

    /**
     * Get maternobeneficiario
     *
     * @return string
     */
    public function getMaternobeneficiario()
    {
        return $this->maternobeneficiario;
    }

    /**
     * Set generobeneficiario
     *
     * @param string $generobeneficiario
     *
     * @return GenBeneficiario
     */
    public function setGenerobeneficiario($generobeneficiario)
    {
        $this->generobeneficiario = $generobeneficiario;

        return $this;
    }

    /**
     * Get generobeneficiario
     *
     * @return string
     */
    public function getGenerobeneficiario()
    {
        return $this->generobeneficiario;
    }

    /**
     * Set ordengrupo
     *
     * @param string $ordengrupo
     *
     * @return GenBeneficiario
     */
    public function setOrdengrupo($ordengrupo)
    {
        $this->ordengrupo = $ordengrupo;

        return $this;
    }

    /**
     * Get ordengrupo
     *
     * @return string
     */
    public function getOrdengrupo()
    {
        return $this->ordengrupo;
    }

    /**
     * Set grupobeneficiario
     *
     * @param string $grupobeneficiario
     *
     * @return GenBeneficiario
     */
    public function setGrupobeneficiario($grupobeneficiario)
    {
        $this->grupobeneficiario = $grupobeneficiario;

        return $this;
    }

    /**
     * Get grupobeneficiario
     *
     * @return string
     */
    public function getGrupobeneficiario()
    {
        return $this->grupobeneficiario;
    }

    /**
     * Set mesinformado
     *
     * @param string $mesinformado
     *
     * @return GenBeneficiario
     */
    public function setMesinformado($mesinformado)
    {
        $this->mesinformado = $mesinformado;

        return $this;
    }

    /**
     * Get mesinformado
     *
     * @return string
     */
    public function getMesinformado()
    {
        return $this->mesinformado;
    }

    /**
     * Set observaciones
     *
     * @param string $observaciones
     *
     * @return GenBeneficiario
     */
    public function setObservaciones($observaciones)
    {
        $this->observaciones = $observaciones;

        return $this;
    }

    /**
     * Get observaciones
     *
     * @return string
     */
    public function getObservaciones()
    {
        return $this->observaciones;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     * @return GenCompania
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
