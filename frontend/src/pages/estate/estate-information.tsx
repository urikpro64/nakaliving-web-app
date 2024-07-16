
import { Link } from "react-router-dom";

export function EstateInformationPage() {
  return (
    <div className="relative w-full flex max-h-screen flex-col ">
      <main className="w-11/12 mx-auto  p-5">
        <div className="text-2xl font-bold">P001</div>
        <div className="flex gap-5 items-center justify-between">
          {/* Left */}
          <div className="space-y-3 w-1/3 self-start">
            <div>
              <img
                className="w-full h-60 object-cover"
                src="https://plus.unsplash.com/premium_photo-1713991088877-ec5df174a0f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <img
                className="w-full h-60 object-cover"
                src="https://images.unsplash.com/photo-1714284191598-a02b154e8dcd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </div>
          {/* Middle */}
          <div className="w-1/3 space-y-5 self-start ">
            <div>
              <div className="bg-neutral-200 p-3 border border-black shadow-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                modi dignissimos nesciunt illo cumque saepe dolorem unde nulla,
                ullam distinctio at harum, voluptatum accusamus dolores hic
                explicabo ab nihil! Nihil?
                <br />
                พื้นที่: 50 ตารางวา
                <br />
                ค่าเช่า: 12000 บาท/เดือน
                <br />
                สถานะ: ว่าง
                <br />
                จังหวัดข่อนแก่น
                <br />
                ส้วนลด 500 บาท
              </div>
            </div>
            <div>
              <img src="https://imgsrv2.voi.id/HpO09gZIQxpPSpVKdPkkZwaQELHpXUDAgoUw26q-tiA/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8xNTE4MjMvMjAyMjAzMzEwODA3LW1haW4uSlBH.jpg" />
            </div>
          </div>
          {/* Right */}
          <div className="w-1/3 self-start flex gap-5 flex-1">
            <Link to="/estate/1/appointment">
              <button className="bg-green-500 border text-xl border-black text-white p-2 rounded-md">
                นัดเข้าชม
              </button>
            </Link>
            <button
              onClick={() => {
                window.history.back();
              }}
              className="bg-red-500 border text-xl border-black text-white p-2   rounded-md "
            >
              {"<=="}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
