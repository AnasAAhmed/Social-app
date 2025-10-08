'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoaderGif } from './Loader';
import Link, { LinkProps } from 'next/link';

type SmartLinkProps = LinkProps & {
    children: ReactNode;
    title?: string;
    className?: string;
    target?: string;
};

export default function ProgressBar({ target, title = '', children, ...props }: SmartLinkProps) {
    const searchParams = useSearchParams();
    const [isLoading, setIsloading] = useState(false)
    const [isPrefetch, setIsPrefetch] = useState(() => {
        if (props.prefetch === undefined) return false;
        return Boolean(props.prefetch);
    });
    useEffect(() => {
        if (isLoading) return setIsloading(false);
    }, [searchParams]);
    const pathname = usePathname()


    // const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     props.onClick?.(e);
    const handleClick = () => {

        const href = (props.href as string).split('?')[0].split('#')[0];
        if (href !== pathname) {
            setIsloading(true);
        }
    };
    return (
        // <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full bg-transparent">
        //   <div
        //     className="h-full bg-primary transition-all duration-200 ease-linear"
        //     style={{
        //       width: `${progress}%`,
        //       opacity: loading ? 1 : 0,
        //     }}
        //   >
        //     <div className="absolute top-0 left-[-50%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" />


        //   </div>
        // </div>
        <>
            <div
                style={{
                    opacity: isLoading ? 1 : 0,
                    display: isLoading ? 'flex' : 'none',
                    backgroundColor: "rgba(0, 0, 0, 0.116)"
                }}
                className="fixed inset-0 z-[9999] flex items-center bg-black/70 transition-opacity justify-center "
            >
                {/* <Loader /> */}
                <LoaderGif />
            </div>
            <Link
                {...props}
                onClick={() => {
                    handleClick();
                }}
                prefetch={isPrefetch}
                onMouseEnter={() => setIsPrefetch(true)}
                title={title}
                target={target}
            >
                {children}
            </Link>
        </>

    );
}
