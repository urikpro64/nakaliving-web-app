import { AppointmentCard } from "@/components/appointment-card";
import { Navbar } from "@/components/navbar";
import { OwnerSideNavBar } from "@/components/owner-sidenavbar";

export function OwnerAppointmentPage() {
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <Navbar />
            <main className="flex flex-row h-full">
                <OwnerSideNavBar />
                <div className="container space-y-5 divide-y p-3 overflow-auto ">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">การนัดหมาย</h1>
                    </div>
                    <AppointmentCard></AppointmentCard>
                    <AppointmentCard></AppointmentCard>
                </div>
            </main>
        </div>
    )
}