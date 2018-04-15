<?php

namespace NormasBundle\Controller;

use NormasBundle\Entity\GenRubro;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Genrubro controller.
 *
 * @Route("genrubro")
 */
class GenRubroController extends Controller
{
    /**
     * Lists all genRubro entities.
     *
     * @Route("/", name="genrubro_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $genRubros = $em->getRepository('NormasBundle:GenRubro')->findAll();

        return $this->render('genrubro/index.html.twig', array(
            'genRubros' => $genRubros,
        ));
    }

    /**
     * Creates a new genRubro entity.
     *
     * @Route("/new", name="genrubro_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $genRubro = new Genrubro();
        $form = $this->createForm('NormasBundle\Form\GenRubroType', $genRubro);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($genRubro);
            $em->flush();

            return $this->redirectToRoute('genrubro_show', array('idrubro' => $genRubro->getIdrubro()));
        }

        return $this->render('genrubro/new.html.twig', array(
            'genRubro' => $genRubro,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a genRubro entity.
     *
     * @Route("/{idrubro}", name="genrubro_show")
     * @Method("GET")
     */
    public function showAction(GenRubro $genRubro)
    {
        $deleteForm = $this->createDeleteForm($genRubro);

        return $this->render('genrubro/show.html.twig', array(
            'genRubro' => $genRubro,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing genRubro entity.
     *
     * @Route("/{idrubro}/edit", name="genrubro_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, GenRubro $genRubro)
    {
        $deleteForm = $this->createDeleteForm($genRubro);
        $editForm = $this->createForm('NormasBundle\Form\GenRubroType', $genRubro);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('genrubro_edit', array('idrubro' => $genRubro->getIdrubro()));
        }

        return $this->render('genrubro/edit.html.twig', array(
            'genRubro' => $genRubro,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a genRubro entity.
     *
     * @Route("/{idrubro}", name="genrubro_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, GenRubro $genRubro)
    {
        $form = $this->createDeleteForm($genRubro);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($genRubro);
            $em->flush();
        }

        return $this->redirectToRoute('genrubro_index');
    }

    /**
     * Creates a form to delete a genRubro entity.
     *
     * @param GenRubro $genRubro The genRubro entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(GenRubro $genRubro)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('genrubro_delete', array('idrubro' => $genRubro->getIdrubro())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
