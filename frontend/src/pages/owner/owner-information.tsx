
import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { Response, User } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL

type ChangeInfoProps = {
    name: string,
    address: string,
    tel: string,
}

export function OwnerInformationPage() {
    const [user, setUser] = useState<User>();
    const [isChangeInfo, setIsChangeInfo] = useState<boolean>(false);
    const [changeInfoAlert, setChangeInfoAlert] = useState<string>("");
    useEffect(() => {
        fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            credentials: "include",
        }).then(response => response.json())
            .then(response => setUser(response.data))
    }, [])

    if (!user) {
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

    const changeInfo = async () => {
        const changeInfoData: ChangeInfoProps = {
            name: user.name,
            address: user.address ? user.address : "",
            tel: user.tel
        }

        const response: Response = await fetch(`${BASE_URL}/user/changeinfo`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changeInfoData)
        }).then(response => response.json())
        if (!response.success) {
            setChangeInfoAlert("*Please input valid data")
            return
        }
        setUser(response.data as User)
        setIsChangeInfo(false)
        setChangeInfoAlert("Saved data.")
    }
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <main className="flex flex-row h-full">
                <OwnerSideNavBar />
                <div className="container space-y-5 p-3">
                    <div className="flex flex-row justify-between text-xl font-semibold">
                        <div>ข้อมูลผู้ใช้</div>
                        {/* <div>{userId}</div> */}
                    </div>
                    <div className="flex flex-row gap-x-5">
                        <form className="flex flex-1 flex-col gap-y-3">
                            <label>ชื่อ</label>
                            <input
                                className={`p-2 ${!isChangeInfo ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-black border-2"} rounded-md `}
                                type="text"
                                value={user.name}
                                disabled={!isChangeInfo}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                            <label>ที่อยู่</label>
                            <textarea
                                className={`p-2 ${!isChangeInfo ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-black border-2"} rounded-md `}
                                value={user.address}
                                disabled={!isChangeInfo}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                            <label>เบอร์โทร</label>
                            <input
                                className={`p-2 ${!isChangeInfo ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-black border-2"} rounded-md `}
                                type="text"
                                value={user.tel}
                                disabled={!isChangeInfo}
                                onChange={(e) => setUser({ ...user, tel: e.target.value })}
                            />
                            {isChangeInfo ?
                                <div className="flex flex-row w-full space-x-2">
                                    <button className="p-2 w-full rounded-md bg-gray-700 text-white" type="button" onClick={() => setIsChangeInfo(!isChangeInfo)}>ยกเลิก</button>
                                    <button className="p-2 w-full rounded-md bg-gray-700 text-white" type="button" onClick={() => changeInfo()}>บันทึกข้อมูล</button>
                                </div>
                                :
                                <button className="p-2 rounded-md bg-gray-700 text-white" type="button" onClick={() => setIsChangeInfo(!isChangeInfo)}>แก้ไขข้อมูล</button>
                            }
                        </form>
                        <form className="flex flex-1 flex-col gap-y-3 justify-between">
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
                        </form>
                    </div>
                    <div className="w-full text-center">{changeInfoAlert}</div>
                </div>
            </main>
        </div>
    )
}