'use client'
import React, { useState } from 'react'

const Truncate = ({ desc, numOfChar, textSize=14 }: { desc: string, numOfChar: number, textSize?: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const truncateText = (text: string, length: number) => {
        if(!text) return null;
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };
    return (
        <>
            <p style={{fontSize:`${textSize}`}} className='dark:text-gray-200'>
                {isExpanded ? desc : truncateText(desc, numOfChar)}
            </p>
            {desc&&desc.length > numOfChar && (
                <button onClick={toggleExpand} className="text-blue-500 self-start text-xs">
                    {isExpanded ? 'See less' : 'See more'}
                </button>
            )}
        </>
    )
}

export default Truncate
