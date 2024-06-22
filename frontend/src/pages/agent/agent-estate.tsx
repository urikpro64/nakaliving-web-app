import { AgentSideNavBar } from "@/components/agent-sidenavbar";
import { EstateCard } from "@/components/estate-card";
import { Navbar } from "@/components/navbar";
import { Link } from "react-router-dom";

export function AgentEstatePage() {

    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col">
            <Navbar />
            <main className="flex flex-row h-full overflow-hidden">
                <AgentSideNavBar />
                <div className="container space-y-5 p-3 overflow-hidden">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">รายการ</h1>
                        <Link to={"/estate/insert"}>
                            <button type="button" className="bg-green-400 rounded-md shadow-md p-2">เพิ่ม</button>
                        </Link>
                    </div>
                    <div className="flex flex-row h-full gap-x-4 overflow-hidden">
                        <div className="flex flex-col w-full gap-2 divide-y-2 overflow-scroll">
                            <EstateCard />
                            <EstateCard />
                            <EstateCard />
                            <EstateCard />
                            <EstateCard />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}