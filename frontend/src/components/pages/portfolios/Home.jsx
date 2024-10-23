import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';
import { Stack } from './Stack';
import { Global } from '../../../helpers/Global';

export const Home = () => {

  const { userid } = useParams();
  const { auth } = useAuth();

  const { profile, loading } = useProfile(userid);
  console.log(profile);

  return (
    <>
      <div className='flex flex-col md:flex-row items-center lg:h-screen px-2 mt-16 md:mt-20 lg:mt-0 md:px-10'>
        {loading ?
          <div id='container-loader' className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
            <div className="loader"></div>
          </div>
          :
          <>
            <div className='w-full md:w-3/5'>
              <h1 className='text-4xl mb-2 text-blue-700'>{profile.name} {profile.last_name}</h1>
              <h2 className='text-2xl mb-2'>{profile.portfolio.position}</h2>
              <p className='text-justify'>{profile.portfolio.description}</p>
              <Stack languages={profile.portfolio.stack} />
            </div>
            <div className='md:flex justify-center md:w-2/5'>
              <img className="w-64 h-64 lg:w-80 lg:h-80 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover" src={`${Global.url}${profile.id}/avatar`} alt="Bordered avatar" />
            </div>
          </>
        }
      </div>
    </>
  )
}
