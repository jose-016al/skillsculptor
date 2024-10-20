import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';

export const Experience = () => {

  const { userid } = useParams();
  const {auth} = useAuth();

  const { profile } = useProfile(userid);
  // console.log(profile);

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
    </div>
  )
}
