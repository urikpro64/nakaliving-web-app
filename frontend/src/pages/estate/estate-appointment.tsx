

export function EstateAppointmentPage() {
  //back to estate page

  return (
    <div className="relative w-full flex max-h-screen flex-col ">
      <main className="container mt-5">
        <div className="gap-5 flex flex-col">
          <div className="flex gap-3">
            <div className="text-xl font-bold">การนัดหมาย</div>
            <div className="grid grid-cols-2 gap-5 bg-neutral-200 p-5">
              <div>รหัสการนัดหมาย: N01</div>
              <div>รหัสประกาศขาย: P001</div>
              <div>รหัสประเภทอสังหาริมทรัพย์: A</div>
              <div>รหัสลูกค้า: C0001</div>
            </div>
          </div>
          <div className="space-x-3">
            <label htmlFor="" className="font-bold text-xl">
              ชื่อ-สกุล:
            </label>
            <input
              type="text"
              placeholder="ชื่อ-สกุล"
              className="border-2 border-black p-1"
            />
          </div>
          <div className="space-x-3">
            <label htmlFor="" className="font-bold text-xl">
              เบอร์โทร:
            </label>
            <input
              type="text"
              placeholder="เบอร์โทร"
              className="border-2 border-black p-1"
            />
          </div>
          <div className="space-x-3">
            <label htmlFor="" className="font-bold text-xl">
              วันที่:
            </label>
            <input type="date" className="border-2 border-black p-1" />
          </div>
          <div className="space-x-3">
            <label htmlFor="" className="font-bold text-xl">
              เวลา:
            </label>
            <input
              type="time"
              placeholder="เวลา"
              className="border-2 border-black p-1"
            />
          </div>
          <div className="self-end flex gap-5">
            <button className="bg-green-500 border text-xl border-black text-white p-2  rounded-md ">
              ยืนยันการนัด
            </button>
            <button
              onClick={() => {
                window.history.back();
              }}
              className="bg-red-500 border text-xl border-black text-white p-2  rounded-md"
            >
              {"<=="}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
