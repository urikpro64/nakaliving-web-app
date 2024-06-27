import { Navbar } from "@/components/navbar";
import { Response, ResponseError } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

type FormData = {
  Email: string
  Password: string
}
export function LoginPage() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string>("")
  const {
    register,
    handleSubmit,
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    setAlertMessage("");
    const response:Response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    
    if (response.error) {
      const err:ResponseError = response.error;
      if(err.code == 2001) {
        setAlertMessage("*Your email or password is not correct")
      } else {
        setAlertMessage("*Something went worng")
      }
      return
    }

    navigate("/")
  })
  return (
    <div className="relative w-full flex max-h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="w-full flex">
        <div className="w-1/2">
          <img
            className="w-full h-screen object-cover"
            src="https://scontent.fbkk22-8.fna.fbcdn.net/v/t39.30808-6/447277177_977208624409642_2201173865216892464_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFK3KY2IYk0uQQCr_d6PkfPIjXsH8sf3HwiNewfyx_cfF1GGvL1Epnoo285AEVTOQyzlaHiXCC5WL3xx6RuAfuL&_nc_ohc=FBhNp7jbLH8Q7kNvgEUMbmd&_nc_zt=23&_nc_ht=scontent.fbkk22-8.fna&oh=00_AYCP4NjRaYPOZ2aY1CWhfPyOnVJxYbGUY1HtvbVnEZ66CQ&oe=66835653"
          />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="size-20 self-center rounded-full bg-lime-400">

            </div>
            <h1 className="text-5xl font-bold text-center mb-10">
              เข้าสู่ระบบ
            </h1>
            <input {...register("Email", { required: true })} className="bg-gray-200 rounded-md p-2" type="text" placeholder="Email" />
            <input {...register("Password", { required: true })} className="bg-gray-200 rounded-md p-2" type="password" placeholder="Password" />
            <div className="text-red-400 text-sm">
              {alertMessage}
            </div>
            <button className="bg-green-500 text-white p-2 rounded-md" type="submit">
              เข้าสู่ระบบ
            </button>
            <div className="flex space-x-3">
              <div>ยังไม่สมัครใช่ไหม</div>
              <a href="/register" className="underline hover:text-gray-600">
                สมัครสมาชิก
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
