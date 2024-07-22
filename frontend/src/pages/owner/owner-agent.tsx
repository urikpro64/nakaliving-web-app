import { AgentInsertModal } from "@/components/agent-insert-modal";
import { OwnerSideNavBar } from "@/components/owner-sidenavbar";
import { Response, User } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";


const BASE_URL = import.meta.env.VITE_API_URL

export function OwnerAgentPage() {
    const [users, setUsers] = useState<User[]>();
    const [insertModal, setInstertModal] = useState<boolean>(false);
    const [actionReload, setActionReload] = useState<boolean>(false);
    useEffect(() => {
        fetch(`${BASE_URL}/user/role/agent`, {
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
        const response: Response = await fetch(`${BASE_URL}/user/${id}`, {
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
                <div className="container relative flex flex-col h-full gap-y-5 p-3 overflow-hidden">
                    {insertModal &&
                        <AgentInsertModal setOpen={setInstertModal} setActionReload={setActionReload}/>
                    }
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">นายหน้า</h1>
                        <button
                            type="button"
                            className="bg-green-400 rounded-md shadow-md p-2"
                            onClick={() => setInstertModal(true)}
                        >เพิ่ม</button>
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
                                                onClick={() => onDelete(user.ID)}
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