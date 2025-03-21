
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { Link } from '@mui/material'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export default async function TopMenu() {
    const session = await getServerSession(authOptions)
    return (
        <div className="h-[50px] bg-white fixed top-0 right-0 z-30 border-t border-b 
        border-light-gray flex items-center justify-end w-full ">
            <Link href="/register"><div className='text-cyan-600 text-sm px-3'>Register</div></Link>
            <div className="flex items-center">

                {
                    session ? <Link href="/api/auth/signout?callbackUrl=http://localhost:3000/"><div className='text-cyan-600 text-sm px-10'>Sign-Out</div></Link>
                        : <Link href="/api/auth/signin"><div className='text-cyan-600 text-sm px-10'>Sign-In</div></Link>
                }
            </div>
            <div className="flex items-center ml-auto">
                <TopMenuItem title='Reservation' pageRef='/reservation' />
                <TopMenuItem title='My Reservation' pageRef='/myreservation' />
                <Image src={'/img/coworkinglogo.webp'} className="h-full w-auto" alt='logo' width={40} height={40} />
            </div>
        </div>
    )
}
