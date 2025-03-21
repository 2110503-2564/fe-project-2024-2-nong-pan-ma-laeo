
import Link from "next/link";
import Card from "./Card";
import React, { Suspense } from "react";

export default async function CoworkingCatalog({ coworkingsJson }: { coworkingsJson: Promise<CoworkingJson> }) {
    const coworkingsJsonReady = await coworkingsJson;
    return (
        <>
            <h3>Explore {coworkingsJsonReady.count} fabulous coworkings in our coworking catalog</h3>
            <div style={{
                margin: "20px", display: "flex",
                flexDirection: "row", alignContent: "space-around",
                justifyContent: "space-around", flexWrap: "wrap", padding: "10px"
            }}>
                {
                    coworkingsJsonReady.data.map((coworkingItem: CoworkingItem) => (
                        <Link key={coworkingItem._id} href={`/coworking/${coworkingItem._id}`} className="w-1/5">
                            <Card coworkingName={coworkingItem.name}
                                imgSrc={coworkingItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}