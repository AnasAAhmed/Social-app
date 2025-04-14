import { Spinner } from '@/components/Loader'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center min-h-[90vh]'>

   <Spinner w={100} h={100}/>
    </div>
  )
}

export default loading
