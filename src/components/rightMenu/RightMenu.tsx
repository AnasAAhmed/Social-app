import React, { Suspense } from 'react'
import FriendRequest from './FriendRequest'
import BirthDays from './BirthDays'
import Ad from '../Ad'
import UserInfoCard from '../userInfo/UserInfoCard'
import UserMediaCard from '../userMedia/UserMediaCard'
import { User } from '@prisma/client'

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6 maxs-xl:hidden'>
      {user ? (<>
          <UserInfoCard userId={user.id} />
          <UserMediaCard userId={user.id} />

      </>
      ) : 
      <>
      <BirthDays />
      <FriendRequest />
      </>
      }
      <Ad size='sm' />
    </div>
  )
}

export default RightMenu
