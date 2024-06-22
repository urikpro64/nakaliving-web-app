import { Navbar } from "@/components/navbar";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="flex flex-1 flex-row items-center justify-around bg-[url('https://images.unsplash.com/photo-1714317559964-498c611e2c0c?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div className="flex flex-col gap-y-2 justify-center items-center text-white p-4 rounded-xl backdrop-opacity-75 backdrop-blur-lg">
          <div className="flex flex-col text-5xl font-semibold space-y-4 items-center">
            <div>ปล่อยให้เรื่องเช่า...ให้เป็นเรื่องง่าย</div>
          </div>
          <div className="text-lg">บริการบริหารดูแลอสังหาริมทรัพย์ให้เช่า</div>
          <div className="flex flex-row gap-x-3">
            <Link to={"/estate"} className="w-fit">
              <button className="border-2 border-white rounded-md p-2 w-fit hover:drop-shadow-md hover:bg-white hover:text-black transition-all duration-700">
                เข้าชม
              </button>
            </Link>
            <Link to={"/register"} className="flex flex-row justify-center items-center text-xs hover:underline">
              <div>สมัครสมาชิก</div>
              <ArrowRight></ArrowRight>
            </Link>
          </div>
        </div>
        {/* <div className="w-1/2 p-4">
          <img className="" src="https://images.unsplash.com/photo-1714317559964-498c611e2c0c?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div> */}
      </main>
      <footer className="bg-neutral-200 p-5">
        <div className="container flex justify-around">
          <div className="font-semibold">Contact</div>
          <div>Tel. 098-691-5592</div>
          <div>Email: NakaLivinggroup@gmail.com </div>
          <div>FB: Naka Living</div>
        </div>
      </footer>
    </div>
  );
}
