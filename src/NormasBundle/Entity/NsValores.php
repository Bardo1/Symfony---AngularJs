<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsValores
 *
 * @ORM\Table(name="ns_valores", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_valores", columns={"id_ns_vector", "id_gen_zhs_variedad", "valor", "agrupar"})}, indexes={@ORM\Index(name="IDX_9CE80562AF73146A", columns={"id_ns_vector"}), @ORM\Index(name="IDX_9CE80562A75AFBFD", columns={"id_gen_zhs_variedad"})})
 * @ORM\Entity
 */
class NsValores
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="ns_valores_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="valor", type="string", length=50, nullable=false)
     */
    private $valor;

    /**
     * @var integer
     *
     * @ORM\Column(name="agrupar", type="integer", nullable=false)
     */
    private $agrupar;

    /**
     * @var \NsVector
     *
     * @ORM\ManyToOne(targetEntity="NsVector")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_ns_vector", referencedColumnName="id")
     * })
     */
    private $idNsVector;

    /**
     * @var \NsZhsVariedad
     *
     * @ORM\ManyToOne(targetEntity="NsZhsVariedad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_gen_zhs_variedad", referencedColumnName="id")
     * })
     */
    private $idGenZhsVariedad;



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
     * Set valor
     *
     * @param string $valor
     *
     * @return NsValores
     */
    public function setValor($valor)
    {
        $this->valor = $valor;

        return $this;
    }

    /**
     * Get valor
     *
     * @return string
     */
    public function getValor()
    {
        return $this->valor;
    }

    /**
     * Set agrupar
     *
     * @param integer $agrupar
     *
     * @return NsValores
     */
    public function setAgrupar($agrupar)
    {
        $this->agrupar = $agrupar;

        return $this;
    }

    /**
     * Get agrupar
     *
     * @return integer
     */
    public function getAgrupar()
    {
        return $this->agrupar;
    }

    /**
     * Set idNsVector
     *
     * @param \NormasBundle\Entity\NsVector $idNsVector
     *
     * @return NsValores
     */
    public function setIdNsVector(\NormasBundle\Entity\NsVector $idNsVector = null)
    {
        $this->idNsVector = $idNsVector;

        return $this;
    }

    /**
     * Get idNsVector
     *
     * @return \NormasBundle\Entity\NsVector
     */
    public function getIdNsVector()
    {
        return $this->idNsVector;
    }

    /**
     * Set idGenZhsVariedad
     *
     * @param \NormasBundle\Entity\NsZhsVariedad $idGenZhsVariedad
     *
     * @return NsValores
     */
    public function setIdGenZhsVariedad(\NormasBundle\Entity\NsZhsVariedad $idGenZhsVariedad = null)
    {
        $this->idGenZhsVariedad = $idGenZhsVariedad;

        return $this;
    }

    /**
     * Get idGenZhsVariedad
     *
     * @return \NormasBundle\Entity\NsZhsVariedad
     */
    public function getIdGenZhsVariedad()
    {
        return $this->idGenZhsVariedad;
    }
}
