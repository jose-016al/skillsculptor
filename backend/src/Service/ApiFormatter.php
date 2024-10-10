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
        
        return $userJSON;
    }

}