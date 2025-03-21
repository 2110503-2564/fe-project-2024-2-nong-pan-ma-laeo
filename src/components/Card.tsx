import styles from './card.module.css'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

export default function Card({ coworkingName, imgSrc }: { coworkingName: string, imgSrc: string }) {
    return (
        <InteractiveCard >
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                    alt='picture'
                    fill={true}
                    objectFit='cover'
                    className='object-cover rounded-t-lg' />
            </div>
            <div className="w-full-h-[30%] p-[10px]">{coworkingName}</div>
        </InteractiveCard>
    )
}