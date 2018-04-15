<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsValores
 *
 * @ORM\Table(name="ns_valores", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_valores", columns={"vector", "idzhsvariedad", "valor", "agrupar"})}, indexes={@ORM\Index(name="IDX_9CE805625AFC8D7A", columns={"idzhsvariedad"}), @ORM\Index(name="IDX_9CE805621B6E485B", columns={"vector"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\NsValoresRepository")
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
     * @var \NsZhsVariedad
     *
     * @ORM\ManyToOne(targetEntity="NsZhsVariedad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idzhsvariedad", referencedColumnName="id")
     * })
     */
    private $idzhsvariedad;

    /**
     * @var \NsVector
     *
     * @ORM\ManyToOne(targetEntity="NsVector")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vector", referencedColumnName="id")
     * })
     */
    private $vector;



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
     * Set idzhsvariedad
     *
     * @param \NormasBundle\Entity\NsZhsVariedad $idzhsvariedad
     * @return NsValores
     */
    public function setIdzhsvariedad(\NormasBundle\Entity\NsZhsVariedad $idzhsvariedad = null)
    {
        $this->idzhsvariedad = $idzhsvariedad;

        return $this;
    }

    /**
     * Get idzhsvariedad
     *
     * @return \NormasBundle\Entity\NsZhsVariedad 
     */
    public function getIdzhsvariedad()
    {
        return $this->idzhsvariedad;
    }

    /**
     * Set vector
     *
     * @param \NormasBundle\Entity\NsVector $vector
     * @return NsValores
     */
    public function setVector(\NormasBundle\Entity\NsVector $vector = null)
    {
        $this->vector = $vector;

        return $this;
    }

    /**
     * Get vector
     *
     * @return \NormasBundle\Entity\NsVector 
     */
    public function getVector()
    {
        return $this->vector;
    }
}
