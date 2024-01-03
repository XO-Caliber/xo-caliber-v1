import { getAuthSession } from '@/app/api/auth/[...nextauth]/authOptions'
import { CardTitle } from '@/components/ui/Card'
import React from 'react'

const page = async() => {
    const session=await getAuthSession()
  return (
    <div className='h-screen ml-52'>
        <div className='border-2 h-[65px] border-l-0'>
            <p className='text-muted m-4 '>Dashboard</p>
        </div>
      <div className='absolute m-4 text-xl'>
         <div className='font-extrabold' >
            <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
         </div>
  
      </div>
      </div>
  )
     
}

export default page