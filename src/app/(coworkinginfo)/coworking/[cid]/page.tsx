"use client"
import Image from "next/image"
import getCoworking from "@/libs/getCoworking"
import Link from "next/link"
export default async function CoworkingDetailPage({ params }: { params: { cid: string } }) {
    // Mock Data for Demonstration Only
    // const mockCoworkingRepo = new Map()
    // mockCoworkingRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" })
    // mockCoworkingRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" })
    // mockCoworkingRepo.set("003", { name: "The Grand Table", image: "/img/grandtable.jpg" })
    const coworkingDetail = await getCoworking(params.cid)
    if (!coworkingDetail) {
        return (
            <main className="text-center p-14">
                <h1 className="text-2xl font-medium text-red-500">Coworking space not found.</h1>
                <p>Please check the coworking ID or try again later.</p>
            </main>
        );
    }
    return (
        <main className="text-center p-14">
            <h1 className="text-2xl font-medium">{coworkingDetail.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={coworkingDetail.picture}
                    alt='Product Picture'
                    width={0} height={0} sizes="100vw"
                    className='rounded-lg w-[30%] bg-black' />
                <div className="text-md mx-5 text-left">Name: {coworkingDetail.name}
                    <div>Address: {coworkingDetail.address} </div>
                    <div>Telephone: {coworkingDetail.telephone}</div>
                    <div>Open-Close: {coworkingDetail.open_close_time}</div>
                    <div>Rating: {coworkingDetail.averageRating}</div>
                </div>
            </div>
        </main>
    )
}
