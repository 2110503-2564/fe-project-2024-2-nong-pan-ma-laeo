import Image from "next/image"
import getCoworking from "@/libs/getCoworking"
import Link from "next/link"
export default async function CoworkingDetailPage({ params }: { params: { vid: string } }) {
    // Mock Data for Demonstration Only
    // const mockCoworkingRepo = new Map()
    // mockCoworkingRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" })
    // mockCoworkingRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" })
    // mockCoworkingRepo.set("003", { name: "The Grand Table", image: "/img/grandtable.jpg" })
    const coworkingDetail = await getCoworking(params.vid)
    return (
        <main className="text-center p-14">
            <h1 className="text-2xl font-medium">{coworkingDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={coworkingDetail.data.picture}
                    alt='Product Picture'
                    width={0} height={0} sizes="100vw"
                    className='rounded-lg w-[30%] bg-black' />
                <div className="text-md mx-5 text-left">Name: {coworkingDetail.data.name}
                    <div>Address: {coworkingDetail.data.address} </div>
                    <div>Telephone: {coworkingDetail.data.telephone}</div>
                    <div>Open-Close: {coworkingDetail.data.open_close_time}</div>
                    <div>Rating: {coworkingDetail.data.averageRating}</div>
                    <Link href={`/reservation?id=${params.vid}&model=${coworkingDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                    text-white shadow-sm">
                            Reservation
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
