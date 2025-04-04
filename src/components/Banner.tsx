'use client'
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/coworking-1.webp', '/img/coworking2-1.webp', '/img/coworking3-1.webp', '/img/coworking4-1.webp']
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const { data: session, status } = useSession();
    return (
        <div className={styles.banner} onClick={() => setIndex(index + 1)}>
            <Image src={covers[index % 4]}
                alt='Main'
                fill={true}
                objectFit='cover'
                priority
            />
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-medium'>where every event finds its coworking</h1>
                <h3 className='text-xl font-serif'>Be It a Grand Celebration or a Prestigious Gathering!</h3>
            </div>
            <div className='z-30 absolute top-5 right-10 font-semibold text-black text-xl'>
                Welcome {session?.user.name}
            </div>

            {/* <div className='z-30 absolute top-5 right-10 font-semibold text-black text-xl'>
                Welcome Guest
            </div> */}


            <button className='bg-gradient-to-r from-gray-900 to-yellow-500 text-white 
            font-semibold py-2 px-6 m-2 rounded-full z-30 absolute bottom-0 right-0 
            shadow-lg hover:from-gray-800 hover:to-yellow-600 hover:text-white'
                onClick={(e) => { e.preventDefault(); router.push('/coworking') }}>
                Select Coworking
            </button>
        </div>
    );
}
