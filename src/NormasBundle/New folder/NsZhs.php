<?php

namespace NormasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NsZhs
 *
 * @ORM\Table(name="ns_zhs", uniqueConstraints={@ORM\UniqueConstraint(name="idx_normas_unique_ns_zhs", columns={"zhs"})})
 * @ORM\Entity(repositoryClass="NormasBundle\Repositories\NsZhsRepository")
 */
class NsZhs
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="ns_zhs_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="zhs", type="string", length=20, nullable=false)
     */
    private $zhs;



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
     * Set zhs
     *
     * @param string $zhs
     * @return NsZhs
     */
    public function setZhs($zhs)
    {
        $this->zhs = $zhs;

        return $this;
    }

    /**
     * Get zhs
     *
     * @return string 
     */
    public function getZhs()
    {
        return $this->zhs;
    }
}
