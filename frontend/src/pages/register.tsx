
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

type FormData = {
  Name: string
  Address: string
  Tel: string
  Email: string
  Password: string
  ConfirmPassword: string
}

export function RegisterPage() {
  const navigate = useNavigate();
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
    const result = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    if(result.success) {
      navigate("/login");
      return
    }
    setAlertMessage("Your email is already exist");
  })
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

  // const submitForm = (e:HTMLFormElement) => {
  //   const password = e.target.Passowrd;
  //   const confirmPassword = e.get("ConfirmPassword");

  //   if(password === confirmPassword) {
  //     setAlertMessage("Your confirm password is not match with password.")
  //     return
  //   }
  // }

  return (
    <div className="relative w-full flex max-h-screen flex-col overflow-hidden">
      
      <main className="w-full flex">
        <div className="w-1/2">
          <img
            className=" w-full max-h-screen object-cover"
            src="https://images.unsplash.com/photo-1714248376481-f3e37e023ec8?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="w-1/2 flex justify-center mt-5 ">
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="size-20 self-center rounded-full bg-lime-400"></div>
            <h1 className="text-5xl font-bold text-center mb-10">
              สมัครสมาชิก
            </h1>
            <div className="flex flex-col space-y-2 justify-center">
              {inputList.map((input) => (
                <div>
                  <label htmlFor="" className="font-semibold">
                    {input.label}:{" "}
                  </label>
                  <input {...register(input.name, {required:true})} type={input.type} className="bg-gray-200 p-2 rounded-md" placeholder={input.label} />
                </div>
              ))}
            </div>
            {alertMessage.length > 0 &&
              <div className="text-red-400 text-sm">*{alertMessage}</div>
            }
            <button className="bg-green-500 text-white p-2 rounded-md" type="submit">
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
