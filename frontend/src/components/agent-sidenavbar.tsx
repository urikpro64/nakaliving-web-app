import { Response, User } from "@/types";
import { BookUser, Home, LogOutIcon, UserIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_API_URL

export function AgentSideNavBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    useEffect(() => {
        fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            credentials: "include",
        }).then(response => response.json())
            .then(response => setUser(response.data))
    })


    const onLogout = async () => {
        const response: Response = await fetch(`${BASE_URL}/auth/signout`, {
            method: "POST",
            credentials: "include",
        }).then(response => response.json())
        console.log(response);
        if (response.error) {
            console.log(response.error)
            return
        }
        navigate("/")
    }
    return (
        <nav className="flex h-full px-4 py-4 shadow-2xl">
            <div className="flex flex-col w-full h-full justify-between text-nowrap font-semibold gap-y-2 divide-y divide-gray-400">
                <div className="flex flex-row items-center gap-x-2">
                    <div className="bg-blue-600 text-white p-2 rounded-md">
                        <Home />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg">Agent</div>
                        <div className="text-xs font-normal">{user?.name}</div>
                    </div>
                </div>
                <div className="flex flex-col h-full pt-4 gap-y-4 text-neutral-700 font-medium text-sm">
                    <div className="flex flex-row w-full gap-x-2 items-center">
                        <UserIcon />
                        <Link to="/agent">
                            <div>ข้อมูลผู้ใช้</div>
                        </Link>
                    </div>
                    <div className="flex flex-row w-full gap-x-2 items-center">
                        <BookUser />
                        <Link to="/agent/appointment">
                            <div>นัดหมาย</div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col pt-2">
                    <div className="flex flex-row w-full gap-x-2 items-center p-2 bg-red-500 text-white rounded-md shadow-md drop-shadow-md">
                        <LogOutIcon />
                        <button onClick={onLogout}>ออกจากระบบ</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}