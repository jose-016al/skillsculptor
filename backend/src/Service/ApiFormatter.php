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

}