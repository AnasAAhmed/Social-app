import React, { Suspense } from 'react'
import FriendRequest from './FriendRequest'
import BirthDays from './BirthDays'
import Ad from '../Ad'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'
import Loader, { Loader1 } from '../Loader'
import { User } from '@prisma/client'

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6 '>
      {user ? (<>
        <Suspense fallback={<Loader />}>
          <UserInfoCard user={user} />
        </Suspense>
        <Suspense fallback={<Loader1 />}>
          <UserMediaCard user={user} />
        </Suspense>

      </>
      ) : <BirthDays />}
      <FriendRequest />
      <Ad size='sm' />
    </div>
  )
}

export default RightMenu
