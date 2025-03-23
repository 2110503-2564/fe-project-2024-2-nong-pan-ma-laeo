'use client'
import { useReducer, useState } from "react";
import Card from "./Card";
import * as React from 'react';
import Link from "next/link";
export default function CardPanel() {
    const [coworkingResponse, setCoworkingResponse] = useState<CoworkingItem[] | null>(null);

    const compareReducer = (compareList: Map<string, number>, action: { type: string, coworkingName: string, rating?: number | 0 }) => {
        switch (action.type) {
            case 'add': {
                return new Map(compareList.set(action.coworkingName, action.rating || 0));
            }
            case 'remove': {
                compareList.delete(action.coworkingName);
                return new Map(compareList);
            }
            default:
                return compareList;
        }
    };

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Map<string, number>());
    // Mock Data for Demonstration Only
    // const mockCoworkingRepo = [
    //     { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
    //     { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
    //     { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" }
    // ];
    if (!coworkingResponse) return (<p>Coworking Panel is Loading...</p>)
    return (
        <div>
            <div style={{
                margin: "20px", display: "flex",
                flexDirection: "row", alignContent: "space-around",
                justifyContent: "space-around", flexWrap: "wrap", padding: "10px"
            }}>
                {
                    coworkingResponse.map((coworkingItem: CoworkingItem) => (
                        <div className="w-1/5">
                            <Link href={`/coworking/${coworkingItem._id}`} className="w-1/5">
                                <Card
                                    coworkingName={coworkingItem.name}
                                    imgSrc={coworkingItem.picture}
                                />
                            </Link>
                        </div>

                    ))
                }
                {/* <Card coworkingName="The Bloom Pavilion" imgSrc="/img/bloom.jpg"
                onCompare={handleCompare}
            />
            <Card coworkingName="Spark Space" imgSrc="/img/sparkspace.jpg"
                onCompare={handleCompare}
            />
            <Card coworkingName="The Grand Table" imgSrc="/img/grandtable.jpg"
                onCompare={handleCompare}
            /> */}
            </div>
            <div style={{
                margin: "20px", display: "flex", alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start", flexWrap: "wrap", padding: "10px"
            }}>
                <div className="text-xl font-medium">Coworking List Ratings: {compareList.size}</div>
                {Array.from(compareList).map(([coworkingName, rating]) => (
                    <div key={coworkingName}
                        onClick={() => dispatchCompare({ type: 'remove', coworkingName })}
                        style={{ cursor: "pointer" }}
                        data-testid={coworkingName}>
                        {coworkingName}: {rating}
                    </div>
                ))
                }
            </div >
        </div >
    )
}
