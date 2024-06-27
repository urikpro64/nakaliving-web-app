import { Navbar } from "@/components/navbar";
import { UserSideNavBar } from "@/components/user-sidenavbar";
import { User } from "@/types";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL

export function UserInformationPage() {
    const [user,setUser] = useState<User>();
    useEffect(() => {
        fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            credentials: "include",
        }).then(response => response.json())
        .then(response => setUser(response.data))
    },[])

    if (!user) {
        return (
            <div className="relative w-full h-screen flex max-h-screen flex-col ">
                <Navbar />
                <main className="flex flex-row h-full items-center justify-center">
                    <CircleArrowLeft className="animate-spin"></CircleArrowLeft>
                </main>
            </div>
        )
    }
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <Navbar />
            <main className="flex flex-row h-full">
                <UserSideNavBar />
                <div className="container space-y-5 p-3">
                    <div className="flex flex-row justify-between text-xl font-semibold">
                        <div>ข้อมูลผู้ใช้</div>
                        {/* <div>{userId}</div> */}
                    </div>
                    <div className="flex flex-row gap-x-5">
                        <div className="flex flex-1 flex-col gap-y-3">
                            <label>ชื่อ</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={user.name}
                                disabled
                            />
                            <label>ที่อยู่</label>
                            <textarea
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                value={user.address ? user.address:""}
                                disabled
                            />
                            <label>เบอร์โทร</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={user.tel}
                                disabled
                            />
                            <button className="p-2 rounded-md bg-gray-700 text-white">แก้ไขข้อมูล</button>
                        </div>
                        <div className="flex flex-1 flex-col gap-y-3 justify-between">
                            <label>รหัสผู้ใช้</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={user.ID}
                                disabled
                            />
                            <label>ชื่อผู้ใช้</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={user.email}
                                disabled
                            />
                            <label>รหัสผ่าน</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="password"
                                value={1234}
                                disabled
                            />
                            <button className="p-2 rounded-md bg-gray-700 text-white">เปลี่ยนรหัสผ่าน</button>
                        </div>
                    </div>                    
                </div>
            </main>
        </div>
    )
}