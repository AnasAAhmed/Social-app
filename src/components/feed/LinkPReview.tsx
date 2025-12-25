'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { extractUrl } from '@/lib/utils';
import { Spinner } from '../Loader';
import Truncate from '@/lib/truncate';


const LinkPReview = ({ desc, img, postId, postBy }: { desc: string; img?: string; postBy: string; postId: number }) => {
    const [loader, setLoader] = useState<boolean>(false)

    const [preview, setPreview] = useState<null | {
        title: string;
        description: string;
        image: string;
        url: string;
    }>({
        title: '',
        description: desc || '',
        image: '',
        url: ''
    });

    useEffect(() => {
        if (!img) {
            const url = extractUrl(desc);
            if (url) {
                setLoader(true)
                fetch(`/api/link-preview?url=${url}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.error) {
                            setPreview(data);
                        }
                        setLoader(false)
                    })
                    .catch(err => { console.error("Failed to fetch preview:", err); setLoader(false) });
            }
        }
    }, [desc, img]);
    return (
        <div>
            
            {loader ? <Spinner /> : preview && (
                <a href={preview.url + `?utm_source=anas-social.vercel.app&utm_medium=referral&utm_campaign=${postBy}-post-${postId}`} title={"Preview of " + preview.url} target="_blank" rel="noopener noreferrer" className="block border rounded-md overflow-hidden dark:border-slate-700">
                    {preview.image && (
                        <div className="relative w-full">
                            <img title={"Preview of " + preview.url} src={preview.image} alt={"Preview of " + preview.url} className="object-cover" />
                        </div>
                    )}
                    <div className="p-3 dark:bg-slate-800 bg-white">
                        {!desc?.trim() && preview.title && <h3 title={preview.title} className="text-sm font-semibold dark:text-white">{preview.title}</h3>}
                        <Truncate
                            postBy={postBy}
                            postId={postId}
                            desc={preview.description}
                            numOfChar={100} />
                    </div>
                </a>
            )}

        </div>
    )
}

export default LinkPReview

