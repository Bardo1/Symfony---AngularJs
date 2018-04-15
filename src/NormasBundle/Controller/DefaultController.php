<?php

namespace NormasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use NormasBundle\Entity\FosUser;
use NormasBundle\Form\User;
use Doctrine\ORM\EntityManagerInterface;
/*use Nelmio\ApiDocBundle\Annotation\ApiDoc;*/
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\RedirectResponse;
use FOS\UserBundle\Controller\RegistrationController as BaseController;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Form\Factory\FactoryInterface;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


class DefaultController extends BaseController
{   
    public function indexAction()
    {
			return $this->render('NormasBundle:Default:index.html.twig');
    }

    public function  buscanombreAction()
    {       
    	    $username = $this->container->get('security.context')->getToken()->getUser();
    	    //echo'<pre>';dump($this->get('session'));exit;
    	    //echo'<pre>';dump($this->container->get('session'));exit;
            return new JsonResponse("Walter Muñoz");  

		//	return new JsonResponse($username->getUsername());             
    	    
    }

    //Este es tu controlador (controller)
    public function listAction(Request $request)
    {
        //en las siguientes líneas haces tu consulta de lo que sea
        $em    = $this->get('doctrine.orm.entity_manager');
        $dql   = "SELECT a FROM NormasBundle:GenSector a";
        $query = $em->createQuery($dql);
     
        //creas $paginator que llama el método get de KnpPaginatorBundle
        $paginator  = $this->get('knp_paginator');
        //le pasas a $paginator los parámetros y los asignas a $pagination
        $pagination = $paginator->paginate(
            $query, /* fuente de los datos*/
            $request->query->get('page', 1)/*número de página*/,
            20/*límite de resultados por página*/
        );
     
        // aquí indicas a qué vista lo debe mandar, en este caso es list.html.twig
          //echo'<pre>';dump($pagination);exit;
          return new JsonResponse($pagination);  

       // return $this->render('NormasBundle:Default:list.html.twig', array('pagination' => $pagination));
    }

    public function loginAction()
    {
    return $this->render('NormasBundle:Default:login.html.twig');
    }

    public function cerrarAction()
    {
    	$this->container->get('session')->remove();
      //  echo'<pre>';dump($this->container->get('session'));exit;
        throw new \RuntimeException('You must activate the logout in your security firewall configuration.');
        return $this->render('NormasBundle:Default:login.html.twig');
    }


    public function resetAction()
    {
        return $this->render('NormasBundle:Default:reset.html.twig');
    }

     public function mensajeResetAction()
    {
        return $this->render('NormasBundle:Default:mensajeReset.html.twig');
    }


    public function registroAction(Request $request)
    {
        /** @var $formFactory FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm();
        $form->setData($user);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $event = new FormEvent($form, $request);
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);

                $userManager->updateUser($user);

                if (null === $response = $event->getResponse()) {
                    $url = $this->generateUrl('rutaConfirma');
                    $response = new RedirectResponse($url);
                }

                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, new FilterUserResponseEvent($user, $request, $response));

                return $response;
            }

            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_FAILURE, $event);

            if (null !== $response = $event->getResponse()) {
                return $response;
            }
        }

        return $this->render('NormasBundle:Default:registro.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    /**
     * Receive the confirmation token from user email provider, login the user.
     *
     * @param Request $request
     * @param string  $token
     *
     * @return Response
     */
    public function confirmAction(Request $request, $token)
    {
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->findUserByConfirmationToken($token);

        if (null === $user) {
            throw new NotFoundHttpException(sprintf('The user with confirmation token "%s" does not exist', $token));
        }

        /** @var $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user->setConfirmationToken(null);
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_CONFIRM, $event);

        $userManager->updateUser($user);

        if (null === $response = $event->getResponse()) {
            $url = $this->generateUrl('rutaConfirma');
            $response = new RedirectResponse($url);
        }

        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_CONFIRMED, new FilterUserResponseEvent($user, $request, $response));

        return $response;
    }

    /**
     * Tell the user his account is now confirmed.
     */
    public function confirmaAction()
    {
        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }
        
        return $this->render('NormasBundle:Default:confirmado.html.twig', array(
            'user' => $user,
            'targetUrl' => $this->getTargetUrlFromSession(),
        ));
    }

    /**
     * @return mixed
     */
    private function getTargetUrlFromSession()
    {
        $key = sprintf('_security.%s.target_path', $this->get('security.token_storage')->getToken()->getProviderKey());

        if ($this->get('session')->has($key)) {
            return $this->get('session')->get($key);
        }
    }

}
