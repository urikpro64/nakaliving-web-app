import { Link } from "react-router-dom";

export function EstateCard() {
  return (
    <div className="flex flex-col w-fit gap-2 items-center justify-between hover:bg-neutral-300 transition-all duration-300">
      <Link to={"/estate/1"}>
        <div className="flex flex-1 flex-row space-x-2">
          {/* Left */}
          <div className="flex w-1/3 h-full self-center">
              <img
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1713991088877-ec5df174a0f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
          </div>
          {/* Middle */}
          <div className="flex flex-col w-full justify-between">
            <div className="font-semibold">
              [P001] Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit modi
              dignissimos nesciunt illo cumque saepe dolorem unde nulla, ullam
              distinctio at harum, voluptatum accusamus dolores hic explicabo ab
              nihil! Nihil?
            </div>
            <div className="flex gap-x-5 text-sm">
              <div className="">
                สถานะ: ว่าง
              </div>
              <div className="">
                จังหวัดข่อนแก่น
              </div>
            </div>

            <div className="">
              50 ตารางวา
            </div>
            <div className="">
              12000 บาท/เดือน
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
