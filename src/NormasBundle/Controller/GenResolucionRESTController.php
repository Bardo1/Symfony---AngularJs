<?php

namespace NormasBundle\Controller;

use NormasBundle\Entity\GenResolucion;
use NormasBundle\Form\GenResolucionType;

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
 * GenResolucion controller.
 * @RouteResource("GenResolucion")
 */
class GenResolucionRESTController extends VoryxController
{
    /**
     * Get a GenResolucion entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(GenResolucion $entity)
    {
        return $entity;
    }
    /**
     * Get all GenResolucion entities.
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
            $entities = $em->getRepository('NormasBundle:GenResolucion')->findBy($filters, $order_by, $limit, $offset);
            if ($entities) {
                return $entities;
            }

            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Create a GenResolucion entity.
     *
     * @View(statusCode=201, serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(
     *   description="Retorna la lista e objetos GeNresolucion",
     *   resource = true,
     *   statusCodes = {
     *     200 = "Devuelve cuando es exitoso"
     *   }
     * )
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAction(Request $request)
    {
        $entity = new GenResolucion();
         
         //   echo'<pre>';var_dump(GenResolucion());exit;
/*
            $nowUtc = new \DateTime( 'now',  new \DateTimeZone( 'UTC' ) );
            echo '$nowUtc'.PHP_EOL;
            var_dump($nowUtc);
            $nowUtc = new \DateTime( 'now',  new \DateTimeZone( 'UTC' ) );
            echo '$nowUtc->format(\'Y-m-d h:i:s\')'.PHP_EOL;
            var_dump($nowUtc->format('Y-m-d h:i:s'));
            $nowUtc->setTimezone( new \DateTimeZone( 'Australia/Sydney' ) );
            echo '$nowUtc->setTimezone( new \DateTimeZone( \'Australia/Sydney\' ) )'.PHP_EOL;
            var_dump($nowUtc);
            echo '$nowUtc->format(\'Y-m-d h:i:s\')'.PHP_EOL;
            //Echo'<pre>';var_dump($nowUtc->format('Y-m-d h:i:s'));exit;
            */            
            $form = $this->createForm(get_class(new GenResolucionType()), $entity, array("method" => $request->getMethod()));

            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            //dump($form);exit;
            //\Doctrine\Common\Util\Debug::dump($entity); exit;

        if ($form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $entity;
        }

        return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
    }
    /**
     * Update a GenResolucion entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, GenResolucion $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(get_class(new GenResolucionType()), $entity, array("method" => $request->getMethod()));
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
     * Partial Update to a GenResolucion entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, GenResolucion $entity)
    {
        return $this->putAction($request, $entity);
    }
    /**
     * Delete a GenResolucion entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, GenResolucion $entity)
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
     * Get all GenResolucion entities.
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
     *
     * @return Response
     **/
    
    public function buscaResolucionAction()
    { 
        try {                                                           
            //echo'<pre>';dump($request->request->get('id'));exit;
            $em          = $this->getDoctrine()->getManager();
            $rRepository = $this->getDoctrine()->getRepository('NormasBundle:GenResolucion');
            //echo'<pre>';dump($request->request->get('id'));exit;
            $entities    = $rRepository->buscaResoluciones();
            if ($entities) {
                return new JsonResponse($entities);
            }
            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
