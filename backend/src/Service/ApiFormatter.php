<?php
namespace App\Service;

class ApiFormatter
{
    public function users($user): array
    {
        $userJSON=[];

        $userJSON = array (
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'name' => $user->getName(),
            'last_name' => $user->getLastName(),
            // 'password' => $user->getPassword(),
            'roles' => $user->getRoles(),
            'image' => $user->getImage(),
        );

        $portfolio = $user->getPortfolio();

        // Agregar los datos del portfolio directamente
        $userJSON['portfolio'] = [
            'id' => $portfolio->getId(),
            'description' => $portfolio->getDescription(),
            'position' => $portfolio->getPosition(),
        ];
        
            // Obtener la educación asociada al portafolio
        $educations = $portfolio->getEducation(); // Suponiendo que has definido esta relación

        // Inicializar el array de educación
        $userJSON['portfolio']['education'] = [];

        // Agregar cada educación al array
        foreach ($educations as $education) {
            $userJSON['portfolio']['education'][] = [
                'id' => $education->getId(),
                'title' => $education->getTitle(),
                'date' => $education->getDate(),
            ];
        }

        // Obtener la educación asociada al portafolio
        $experiences = $portfolio->getExperience(); // Suponiendo que has definido esta relación

        // Inicializar el array de educación
        $userJSON['portfolio']['experience'] = [];

        // Agregar cada educación al array
        foreach ($experiences as $experience) {
            $userJSON['portfolio']['experience'][] = [
                'id' => $experience->getId(),
                'title' => $experience->getTitle(),
                'date' => $experience->getDate(),
                'company' => $experience->getCompany(),
                'page' => $experience->getPage(),
            ];
        }

        return $userJSON;
    }

    public function portfolios($portfolio): array
    {
        $portfolioJSON=[];

        $portfolioJSON = array (
            'id' => $portfolio->getId(),
            'description' => $portfolio->getDescription(),
            'position' => $portfolio->getPosition(),
        );

        return $portfolioJSON;
    }

    public function educations($education): array
    {
        $educationJSON=[];

        $educationJSON = array (
            'id' => $education->getId(),
            'title' => $education->getTitle(),
            'date' => $education->getDate(),
        );

        return $educationJSON;
    }

    public function experiences($experience): array
    {
        $experienceJSON=[];

        $experienceJSON = array (
            'id' => $experience->getId(),
            'title' => $experience->getTitle(),
            'date' => $experience->getDate(),
        );

        return $experienceJSON;
    }

}