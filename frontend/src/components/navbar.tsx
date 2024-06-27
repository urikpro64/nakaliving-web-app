import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
export function Navbar() {
  const navItems = [
    { label: "อสังหาริมทรัพย์", url: "/estate" },
    // { label: "นัดหมาย", url: "/appointment" },
  ];
  return (
    <nav className="bg-white shadow-md">
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
          <Link to={"/login"}>
            <button className="">เข้าสู่ระบบ</button>
          </Link>
          <Link to={"/register"}>
            <button className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-500 p-2 rounded-md">สมัครสมาชิก</button>
          </Link>
          <Link to={"/user/C000001"} className="flex flex-row gap-x-2">
            <div className="font-semibold">C000001</div>
            <UserCircle></UserCircle>
          </Link>
        </div>
      </div>
    </nav>
  );
}
