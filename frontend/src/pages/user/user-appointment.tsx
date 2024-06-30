import { AppointmentCard } from "@/components/appointment-card";

import { UserSideNavBar } from "@/components/user-sidenavbar";

export function UserAppointmentPage() {
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <main className="flex flex-row h-full">
                <UserSideNavBar />
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