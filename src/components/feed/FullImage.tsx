'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const FullImage = ({ src, children }: { src: string, children: any }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <button onDoubleClick={() => setOpen(!open)}>{children}</button>
            {open && <div onClick={() => setOpen(!open)} className="fixed w-screen h-screen top-0 left-0 bg-black flex items-center justify-center z-50">
                {/* <div className="relative animate-modal bg-transparent rounded-lg shadow-md flex flex-col gap-2 w-full h-full sm:w-2/4  md:h-3/4 md:p-6"> */}
                {src ? (
                    src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg') ? (
                        <video autoPlay onClick={e => e.stopPropagation} controls src={src} className="relative animate-modal bg-transparent shadow-md "></video>
                    ) : (
                        <Image src={src} alt='post' width={600} height={600} className='relative animate-modal bg-transparent shadow-md ' />

                    )
                ) : (""
                )}
            </div>
            }
        </>
    )
}

export default FullImage
