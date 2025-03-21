"use client"
import getCoworkings from "@/libs/getCoworkings";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CoworkingCatalog from "@/components/CoworkingCatalog";

export default function Coworking() {
    const coworkingsPromise = getCoworkings()
    return (
        <main className="text-center p-10">
            <h1 className="text-3xl font-medium">Select your coworking</h1>
            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                <CoworkingCatalog coworkingsJson={coworkingsPromise} />
            </Suspense>
        </main>
    )
}