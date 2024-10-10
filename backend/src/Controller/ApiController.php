<?php

namespace App\Controller;

use App\Service\ApiFormatter;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;

// use Symfony\Component\HttpFoundation\Response;

#[Route('/api')] // gestionaremos el trafico a esta ruta
    class ApiController extends AbstractController
    {
        #[Route('/users', name: 'app_api_users', methods:["GET"])]
        public function users(): JsonResponse
        {
            return new JsonResponse(['success' => true], 200);
        }

                // Crea un nuevo usuario mediante una solicitud POST a /api/register
        #[Route('/register', name: 'app_api_register', methods: ["POST"])]
        public function createUser(Request $request, UserPasswordHasherInterface $userPasswordHasher, UserRepository $userRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

            if ($userRepository->emailExists($data['email'])) {
                return new JsonResponse(false, 400);
            }
                // Crear un nuevo usuario con los datos recibidos
            $user = new User();
            $user->setEmail($data['email']);
            $user->setName($data['name']);
            $user->setLastName($data['last_name']);
            $user->setRoles(['ROLE_USER']);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $data['password']
                )
            );
                // Guardar el nuevo usuario en la base de datos
            $entityManager->persist($user);
            $entityManager->flush();

                // Devolver una respuesta al cliente React
            $userJSON = $apiFormatter->users($user);
            return new JsonResponse($userJSON, 201);
        }

            // Realiza el proceso de inicio de sesion mediante una solicitud POST a /api//login
        #[Route('/login', name: 'app_api_login', methods: ['POST'])]
        public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordEncoder, Apiformatter $apiFormatter): JsonResponse
        {
            $data = json_decode($request->getContent(), true);
            $user = $userRepository->findOneBy(['email' => $data['email']]);

                // Si el usuario no existe, devolver un error de autenticación
            if (!$user) {
                return new JsonResponse(false, 401);
            }

                // Verificar que la contraseña es correcta
            $isPasswordValid = $passwordEncoder->isPasswordValid($user, $data['password']);
            if (!$isPasswordValid) {
                return new JsonResponse(false, 401);
            }

                // Devolver los datos del usuario en formato JSON
            $userJSON = $apiFormatter->users($user);
            return new JsonResponse($userJSON, 200);
        }
    }
