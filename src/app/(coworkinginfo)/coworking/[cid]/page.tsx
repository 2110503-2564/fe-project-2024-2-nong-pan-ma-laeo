"use client";
import Image from "next/image";
import getCoworking from "@/libs/getCoworking";
import Link from "next/link";

export default async function CoworkingDetailPage({ params }: { params: { cid: string } }) {
    const coworkingDetail = await getCoworking(params.cid);

    if (!coworkingDetail) {
        return (
            <main className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Coworking space not found.</h1>
                <p className="text-gray-600 mt-2">Please check the coworking ID or try again later.</p>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            {/* ชื่อสถานที่ */}
            <h1 className="text-3xl font-bold text-center">{coworkingDetail.name}</h1>

            {/* รูปภาพ + รายละเอียด */}
            <div className="flex flex-col md:flex-row items-center mt-6 space-y-6 md:space-y-0 md:space-x-8">
                {/* รูปภาพ */}
                <Image 
                    src={coworkingDetail.picture} 
                    alt={coworkingDetail.name} 
                    width={500} height={350} 
                    className="rounded-lg w-full max-w-lg"
                />

                {/* รายละเอียด */}
                <div className="text-gray-700 text-lg space-y-2">
                    <p><span className="font-semibold">📍 Address:</span> {coworkingDetail.address}</p>
                    <p><span className="font-semibold">📞 Telephone:</span> {coworkingDetail.telephone}</p>
                    <p><span className="font-semibold">⏰ Open-Close:</span> {coworkingDetail.open_close_time}</p>
                    <p><span className="font-semibold">⭐ Rating:</span> {coworkingDetail.averageRating}</p>
                </div>
            </div>

            {/* ปุ่มจอง */}
            <div className="flex justify-center mt-8">
                <Link href={`/reservation?coworkingId=${params.cid}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg transition">
                        Reserve Now
                    </button>
                </Link>
            </div>
        </main>
    );
}
