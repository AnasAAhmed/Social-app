'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

type SmartLinkProps = LinkProps & {
    children: ReactNode;
    title?: string;
    disabled?: boolean;
    className?: string;
    target?: string;
};

export default function SmartLink({ disabled = false, target, title = '', children, ...props }: SmartLinkProps) {
    const pathname = usePathname()

    const [isPrefetch, setIsPrefetch] = useState(() => {
        if (props.prefetch === undefined) return false;
        return Boolean(props.prefetch);
    });

    // const handleClick = () => {
    //     const href = props.href as string;

    //     if (href.startsWith('#') || href.startsWith('?')) {
    //         return;
    //     }

    //     const [basePath] = href.split(/[?#]/);
        
    //     if (basePath !== pathname) {
    //         start();
    //     }
    // };

    return (
        <Link
            style={{ pointerEvents: disabled ? "none":undefined,cursor:disabled?'not-allowed':undefined }}
            {...props}
            // onClick={() => {
            //     handleClick();
            // }}
            prefetch={isPrefetch}
            onMouseEnter={() => setIsPrefetch(true)}
            title={title}
            target={target}
        >
            {children}
        </Link>
    );
}
