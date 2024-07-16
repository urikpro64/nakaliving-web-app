import { UserSideNavBar } from "@/components/user-sidenavbar";

export function UserPage() {
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <UserSideNavBar />
            <main className="flex flex-row h-full items-center justify-center">
            </main>
        </div>
    )
}