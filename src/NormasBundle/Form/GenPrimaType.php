<?php

namespace NormasBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GenPrimaType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('tipoPrima')->add('rutBeneficiario')->add('moneda')->add('descripcion')->add('tipoValor')->add('valor1')->add('valor2')->add('resolucion')->add('fechaResolucion')->add('idGenCompania')->add('idGenRubro')->add('activo');
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'NormasBundle\Entity\GenPrima'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'normasbundle_genprima';
    }


}
