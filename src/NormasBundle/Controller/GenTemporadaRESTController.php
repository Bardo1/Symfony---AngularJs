<?php

namespace NormasBundle\Controller;

use NormasBundle\Entity\GenTemporada;
use NormasBundle\Form\GenTemporadaType;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Voryx\RESTGeneratorBundle\Controller\VoryxController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

/**
 * GenTemporada controller.
 * @RouteResource("GenTemporada")
 */
class GenTemporadaRESTController extends VoryxController
{
    /**
     * Get a GenTemporada entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(GenTemporada $entity)
    {
        return $entity;
    }
    /**
     * Get all GenTemporada entities.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     *
     * @QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing notes.")
     * @QueryParam(name="limit", requirements="\d+", default="20", description="How many notes to return.")
     * @QueryParam(name="order_by", nullable=true, array=true, description="Order by fields. Must be an array ie. &order_by[name]=ASC&order_by[description]=DESC")
     * @QueryParam(name="filters", nullable=true, array=true, description="Filter by fields. Must be an array ie. &filters[id]=3")
     */
    public function cgetAction(ParamFetcherInterface $paramFetcher)
    {
        try {
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $order_by = $paramFetcher->get('order_by');
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();

            $em = $this->getDoctrine()->getManager();
            $entities = $em->getRepository('NormasBundle:GenTemporada')->findBy($filters, $order_by, $limit, $offset);
            if ($entities) {
                return $entities;
            }

            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Create a GenTemporada entity.
     *
     * @View(statusCode=201, serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAction(Request $request)
    {
        $entity = new GenTemporada();
        $form = $this->createForm(get_class(new GenTemporadaType()), $entity, array("method" => $request->getMethod()));
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $entity;
        }

        return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
    }
    /**
     * Update a GenTemporada entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, GenTemporada $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(get_class(new GenTemporadaType()), $entity, array("method" => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->flush();

                return $entity;
            }

            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Partial Update to a GenTemporada entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, GenTemporada $entity)
    {
        return $this->putAction($request, $entity);
    }
    /**
     * Delete a GenTemporada entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, GenTemporada $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $em->remove($entity);
            $em->flush();

            return null;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all GenSacRubroZhs entities.
     * @ApiDoc(
     *   description="",
     *   resource = true,
     *   statusCodes = {
     *     200 = "Devuelve cuando es exitoso"
     *   }
     * )
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     **/
    public function buscaTemporadaAction(Request $request)
    { 
      
            $em          = $this->getDoctrine()->getManager();
            $rRepository = $this->getDoctrine()->getRepository('NormasBundle:GenTemporada');
            $idNsZhs     = $request->request->get('idNsZhs');
            $entities    = $rRepository->buscaTemporada($idNsZhs);
            
            return new JsonResponse($entities);
       
    }

    /**
     * Get all GenTemporadaVersion entities.
     * @ApiDoc(
     *   description="",
     *   resource = true,
     *   statusCodes = {
     *     200 = "Devuelve cuando es exitoso"
     *   }
     * )
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     **/

    public function buscaTemporadaVersionAction(Request $request)
    {
          try {
            $em          = $this->getDoctrine()->getManager();
            $rRepository = $this->getDoctrine()->getRepository('NormasBundle:GenTemporada');
            $idTemporada = $request->request->get('idTemporada');
            $idNsZhs     = $request->request->get('idNsZhs');
            $entities    = $rRepository->buscaTemporadaVersion($idTemporada,$idNsZhs);
            if($entities) {
                return new JsonResponse($entities);
            }
            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
