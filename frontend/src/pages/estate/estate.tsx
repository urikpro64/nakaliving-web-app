import { EstateCard } from "@/components/estate-card";
import { Estate } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function EstatePage() {
  const [estates, setEstates] = useState<Estate[]>();
  useEffect(() => {
    fetch(`${BASE_URL}/estate`, {
      method: "GET",
    }).then(response => response.json())
      .then(response => setEstates(response.data.estates));
    console.log(estates)
  }, [])
  return (
    <div className="relative w-full flex max-h-screen flex-col ">
      <main className="w-full flex flex-col">
        <div className="container space-y-5 p-3 overflow-auto ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-semibold">รายการ</h1>
            <Link to={"/estate/insert"}>
              <button type="button" className="bg-green-400 rounded-md shadow-md p-2">เพิ่ม</button>
            </Link>
          </div>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col w-full gap-2 divide-y-2 overflow-hidden">
              {estates && estates.map((estate) => (
                <EstateCard key={estate.ID} estate={estate} />
              ))}
            </div>
            <div className="flex flex-col w-1/3 p-2 text-nowrap gap-y-4">
              <div className="flex flex-col gap-y-2">
                <div className="font-semibold">ประเภท</div>
                <div className="flex flex-col items-start px-2">
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"บ้าน"} className="w-4 h-4"></input>
                    <label>ขาย</label>
                  </div>
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"คอนโด"} className="w-4 h-4"></input>
                    <label>ให้เช่า</label>
                  </div>
                </div>
                <div className="font-semibold">ราคา</div>
                <div className="flex flex-row w-full items-center gap-x-2 text-gray-500 text-sm">
                  <div className="flex flex-col w-full p-2 border-2 rounded-md">
                    <div>ราคาเริ่มต้น</div>
                    <input className="w-16 p-1 text-gray-700" type="text" placeholder="1000" />
                  </div>
                  <div>-</div>
                  <div className="flex flex-col w-full p-2 border-2 rounded-md">
                    <div>ราคาสูงสุด</div>
                    <input className="w-16 p-1 text-gray-700" type="text" placeholder="1000" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="font-semibold">ชนิดอสังหาริมทรัพย์</div>
                <div className="flex flex-col items-start px-2">
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"บ้าน"} className="w-4 h-4"></input>
                    <label>บ้าน</label>
                  </div>
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"คอนโด"} className="w-4 h-4"></input>
                    <label>คอนโด</label>
                  </div>
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"หอพัก"} className="w-4 h-4"></input>
                    <label>หอพัก</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="font-semibold">สัญญาเช่า</div>
                <div className="flex flex-col items-start px-2">
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"3 เดือน"} className="w-4 h-4"></input>
                    <label>3 เดือน</label>
                  </div>
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"6 เดือน"} className="w-4 h-4"></input>
                    <label>6 เดือน</label>
                  </div>
                  <div className="flex flex-row gap-x-1 text-gray-600 items-center">
                    <input type="checkbox" value={"1 ปี"} className="w-4 h-4"></input>
                    <label>1 ปี</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
