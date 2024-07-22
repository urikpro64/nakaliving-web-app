import { Response, User } from "@/types";
import { CircleAlert, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function AppointmentInsertModal({
    setOpen,
    estateID
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    estateID: number
}) {
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState<Date>();
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            credentials: "include",
        }).then(response => response.json())
            .then(response => setUser(response.data))
        setIsLoading(false);
    }, [])

    if (!user) {
        return (
            <div className="absolute z-10 flex w-full h-full items-center justify-center overflow-hidden">
                <div className="z-20 flex flex-col w-1/3 h-fit max-h-full gap-y-2 bg-white shadow-2xl rounded-md p-4 overflow-hidden">
                    <div className="flex flex-row text-xl font-semibold justify-end">
                        <button
                            type="button"
                            className="p-1 text-base text-gray-400 hover:text-gray-600"
                            onClick={() => setOpen(false)}
                        >x</button>
                    </div>
                    {isLoading ?
                        <RefreshCcw className="animate-spin"/>
                        :
                        <div className="flex flex-col gap-2 overflow-auto items-center">
                            <CircleAlert className="w-1/3 h-full text-gray-400" />
                            <div className="text-xl text-gray-500 text-center">ขออภัย ไม่สามารถทำรายการได้ กรุณาเข้าสู่ระบบ</div>
                        </div>
                    }

                </div>
            </div>
        )
    }

    const onSubmit = async () => {
        const response: Response = await fetch(`${BASE_URL}/operation/appointment`, {
            method: "POST",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EstateID: estateID,
                Appointment: appointment,
            })
        }).then(response => response.json())
        if(response.success) {
            navigate(`/${user.role}/appointment`)
        }
    }
    return (
        <div className="absolute z-10 flex w-full h-full items-center justify-center overflow-hidden">
            <div className="z-20 flex flex-col w-1/3 h-fit max-h-full gap-y-2 bg-white shadow-2xl rounded-md p-4 overflow-hidden">
                <div className="flex flex-row text-xl font-semibold items-center justify-between">
                    <div>นัดหมาย</div>
                    <button
                        type="button"
                        className="p-1 text-base text-gray-400 hover:text-gray-600"
                        onClick={() => setOpen(false)}
                    >x</button>
                </div>
                <div className="flex flex-col gap-2 overflow-auto">
                    <div className="flex flex-col gap-2">
                        <label>เวลา</label>
                        <input
                            type="datetime-local"
                            className="p-1 border rounded-md"
                            onChange={e => setAppointment(new Date(e.currentTarget.value))}
                        />
                    </div>
                    <button
                        className="w-fit p-2 bg-green-500 shadow-md rounded-md text-white self-end"
                        onClick={() => onSubmit()}
                    >บันทึก</button>
                </div>
            </div>
        </div>
    )
}