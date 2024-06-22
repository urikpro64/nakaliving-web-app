import { Navbar } from "@/components/navbar";
import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { useParams } from "react-router-dom";

export function OwnerInformationPage() {
    const { userId } = useParams();
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <Navbar />
            <main className="flex flex-row h-full">
                <OwnerSideNavBar />
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
                                value={userId}
                                disabled
                            />
                            <label>ที่อยู่</label>
                            <textarea
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                value={userId}
                                disabled
                            />
                            <label>เบอร์โทร</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={userId}
                                disabled
                            />
                            <button className="p-2 rounded-md bg-gray-700 text-white">แก้ไขข้อมูล</button>
                        </div>
                        <div className="flex flex-1 flex-col gap-y-3 justify-between">
                            <label>รหัสผู้ใช้</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={userId}
                                disabled
                            />
                            <label>ชื่อผู้ใช้</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="text"
                                value={userId + "@gmail.com"}
                                disabled
                            />
                            <label>รหัสผ่าน</label>
                            <input
                                className="p-2 bg-gray-200 rounded-md text-gray-600"
                                type="password"
                                value={userId}
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