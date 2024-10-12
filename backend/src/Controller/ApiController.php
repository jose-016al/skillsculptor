<?php

namespace App\Controller;

use App\Entity\Portfolio;
use App\Service\ApiFormatter;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\String\Slugger\SluggerInterface;

// use Symfony\Component\HttpFoundation\Response;

#[Route('/api')] // gestionaremos el trafico a esta ruta
    class ApiController extends AbstractController
    {
        #[Route('/users', name: 'app_api_users', methods:["GET"])]
        public function users(UserRepository $userRepository, Apiformatter $apiFormatter): JsonResponse
        {
            
            $users = $userRepository->findAllExceptAdmins();

            $formattedUsers = [];

            // Iterar sobre cada usuario y formatearlo con ApiFormatter
            foreach ($users as $user) {
                $formattedUsers[] = $apiFormatter->users($user); // Llamamos al formateador con cada usuario
            }

            return new JsonResponse($formattedUsers, 200);
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
            $user->setImage('default.png'); // Asegúrate de que la imagen default.png esté en la carpeta correcta
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $data['password']
                )
            );

            $portfolio = new Portfolio();
            $portfolio->setUser($user);
            $user->setPortfolio($portfolio); 

                // Guardar el nuevo usuario en la base de datos
            $entityManager->persist($portfolio);
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

            // Edita los datos de un usuario mediante una solicitud POST a /api/edituser
        #[Route('/edituser', name: 'app_api_edit_user', methods: ["POST"])]
        public function editUser(Request $request, UserRepository $userRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

                // Buscar al usuario en la base de datos por su email
            $user = $userRepository->findOneBy(['email' => $data['email']]);

            $user->setEmail($data['email']);
            $user->setName($data['name']);
            $user->setLastName($data['last_name']);

                // Guardar los cambios del usuario en la base de datos
            $entityManager->flush();

                // Devolver una respuesta al cliente React
            $userJSON = $apiFormatter->users($user);
            return new JsonResponse($userJSON, 201);
        }

        #[Route('/imageuser', name: 'app_api_image_user', methods: ["POST"])]
        public function imageUser(Request $request, UserRepository $userRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, SluggerInterface $slugger): JsonResponse
        {
            $entityManager = $doctrine->getManager();

            // Obtener el archivo de imagen desde el formulario
            $imageFile = $request->files->get('image');
            $email = $request->request->get('email');

            // Buscar al usuario en la base de datos por su email
            $user = $userRepository->findOneBy(['email' => $email]);

            // Generar un nombre seguro para el archivo
            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

            try {
                // Mover el archivo a la carpeta designada
                $imageFile->move(
                    $this->getParameter('imagen_directory'), // Asegúrate de que esté definido en config/services.yaml
                    $newFilename
                );

                // Asignar el nuevo nombre del archivo al usuario
                $user->setImage($newFilename);
                
                // Guardar los cambios del usuario en la base de datos
                $entityManager->flush();

                // Devolver una respuesta al cliente
                $userJSON = $apiFormatter->users($user);
                return new JsonResponse($userJSON, 201);
            } catch (FileException $e) {
                // Manejar cualquier error durante la subida del archivo
                return new JsonResponse(['error' => 'File upload failed'], 500);
            }
        }
    }