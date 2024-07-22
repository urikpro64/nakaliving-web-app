import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { Operation } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { OwnerAppointmentCard } from "./owner-appointment-card";

const BASE_URL = import.meta.env.VITE_API_URL

export function OwnerAppointmentPage() {
    const [operations, setOperations] = useState<Operation[]>();
    useEffect(() => {
        fetch(`${BASE_URL}/operation`, {
            method: "GET",
            credentials: "include",
        }).then(response => response.json())
            .then(response => setOperations(response.data.operations))
    }, [])

    if (!operations) {
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
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <main className="flex flex-row h-full">
                <OwnerSideNavBar />
                <div className="container space-y-5 divide-y p-3 overflow-auto ">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">การนัดหมาย</h1>
                    </div>
                    {operations && operations.map(operation => (
                        <OwnerAppointmentCard operation={operation} />
                    ))}
                </div>
            </main>
        </div>
    )
}