<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GenRubro
 *
 * @ORM\Table(name="gen_rubro")
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\GenRubroRepository")
 */
class GenRubro
{
    /**
     * @var string
     *
     * @ORM\Column(name="idrubro", type="string", length=3, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="gen_rubro_idrubro_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="idsector", type="string", length=2, nullable=false)
     */
    private $idsector;

    /**
     * @var string
     *
     * @ORM\Column(name="rubro", type="string", length=20, nullable=true)
     */
    private $rubro;

    /**
     * @var string
     *
     * @ORM\Column(name="ordenrubro", type="string", length=1, nullable=true)
     */
    private $ordenrubro;

    /**
     * @var string
     *
     * @ORM\Column(name="idcategoria", type="string", length=12, nullable=true)
     */
    private $idcategoria;

    /**
     * @var integer
     *
     * @ORM\Column(name="activo", type="integer", nullable=true)
     */
    private $activo;



    /**
     * Get idrubro
     *
     * @return string 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idsector
     *
     * @param string $idsector
     * @return GenRubro
     */
    public function setIdsector($idsector)
    {
        $this->idsector = $idsector;

        return $this;
    }

    /**
     * Get idsector
     *
     * @return string 
     */
    public function getIdsector()
    {
        return $this->idsector;
    }

    /**
     * Set rubro
     *
     * @param string $rubro
     * @return GenRubro
     */
    public function setRubro($rubro)
    {
        $this->rubro = $rubro;

        return $this;
    }

    /**
     * Get rubro
     *
     * @return string 
     */
    public function getRubro()
    {
        return $this->rubro;
    }

    /**
     * Set ordenrubro
     *
     * @param string $ordenrubro
     * @return GenRubro
     */
    public function setOrdenrubro($ordenrubro)
    {
        $this->ordenrubro = $ordenrubro;

        return $this;
    }

    /**
     * Get ordenrubro
     *
     * @return string 
     */
    public function getOrdenrubro()
    {
        return $this->ordenrubro;
    }

    /**
     * Set idcategoria
     *
     * @param string $idcategoria
     * @return GenRubro
     */
    public function setIdcategoria($idcategoria)
    {
        $this->idcategoria = $idcategoria;

        return $this;
    }

    /**
     * Get idcategoria
     *
     * @return string 
     */
    public function getIdcategoria()
    {
        return $this->idcategoria;
    }

    /**
     * Set activo
     *
     * @param integer $activo
     * @return GenRubro
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
