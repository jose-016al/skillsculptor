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
        );

        // Verificar si el usuario tiene un portfolio asociado
        $portfolio = $user->getPortfolio();
        if ($portfolio !== null) {
            $userJSON['portfolio'] = [
                'id' => $portfolio->getId(),
                //'title' => $portfolio->getTitle(), // Ejemplo de un campo en Portfolio
                //'description' => $portfolio->getDescription(), // Ejemplo de otro campo
                // Añadir más campos según tu entidad Portfolio
            ];
        } else {
            $userJSON['portfolio'] = null; // Si no tiene portfolio, devuelves null
        }
        
        return $userJSON;
    }

}