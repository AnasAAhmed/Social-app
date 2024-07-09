import Ad from '@/components/Ad'
import MenuBar from '@/components/MenuBar'
import React from 'react'

const page = () => {
  return (
  <div className='flex gap-6 pt-6'>
    <div className="hidden  flex-col md:flex gap-6 w-[20%]"> <MenuBar /><Ad size="md" /></div>
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4 text-slate-600">Suggestions</h1>

    </div>
  </div>
  )
}

export default page
