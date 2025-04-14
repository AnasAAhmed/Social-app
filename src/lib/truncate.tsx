'use client'
import React, { useEffect, useState } from 'react'

interface TruncateProps {
  desc: string;
  isProfilePage?: boolean;
  numOfChar: number;
  textSize?: number;
  postBy?: string;
  postId?: number
}

const Truncate = ({ desc, numOfChar, isProfilePage = false, textSize = 14, postId, postBy }: TruncateProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const convertToElements = (text: string) => {
    const words = text.split(/(\s+)/); // split and preserve spaces
    return words.map((word, i) => {
      if (/https?:\/\/[^\s]+/.test(word)) {
        return (
          <a
            key={i}
            href={word + `?utm_source=anas-social.vercel.app&utm_medium=referral&utm_campaign=${postBy}-post-${postId}`} title={word}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {word}
          </a>
        );
      } else if (/^#[\w]+$/.test(word)) {
        return (
          <span
            key={i}
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => alert(`Clicked hashtag: ${word}`)} // replace with navigation if needed
          >
            {word}
          </span>
        );
      } else {
        return word;
      }
    });
  };

  const truncateText = (text: string, length: number) => {
    if (!text) return null;
    if (text.length <= length) return convertToElements(text);
    const truncated = text.substring(0, length);
    return convertToElements(truncated + '...');
  };

  return (
    <div className="flex flex-col gap-1 text-sm" style={{ fontSize: `${textSize}px` }}>
      <p className={`dark:text-gray-200 whitespace-pre-wrap break-words ${isProfilePage ? 'text-center' : ""}`}>
        {isExpanded ? convertToElements(desc) : truncateText(desc, numOfChar)}
      </p>
      {desc && desc.length > numOfChar && (
        <button onClick={toggleExpand} className="text-blue-500 self-start text-xs mt-1">
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export default Truncate;
