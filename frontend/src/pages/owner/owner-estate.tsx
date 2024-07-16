import { EstateCard } from "@/components/estate-card";

import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { Estate } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function OwnerEstatePage() {
    const [estates, setEstates] = useState<Estate[]>();
    useEffect(() => {
        fetch(`${BASE_URL}/estate`, {
            method: "GET",
        }).then(response => response.json())
            .then(response => setEstates(response.data.estates));
        console.log(estates)
    }, [estates])

    if (!estates) {
        return (
            <div className="relative flex flex-col w-full h-screen max-h-screen">
                <main className="flex flex-row h-full items-center">
                    <OwnerSideNavBar />
                    <div className="container flex justify-center">
                        <RefreshCcw className="animate-spin"></RefreshCcw>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="relative flex flex-col w-full max-h-screen  overflow-hidden">
            <main className="flex flex-row h-full">
                <OwnerSideNavBar />
                <div className="container flex flex-col h-full space-y-5 p-3 overflow-hidden">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">รายการ</h1>
                        <Link to={"/estate/insert"}>
                            <button type="button" className="bg-green-400 rounded-md shadow-md p-2">เพิ่ม</button>
                        </Link>
                    </div>
                    <div className="flex flex-col w-full h-full gap-2 divide-y-2 overflow-auto">
                        {estates && estates.map((estate) => (
                            <EstateCard key={estate.ID} estate={estate} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}