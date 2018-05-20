<?php

namespace App\Controller;

use App\Entity\Reserve;
use App\Entity\Room;
use App\Repository\ReserveRepository;
use App\Repository\RoomRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/reserves")
 */
class ReserveController extends Controller
{
    /**
     * @Route("/", name="reserve_index", methods="GET")
     */
    public function index(ReserveRepository $reserveRepository, UserRepository $userRepository): Response
    {

        $reserves = $reserveRepository->findAll();
        $reserves = array_map(function($reserve) {
            return $reserve->toArray();
        }, $reserves);

        return $this->render('reserve/calendar.html.twig', [
            "reserves" => json_encode($reserves)
        ]);
    }

    /**
     * @Route("/new", name="reserve_new", methods="GET|POST")
     */
    public function new(Request $request, ReserveRepository $reserveRepository, RoomRepository $roomRepository): Response
    {

        $manager = $this->getDoctrine()->getManager();
        $reserve = new Reserve();
        $reserves = $reserveRepository->findAll();

        $reserve->setStart(new \DateTime($request->get('start')));
        $room = $manager->find(Room::class, $request->get('room'));
        $reserve->setEnd(new \DateTime($request->get('start')));
        $reserve->setRoom($room);
        $reserve->setUser($this->getUser());
        $reserve->setTitle($request->get('title'));

        foreach($reserves as $reserveDatabase) {
            if($reserveDatabase->getStart()->format("Y-m-d h") == $reserve->getStart()->format("Y-m-d h")){
                if ($reserveDatabase->getRoom()->getName()  == $reserve->getRoom()->getName()) {
                    return new Response("This room already is reserved in this period", Response::HTTP_CONFLICT);
                }

                if ($reserveDatabase->getUser()->getUsername() == $reserve->getUser()->getUsername()) {
                    return new Response("This user already to reserved other room in same time", Response::HTTP_CONFLICT);
                }
            }
        }

        $manager->persist($reserve);
        $manager->flush();

        return new JsonResponse($reserve->toArray());
    }

    /**
     * @Route("/{id}", name="reserve_delete", methods="DELETE")
     */
    public function delete(Request $request, Reserve $reserve): Response
    {
        if($reserve->getUser() != $this->getUser()) {
            $message = "Only " . $reserve->getUser()->getUsername() . " can remove this reserve!";
            return new Response($message, Response::HTTP_FORBIDDEN);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($reserve);
        $em->flush();

        return  new JsonResponse(null,Response::HTTP_NO_CONTENT);
    }
}
