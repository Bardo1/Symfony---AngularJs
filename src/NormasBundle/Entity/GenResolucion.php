<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenResolucion
 *
 * @ORM\Table(name="gen_resolucion")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenResolucionRepository"))
 */

class GenResolucion
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_resolucion_id_seq", allocationSize=1, initialValue=1)
     */

    private $id;
    /**
     * @var integer
     *
     * @ORM\Column(name="rut_compania", type="integer", nullable=false)
     */
    
    private $rutCompania;
    /**
     * @var integer
     *
     * @ORM\Column(name="mes_informado", type="integer", nullable=false)
     */
    private $mesInformado;

    /**
     * @var string
     *
     * @ORM\Column(name="resolucion", type="string", length=3, nullable=false)
     */
    private $resolucion;

    /**
     * @var string
     *
     * @ORM\Column(name="fecha_resolucion", type="string", nullable=false)
     */
    private $fechaResolucion;

    /**
     * @var float
     *
     * @ORM\Column(name="uf_pago", type="float", precision=10, scale=0, nullable=false)
     */
    private $ufPago;

    /**
     * @var string
     *
     * @ORM\Column(name="fecha_pago", type="string", nullable=false)
     */
    private $fechaPago;

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
     * Set rutCompania
     *
     * @param integer $rutCompania
     *
     * @return GenResolucion
     */
    public function setRutCompania($rutCompania)
    {
        $this->rutCompania = $rutCompania;

        return $this;
    }

    /**
     * Get rutCompania
     *
     * @return integer
     */
    public function getRutCompania()
    {
        return $this->rutCompania;
    }

    /**
     * Set mesInformado
     *
     * @param integer $mesInformado
     *
     * @return GenResolucion
     */
    public function setMesInformado($mesInformado)
    {
        $this->mesInformado = $mesInformado;

        return $this;
    }

    /**
     * Get mesInformado
     *
     * @return integer
     */
    public function getMesInformado()
    {
        return $this->mesInformado;
    }

    /**
     * Set resolucion
     *
     * @param string $resolucion
     *
     * @return GenResolucion
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
     * Set fechaResolucion
     *
     * @param string $fechaResolucion
     *
     * @return GenResolucion
     */
    public function setFechaResolucion($fechaResolucion)
    {
        $this->fechaResolucion = $fechaResolucion;

        return $this;
    }

    /**
     * Get fechaResolucion
     *
     * @return string
     */
    public function getFechaResolucion()
    {
        return $this->fechaResolucion;
    }

    /**
     * Set ufPago
     *
     * @param float $ufPago
     *
     * @return GenResolucion
     */
    public function setUfPago($ufPago)
    {
        $this->ufPago = $ufPago;

        return $this;
    }

    /**
     * Get ufPago
     *
     * @return float
     */
    public function getUfPago()
    {
        return $this->ufPago;
    }

    /**
     * Set fechaPago
     *
     * @param string $fechaPago
     *
     * @return GenResolucion
     */
    public function setFechaPago($fechaPago)
    {
        $this->fechaPago = $fechaPago;
        return $this;
    }

    /**
     * Get fechaPago
     *
     * @return string
     */
    public function getFechaPago()
    {
        return $this->fechaPago;
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
