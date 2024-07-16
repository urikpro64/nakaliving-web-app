import { Estate } from "@/types";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL

export function EstateCard({estate}:{estate:Estate}) {
  return (
    <div className="flex flex-col w-full gap-2 items-center justify-between hover:bg-neutral-300 transition-all duration-300">
      <Link to={"/estate/1"}>
        <div className="flex flex-1 flex-row space-x-2">
          {/* Left */}
          <div className="flex w-1/3 h-full self-center">
              <img
                className="w-full h-full object-fill"
                src={estate.images ? `${BASE_URL}/${estate.images[0].path}` : "https://qph.cf2.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq"}
              />
          </div>
          {/* Middle */}
          <div className="flex flex-col w-full justify-between">
            <div className="font-semibold">
              [{estate.ID}] {estate.name}
            </div>
            <div className="flex gap-x-5 text-sm">
              <div className="">
                สถานะ: ว่าง
              </div>
              <div className="">
                {estate.province}
              </div>
            </div>

            <div className="">
              {estate.area} ตารางวา
            </div>
            <div className="">
              {estate.price} บาท{estate.salesType == "เช่า" ? "/เดือน" : ""}
            </div>
            <div className="">
              ส่วนลด 500 บาท
            </div>
          </div>
        </div>
      </Link>
    </div>

  );
}
