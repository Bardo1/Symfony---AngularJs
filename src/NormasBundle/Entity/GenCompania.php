<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenCompania
 *
 * @ORM\Table(name="gen_compania", uniqueConstraints={@ORM\UniqueConstraint(name="gen_compania_unique", columns={"razon_social"})})
 * @ORM\Entity
 */
class GenCompania
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="dv", type="string", length=1, nullable=false)
     */
    private $dv;

    /**
     * @var string
     *
     * @ORM\Column(name="sigla", type="string", length=20, nullable=false)
     */
    private $sigla;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=120, nullable=false)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="razon_social", type="string", length=180, nullable=true)
     */
    private $razonSocial;

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
     * Set id
     *
     * @param integer $id
     * @return GenCompania
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Set dv
     *
     * @param string $dv
     * @return GenCompania
     */
    public function setDv($dv)
    {
        $this->dv = $dv;
        return $this;
    }

    /**
     * Get dv
     *
     * @return string
     */
    public function getDv()
    {
        return $this->dv;
    }

    /**
     * Set sigla
     *
     * @param string $sigla
     * @return GenCompania
     */
    public function setSigla($sigla)
    {
        $this->sigla = $sigla;
        return $this;
    }

    /**
     * Get sigla
     *
     * @return string
     */
    public function getSigla()
    {
        return $this->sigla;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return GenCompania
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
     * Set razonSocial
     *
     * @param string $razonSocial
     * @return GenCompania
     */
    public function setRazonSocial($razonSocial)
    {
        $this->razonSocial = $razonSocial;
        return $this;
    }

    /**
     * Get razonSocial
     *
     * @return string
     */
    public function getRazonSocial()
    {
        return $this->razonSocial;
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
