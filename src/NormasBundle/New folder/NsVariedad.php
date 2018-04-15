<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsVariedad
 *
 * @ORM\Table(name="ns_variedad", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_variedad", columns={"idvariedad"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\NsVariedadRepository")
 */
class NsVariedad
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="ns_variedad_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="idvariedad", type="integer", nullable=false)
     */
    private $idvariedad;



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
     * Set idvariedad
     *
     * @param integer $idvariedad
     * @return NsVariedad
     */
    public function setIdvariedad($idvariedad)
    {
        $this->idvariedad = $idvariedad;

        return $this;
    }

    /**
     * Get idvariedad
     *
     * @return integer 
     */
    public function getIdvariedad()
    {
        return $this->idvariedad;
    }
}
