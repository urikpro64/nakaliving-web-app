import { Navbar } from "@/components/navbar";

export function RegisterPage() {
  const inputList = [
    {
      label: "ชื่อ - นามสกุล",
      type: "text",
    },
    {
      label: "ที่อยู่",
      type: "text",
    },
    {
      label: "เบอร์โทร",
      type: "text",
    },
    {
      label: "อีเมล",
      type: "text",
    },
    {
      label: "รหัสผ่าน",
      type: "password",
    },
    {
      label: "ยืนยันรหัสผ่าน",
      type: "password",
    },
  ];
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
        <div className="w-1/2 flex justify-center mt-5 ">
          <button
            onClick={() => {
              window.history.back();
            }}
            className="bg-red-500 border text-xl border-black text-white p-2   rounded-md absolute top-5 right-5"
          >
            {"<=="}
          </button>
          <div className="flex flex-col gap-5">
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
                  <input type={input.type} className="bg-gray-200 p-2 rounded-md" placeholder={input.label} />
                </div>
              ))}
            </div>
            <button className="bg-green-500 text-white p-2 rounded-md">
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
