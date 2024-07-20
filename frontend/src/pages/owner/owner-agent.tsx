import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { Response, User } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function OwnerAgentPage() {
    const [users, setUsers] = useState<User[]>();
    const [actionReload, setActionReload] = useState<boolean>(false);
    useEffect(() => {
        fetch(`${BASE_URL}/user/role/user`, {
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
            .then(response => setUsers(response.data.users));
        setActionReload(false);
    }, [actionReload])

    if (!users) {
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

    const onDelete = async (id: number) => {
        const response: Response = await fetch(`${BASE_URL}/estate/${id}`, {
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
                <div className="container relative flex flex-col h-full space-y-5 p-3 overflow-hidden">
                    <div className="absolute z-10 flex w-full h-full bg-gray-400 bg-opacity-25 items-center justify-center">
                        <div className="flex flex-col w-1/3 gap-y-2 bg-white shadow-md rounded-md p-4">
                            <div className="text-xl font-semibold">เพิ่มนายหน้า</div>
                            <div className="flex flex-col gap-2">
                                <label>ชื่อ-สกุล</label>
                                <input
                                    type="text"
                                    placeholder="ชื่อ-สกุล"
                                    className="p-1 border rounded-md"
                                />
                                <button className="w-fit p-2 bg-green-500 shadow-md rounded-md text-white self-end">บันทึก</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">นายหน้า</h1>
                        <Link to={"/estate/insert"}>
                            <button type="button" className="bg-green-400 rounded-md shadow-md p-2">เพิ่ม</button>
                        </Link>
                    </div>
                    <div className="flex w-full h-full gap-y-2 divide-y-2 overflow-auto">
                        <table className="table-auto w-full h-fit">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Tel</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2">
                                {users && users.map((user) => (
                                    <tr>
                                        <td className="text-center">{user.ID}</td>
                                        <td className="text-center">{user.email}</td>
                                        <td className="text-center">{user.name}</td>
                                        <td className="text-center">{user.tel}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="px-2 py-1 rounded-md bg-red-500 text-white text-center"
                                            >ลบ</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}