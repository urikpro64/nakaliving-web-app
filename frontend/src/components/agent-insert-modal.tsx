import { useState } from "react"
import { useForm } from "react-hook-form"

const BASE_URL = import.meta.env.VITE_API_URL

type FormData = {
    Role: string
    Name: string
    Address: string
    Tel: string
    Email: string
    Password: string
    ConfirmPassword: string
}

export function AgentInsertModal({ 
    setOpen,
    setActionReload,
}: { 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setActionReload: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const inputList = [
        {
            name: "Name",
            label: "ชื่อ - นามสกุล",
            type: "text",
        },
        {
            name: "Address",
            label: "ที่อยู่",
            type: "text",
        },
        {
            name: "Tel",
            label: "เบอร์โทร",
            type: "text",
        },
        {
            name: "Email",
            label: "อีเมล",
            type: "text",
        },
        {
            name: "Password",
            label: "รหัสผ่าน",
            type: "password",
        },
        {
            name: "ConfirmPassword",
            label: "ยืนยันรหัสผ่าน",
            type: "password",
        },
    ];

    const [alertMessage, setAlertMessage] = useState<string>("")
    const {
        register,
        handleSubmit,
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async (data) => {
        setAlertMessage("");
        if (data.Password != data.ConfirmPassword) {
            setAlertMessage("Your confirm password is not match");
            return
        }
        data.Role = "agent";
        const result = await fetch(`${BASE_URL}/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
        if (result.success) {
            setAlertMessage("Saved");
            setActionReload(true);
            return
        }
        setAlertMessage("Your email is already exist");
    })

    return (
        <div className="absolute z-10 flex w-full h-full items-center justify-center overflow-hidden">
            <div className="z-20 flex flex-col w-1/3 h-fit max-h-full gap-y-2 bg-white shadow-2xl rounded-md p-4 overflow-hidden">
                <div className="flex flex-row text-xl font-semibold items-center justify-between">
                    <div>เพิ่มนายหน้า</div>
                    <button
                        type="button"
                        className="p-1 text-base text-gray-400 hover:text-gray-600"
                        onClick={() => setOpen(false)}
                    >x</button>
                </div>
                <form className="flex flex-col gap-2 overflow-auto" onSubmit={onSubmit}>
                    {inputList.map(input => (
                        <div className="flex flex-col gap-2">
                            <label>{input.label}</label>
                            <input
                                {...register(input.name, { required: true })}
                                type={input.type}
                                placeholder={input.label}
                                className="p-1 border rounded-md"
                            />
                        </div>
                    ))}
                    {alertMessage.length > 0 &&
                        <div className="text-red-400 text-sm">*{alertMessage}</div>
                    }
                    <button type="submit" className="w-fit p-2 bg-green-500 shadow-md rounded-md text-white self-end">บันทึก</button>
                </form>
            </div>
        </div>
    )
}