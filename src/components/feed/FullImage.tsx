'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const FullImage = ({ src, isVideo, children }: { src: string, isVideo: boolean, children: React.ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <button onDoubleClick={() => setOpen(!open)}>{children}</button>
            {!isVideo && open &&
                <div onClick={() => setOpen(!open)} className=" fixed w-screen h-screen top-0 left-0 bg-[#000000ce] flex items-center justify-center z-50">
                    <Image src={src || '/noImage.jpg'} alt='post' width={600} height={600} className='relative animate-modal bg-transparent shadow-md ' />
                </div>
            }
        </>
    )
}

export default FullImage
