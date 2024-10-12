<?php

namespace App\Controller;

use App\Entity\Education;
use App\Entity\Portfolio;
use App\Service\ApiFormatter;
use App\Entity\User;
use App\Repository\EducationRepository;
use App\Repository\PortfolioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api')] // gestionaremos el trafico a esta ruta

// Metodos para los usuarios

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

            // Crear una nueva instancia de Education y asociarla al Portfolio
            $education = new Education();
            $education->setPortfolio($portfolio); // Asigna el Portfolio

            $portfolio->addEducation($education);

                // Guardar el nuevo usuario en la base de datos
            $entityManager->persist($portfolio);
            $entityManager->persist($education);
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

        #[Route('/{id}/edit/user', name: 'app_api_edit_user', methods: ["PUT"])]
        public function edituser(Request $request, User $user, UserRepository $userRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, Security $security, int $id): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

            // Obtener el usuario autenticado
            $currentUser = $security->getUser();
            if (!$currentUser) {
                return new JsonResponse(['error' => 'Unauthorized'], 401);
            }
            
            // Buscar el portfolio en la base de datos por su id
            $user = $userRepository->find($id);
                
                    // Verificar que el usuario autenticado es el mismo que el que se va a editar
            if ($currentUser->getId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Forbidden: You can only edit your own profile'], 403);
            }

            $user->setEmail($data['email']);
            $user->setName($data['name']);
            $user->setLastName($data['last_name']);

                // Guardar los cambios del usuario en la base de datos
            $entityManager->flush();

                // Devolver una respuesta al cliente React
            $userJSON = $apiFormatter->users($user);
            return new JsonResponse($userJSON, 200);
        }

        #[Route('/{id}/upload', name: 'app_api_image_user', methods: ["POST"])]
        public function imageUser(Request $request, Security $security, UserRepository $userRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, SluggerInterface $slugger, int $id): JsonResponse
        {
            $entityManager = $doctrine->getManager();

            // Obtener el usuario autenticado
            $currentUser = $security->getUser();
            if (!$currentUser) {
                return new JsonResponse(['error' => 'Unauthorized'], 401);
            }

                // Buscar el portfolio en la base de datos por su id
            $user = $userRepository->find($id);

                    // Verificar que el usuario autenticado es el mismo que el que se va a editar
            if ($currentUser->getId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Forbidden: You can only edit your own profile'], 403);
            }

            // Obtener el archivo de imagen desde el formulario
            $imageFile = $request->files->get('image');

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

// Metodos para el portfolio

        #[Route('/{id}/edit/portfolio', name: 'app_api_edit_portfolio', methods: ["PUT"])]
        public function editportolio(Request $request, Portfolio $portfolio, PortfolioRepository $portfolioRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, Security $security, int $id): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

                    // Obtener el usuario autenticado
            $user = $security->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Unauthorized'], 401);
            }

                // Buscar el portfolio en la base de datos por su id
            $portfolio = $portfolioRepository->find($id);

            $portfolio->setDescription($data['description']);
            $portfolio->setPosition($data['position']);

                // Guardar los cambios del usuario en la base de datos
            $entityManager->flush();

                // Devolver una respuesta al cliente React
            $portfolioJSON = $apiFormatter->portfolios($portfolio);
            return new JsonResponse($portfolioJSON, 200);
        }

// Metodos para la education

        #[Route('/{id}/education', name: 'app_api_education', methods: ["POST"])]
        public function newEducation(Request $request, Security $security, PortfolioRepository $portfolioRepository, EducationRepository $educationRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, int $id): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

            // Obtener el usuario autenticado
            $user = $security->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Unauthorized'], 401);
            }

                // Buscar el portfolio en la base de datos por su id
            $portfolio = $portfolioRepository->find($id);

                    // Crear una nueva instancia de Education
            $education = new Education();
            $education->setTitle($data['title']);
            $education->setDate($data['date']);
            $education->setPortfolio($portfolio); // Asociar la educación al portfolio

            // Persistir la nueva educación
            $entityManager->persist($education);
            $entityManager->flush();

                // Devolver una respuesta al cliente React
            $educationJSON = $apiFormatter->educations($education);
            return new JsonResponse($educationJSON, 201);
        }

        #[Route('/{id}/edit/education', name: 'app_api_edit_education', methods: ["PUT"])]
        public function editEducation(Request $request, Education $education, EducationRepository $educationRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, Security $security, int $id): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

                // Obtener el usuario autenticado
            $user = $security->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Unauthorized'], 401);
            }

                // Buscar la education en la base de datos por su id
            $education = $educationRepository->find($id);

            $education->setTitle($data['title']);
            $education->setDate($data['date']);

                // Guardar los cambios del usuario en la base de datos
            $entityManager->flush();

            $educationJSON = $apiFormatter->educations($education);
            return new JsonResponse($educationJSON, 200);
        }

        #[Route('/{id}/delete/education', name: 'app_api_delete_education', methods: ["DELETE"])]
        public function deleteEducation(Request $request, Education $education, EducationRepository $educationRepository, Apiformatter $apiFormatter, ManagerRegistry $doctrine, Security $security, int $id): JsonResponse
        {
            $entityManager = $doctrine->getManager();
            $data = json_decode($request->getContent(), true);

                // Obtener el usuario autenticado
            //$user = $security->getUser();
            //if (!$user) {
            //    return new JsonResponse(['error' => 'Unauthorized'], 401);
            //}

                // Buscar la education en la base de datos por su id
            $education = $educationRepository->find($id);

                // Eliminar la entidad Education
            $entityManager->remove($education);
            $entityManager->flush();

            // Devolver una respuesta de éxito
            return new JsonResponse(['message' => 'Se ha eliminado una formacion'], 204);
        }
    }