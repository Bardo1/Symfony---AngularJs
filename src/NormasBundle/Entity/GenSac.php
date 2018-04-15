<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenSac
 *
 * @ORM\Table(name="gen_sac", uniqueConstraints={@ORM\UniqueConstraint(name="gen_sac_un", columns={"codigo", "nombre", "iddac"})}, indexes={@ORM\Index(name="IDX_C0C25929BC8C177E", columns={"id_gen_comuna"})})
 * @ORM\Entity
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
     * @ORM\Column(name="codigo", type="integer", nullable=false)
     */
    private $codigo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=150, nullable=true)
     */
    private $nombre;

    /**
     * @var integer
     *
     * @ORM\Column(name="iddac", type="integer", nullable=true)
     */
    private $iddac;

    /**
     * @var \GenComuna
     *
     * @ORM\ManyToOne(targetEntity="GenComuna")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_comuna", referencedColumnName="id")
     * })
     */
    private $idGenComuna;

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
     * Set codigo
     *
     * @param integer $codigo
     *
     * @return GenSac
     */
    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;

        return $this;
    }

    /**
     * Get codigo
     *
     * @return integer
     */
    public function getCodigo()
    {
        return $this->codigo;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     *
     * @return GenSac
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set iddac
     *
     * @param integer $iddac
     *
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

    /**
     * Set idGenComuna
     *
     * @param \NormasBundle\Entity\GenComuna $idGenComuna
     *
     * @return GenSac
     */
    public function setIdGenComuna(\NormasBundle\Entity\GenComuna $idGenComuna = null)
    {
        $this->idGenComuna = $idGenComuna;

        return $this;
    }

    /**
     * Get idGenComuna
     *
     * @return \NormasBundle\Entity\GenComuna
     */
    public function getIdGenComuna()
    {
        return $this->idGenComuna;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     *
     * @return GenSector
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
