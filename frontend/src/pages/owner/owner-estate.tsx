import { EstateCard } from "@/components/estate-card";

import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { Estate, Response } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function OwnerEstatePage() {
    const [estates, setEstates] = useState<Estate[]>();
    const [actionReload, setActionReload] = useState<boolean>(false);
    useEffect(() => {
        fetch(`${BASE_URL}/estate`, {
            method: "GET",
        }).then(response => response.json())
            .then(response => setEstates(response.data.estates));
        setActionReload(false);
    }, [actionReload])

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

    const onChangeVisible = async (id: number) => {
        await fetch(`${BASE_URL}/estate/${id}/visible`, {
            method: "PATCH",
        }).then(response => response.json())
            .then(response => console.log(response));
    }

    const onDelete = async (id: number) => {
        const response:Response = await fetch(`${BASE_URL}/estate/${id}`, {
            method: "DELETE",
            credentials: "include"
        }).then(response => response.json())
        if (response.success) {
            setActionReload(true);
        }
    }

    return (
        <div className="relative flex flex-col w-full h-screen max-h-screen overflow-hidden">
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
                            <div key={estate.ID} className="flex flex-row space-x-2 items-center">
                                <EstateCard estate={estate} />
                                <label className="inline-flex w-fit h-fit items-center cursor-pointer">
                                    <input type="checkbox" value="" className="hidden peer" defaultChecked={estate.visible} onChange={() => onChangeVisible(estate.ID)} />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                                <button type="button" className="p-2 rounded-md bg-red-500 text-white shadow-md" onClick={() => onDelete(estate.ID)}>ลบ</button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}