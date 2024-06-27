import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type FormData = {
  Email: string
  Password: string
}
export function LoginPage() {
  // const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [alertMessage, setAlertMessage] = useState<string>("")
  const {
    register,
    handleSubmit,
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    setAlertMessage("");
    const result = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    // setCookie(result.data.cookie.Name, result.data.cookie.Value, { path: "/", maxAge: result.data.cookie.MaxAge })
    console.log(result)
    if (result.success) {
      const result = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
      }).then(response => response.json())
      console.log(result)
      
      return
    }
  })
  return (
    <div className="relative w-full flex max-h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="w-full flex">
        <div className="w-1/2">
          <img
            className=" w-full max-h-screen object-cover"
            src="https://images.unsplash.com/photo-1714248376481-f3e37e023ec8?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <button
            onClick={() => {
              window.history.back();
            }}
            className="bg-red-500 border text-xl border-black text-white p-2 rounded-md absolute top-5 right-5"
          >
            {"<=="}
          </button>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="size-20 self-center rounded-full bg-lime-400"></div>
            <h1 className="text-5xl font-bold text-center mb-10">
              เข้าสู่ระบบ
            </h1>
            <input {...register("Email", { required: true })} className="bg-gray-200 rounded-md p-2" type="text" placeholder="Email" />
            <input {...register("Password", { required: true })} className="bg-gray-200 rounded-md p-2" type="password" placeholder="Password" />
            <div className="text-red-400 text-sm">{alertMessage}</div>
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
