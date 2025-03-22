import Link from "next/link";
import Card from "./Card";
import React from "react";

export default async function CoworkingCatalog({ coworkingsJson }: { coworkingsJson: Promise<CoworkingJson> }) {
    const coworkingsJsonReady = await coworkingsJson;

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-center">Explore Our Coworking Spaces</h1>
            <p className="text-lg text-gray-600 text-center mt-2">
                Discover {coworkingsJsonReady.count} amazing coworking spaces for your work and creativity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {coworkingsJsonReady.data.map((coworkingItem: CoworkingItem) => (
                    <Link key={coworkingItem._id} href={`/coworking/${coworkingItem._id}`} className="block">
                        <Card coworkingName={coworkingItem.name} imgSrc={coworkingItem.picture} />
                    </Link>
                ))}
            </div>
        </main>
    );
}
