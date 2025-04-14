import React from 'react'
import FriendRequest from './FriendRequest'
import BirthDays from './BirthDays'
import Ad from '../Ad'
import UserMediaCard from '../userMedia/UserMediaCard'
import { User } from '@prisma/client'

const RightMenu = ({
  user,
  isBlocked,
  currentUser
}: {
  user?: any
  currentUser?: string
  isBlocked?: boolean
}) => {

  return (
    <div className='flex flex-col gap-6 maxs-xl:hidden'>
      {currentUser && user && !isBlocked ? (
        <>
          <BirthDays />
          <UserMediaCard userId={user.id} />
        </>
      ) : (
        currentUser && <>
          <BirthDays />
          <FriendRequest userId={currentUser}/>
        </>
      )}
      <Ad size='sm' />
    </div>
  )
}

export default RightMenu
