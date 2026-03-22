'use client'
import InitialForm from '@/components/dashboard/InitialForm'
import React, { useEffect, useState } from 'react'

function page() {
    const [isWebData, setWebData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fatchWebData = async () => {
            const res = await fetch("/api/auth/data/fach");
                const data = await res.json();
            setWebData(data.exists);
                setIsLoading(false);
        }
        fatchWebData();
    }, []);

    if (isLoading) {
        return (
            <div className='flex-1 flex w-full items-center justify-center p-4' />
        )
    }
    return (
        <div className='flex-1 flex w-full '>
            {!isWebData && !isLoading &&
                <div className='w-full flex items-center justify-center p-4 min-h-[calc(100vh-80px)]'>
                    <InitialForm />
                </div>
            }
            {isWebData &&
                <div className='w-full flex items-center justify-center p-4 min-h-[calc(100vh-80px)]'>
                    
            </div>
            }
        </div>
    )
}

export default page