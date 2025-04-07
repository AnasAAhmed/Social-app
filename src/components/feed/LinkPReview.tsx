'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { extractUrl } from '@/lib/utils';


const LinkPReview = ({ desc, img }: { desc: string; img?: string }) => {
    const [preview, setPreview] = useState<null | {
        title: string;
        description: string;
        image: string;
        url: string;
    }>(null);

    useEffect(() => {
        if (!img) {
            const url = extractUrl(desc);
            if (url) {
                console.log("Extracted URL:", url);
                fetch("/api/link-preview", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.error) {
                            setPreview(data);
                        }
                    })
                    .catch(err => console.error("Failed to fetch preview:", err));
            }
        }
    }, [desc, img]);
    return (
        <div>
            {preview && (
                <a href={preview.url} title={"Preview of "+preview.url} target="_blank" rel="noopener noreferrer" className="block border rounded-md overflow-hidden dark:border-slate-700">
                    {preview.image && (
                        <div className="relative w-full">
                            <img src={preview.image} alt={"Preview of "+preview.url} className="object-cover" />
                        </div>
                    )}
                    <div className="p-3 dark:bg-slate-800 bg-white">
                        <h3 className="text-sm font-semibold dark:text-white">{preview.title}</h3>
                        <p title={preview.description} className="text-xs text-gray-600 dark:text-gray-400">{preview.description}</p>
                    </div>
                </a>
            )}

        </div>
    )
}

export default LinkPReview

