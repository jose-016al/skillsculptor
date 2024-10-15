import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';

export const Home = ({ profile }) => {

  return (
      <div>
        <h2>{profile.name}</h2>
        <p>Email: {profile.email}</p>
      </div>
  )
}
