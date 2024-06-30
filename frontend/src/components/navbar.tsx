import { User } from "@/types";
import { UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function Navbar() {
  const navItems = [
    { label: "อสังหาริมทรัพย์", url: "/estate" },
    // { label: "นัดหมาย", url: "/appointment" },
  ];

  const [user, setUser] = useState<User>();
  useEffect(() => {
      fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      }).then(response => response.json())
        .then(response => setUser(response.data))
  })

  return (
    <nav className="relative flex bg-white shadow-md">
      <div className="flex w-full items-center flex-row p-5 justify-between">
        {/* left */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="size-10 rounded-full bg-yellow-300"></div>
          <Link to="/" className="text-black hover:text-blue-700">
            <div className="font-bold text-xl">Naka Living</div>
          </Link>
          {navItems.map((item, index) => (
            <div key={index}>
              <a href={item.url} className="text-gray-600 hover:text-gray-800">
                {item.label}
              </a>
            </div>
          ))}
        </div>
        {/* middle */}
        <div className="flex space-x-5">
        </div>
        {/* right */}
        <div className="flex space-x-3 items-center">
          {!user ?
            <div className="items-center space-x-3">
              <Link to={"/login"}>
                <button className="">เข้าสู่ระบบ</button>
              </Link>
              <Link to={"/register"}>
                <button className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-500 p-2 rounded-md">สมัครสมาชิก</button>
              </Link>
            </div>
            :
            <Link to={"/user"} className="flex flex-row gap-x-2">
              <div className="font-semibold">{user.name}</div>
              <UserCircle></UserCircle>
            </Link>
          }


        </div>
      </div>
    </nav>
  );
}
