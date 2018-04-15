<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenPrima
 *
 * @ORM\Table(name="gen_prima", indexes={@ORM\Index(name="IDX_F555E7D5B4C0FC53", columns={"id_gen_rubro"}), @ORM\Index(name="IDX_F555E7D566E326F7", columns={"id_gen_compania"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenPrimaRepository"))
 */
class GenPrima
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_prima_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo_prima", type="string", length=3, nullable=false)
     */
    private $tipoPrima;

    /**
     * @var integer
     *
     * @ORM\Column(name="rut_beneficiario", type="integer", nullable=false)
     */
    private $rutBeneficiario;

    /**
     * @var string
     *
     * @ORM\Column(name="moneda", type="string", length=2, nullable=false)
     */
    private $moneda;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string", length=120, nullable=true)
     */
    private $descripcion;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo_valor", type="string", length=1, nullable=true)
     */
    private $tipoValor;

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
     * @var string
     *
     * @ORM\Column(name="resolucion", type="string", length=3, nullable=false)
     */
    private $resolucion;

    /**
     * @var \string
     *
     * @ORM\Column(name="fecha_resolucion", type="string", nullable=false)
     */
    private $fechaResolucion;

    /**
     * @var \GenRubro
     *
     * @ORM\ManyToOne(targetEntity="GenRubro")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_rubro", referencedColumnName="id")
     * })
     */
    private $idGenRubro;

    /**
     * @var \GenCompania
     *
     * @ORM\ManyToOne(targetEntity="GenCompania")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_compania", referencedColumnName="id")
     * })
     */
    private $idGenCompania;

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
     * Set tipoPrima
     *
     * @param string $tipoPrima
     *
     * @return GenPrima
     */
    public function setTipoPrima($tipoPrima)
    {
        $this->tipoPrima = $tipoPrima;

        return $this;
    }

    /**
     * Get tipoPrima
     *
     * @return string
     */
    public function getTipoPrima()
    {
        return $this->tipoPrima;
    }

    /**
     * Set rutBeneficiario
     *
     * @param integer $rutBeneficiario
     *
     * @return GenPrima
     */
    public function setRutBeneficiario($rutBeneficiario)
    {
        $this->rutBeneficiario = $rutBeneficiario;

        return $this;
    }

    /**
     * Get rutBeneficiario
     *
     * @return integer
     */
    public function getRutBeneficiario()
    {
        return $this->rutBeneficiario;
    }

    /**
     * Set moneda
     *
     * @param string $moneda
     *
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
     * Set descripcion
     *
     * @param string $descripcion
     *
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
     * Set tipoValor
     *
     * @param string $tipoValor
     *
     * @return GenPrima
     */
    public function setTipoValor($tipoValor)
    {
        $this->tipoValor = $tipoValor;

        return $this;
    }

    /**
     * Get tipoValor
     *
     * @return string
     */
    public function getTipoValor()
    {
        return $this->tipoValor;
    }

    /**
     * Set valor1
     *
     * @param float $valor1
     *
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
     *
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
     * @param string $resolucion
     *
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
     * @return GenPrima
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
     * Set idGenRubro
     *
     * @param \NormasBundle\Entity\GenRubro $idGenRubro
     *
     * @return GenPrima
     */
    public function setIdGenRubro(\NormasBundle\Entity\GenRubro $idGenRubro = null)
    {
        $this->idGenRubro = $idGenRubro;

        return $this;
    }

    /**
     * Get idGenRubro
     *
     * @return \NormasBundle\Entity\GenRubro
     */
    public function getIdGenRubro()
    {
        return $this->idGenRubro;
    }

    /**
     * Set idGenCompania
     *
     * @param \NormasBundle\Entity\GenCompania $idGenCompania
     *
     * @return GenPrima
     */
    public function setIdGenCompania(\NormasBundle\Entity\GenCompania $idGenCompania = null)
    {
        $this->idGenCompania = $idGenCompania;

        return $this;
    }

    /**
     * Get idGenCompania
     *
     * @return \NormasBundle\Entity\GenCompania
     */
    public function getIdGenCompania()
    {
        return $this->idGenCompania;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     * @return GenPrima
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
