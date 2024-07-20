
import { Estate } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;
const MAP_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export function EstateInformationPage() {
  const { estateID } = useParams();
  const [estate, setEstate] = useState<Estate>();

  useEffect(() => {
    fetch(`${BASE_URL}/estate/${estateID}`, {
      method: "GET"
    }).then(response => response.json())
      .then(response => setEstate(response.data.estate))
  }, [estateID])

  if (!estate) {
    return (
      <div className="relative flex flex-col w-full h-screen max-h-screen ">
        <main className="container flex h-full items-center justify-center">
          <RefreshCcw className="animate-spin"></RefreshCcw>
        </main>
      </div>
    )
  }

  return (
    <div className="relative w-full flex max-h-screen flex-col ">
      <main className="container flex flex-col p-2">
        <div className="text-2xl font-bold p-2">[{estate.ID}] {estate.name}</div>
        <div className="flex flex-col w-full items-center justify-between">
          {/* Main */}
          <div className="flex flex-row w-full gap-x-5">
            <div className="flex flex-1">
              <img
                className="w-full object-cover"
                src={estate.images ? `${BASE_URL}/${estate.images[0].path}` : ``}
              />
            </div>
            <div className="flex flex-col h-full gap-y-2">
              <div className="flex flex-col h-fit p-3 gap-y-2 divide-y divide-gray-400 bg-gray-200 rounded-md text-lg">
                <div>พื้นที่: {estate.area} ตารางวา</div>
                <div>ค่าเช่า: {estate.price} {estate.salesType == "เช่า" ? "บาท/เดือน" : "บาท"}</div>
                <div>จังหวัด: {estate.province}</div>
                <div>อำเภอ: {estate.district}</div>
                <div>ตำบล: {estate.subdistrict}</div>
                <div>สัญญา: {estate.insurance}</div>
              </div>
              <div className="flex flex-1 h-full">
                <iframe
                  className="h-full"
                  src={`https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}
                    &q=${estate.latitude} ${estate.longitude}
                    &language=th
                  `}
                />
              </div>
              <button type="button" className="w-full p-2 bg-green-500 rounded-md text-2xl text-white">นัดหมาย</button>
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-col mt-5 self-start">
            <div className="text-2xl font-semibold self-start">คำอธิบาย</div>
            {estate.description}
          </div>
        </div>
      </main>
    </div>
  );
}
