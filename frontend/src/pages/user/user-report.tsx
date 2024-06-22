import { Navbar } from "@/components/navbar";
import { UserSideNavBar } from "@/components/user-sidenavbar";

export function UserReportPage() {
    const date = new Date();
    return (
        <div className="relative w-full h-screen flex max-h-screen flex-col ">
            <Navbar />
            <main className="flex flex-row h-full">
                <UserSideNavBar />
                <div className="container space-y-5 divide-y p-3 overflow-auto ">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">รายงาน</h1>
                    </div>
                    <div className="flex flex-col divide-y">
                        <div className="flex flex-row w-full items-center py-2">
                            <div className="w-full text-center">ประเถท</div>
                            <div className="w-full text-center">ประเภทการขาย</div>
                            <div className="w-full text-center">รหัสอสังหาริมทรัพย์</div>
                            <div className="w-full text-center">ราคาขาย</div>
                            <div className="w-full text-center">จำนวนเงินมัดจำ</div>
                            <div className="w-full text-center">ชื่อลูกค้า</div>
                            <div className="w-full text-center">ชื่อผู้ใช้ระบบ</div>
                            <div className="w-full text-center">วันที่มัดจำ</div>
                        </div>
                        <div className="flex flex-row w-full items-center justify-around">
                            <div className="w-full text-center">บ้าน</div>
                            <div className="w-full text-center">เช่า</div>
                            <div className="w-full text-center">E01</div>
                            <div className="w-full text-center">12000</div>
                            <div className="w-full text-center">36000</div>
                            <div className="w-full text-center">นายซี สกุลดี</div>
                            <div className="w-full text-center">นายเอ สกุลบี</div>
                            <div className="w-full text-center">{date.toLocaleDateString()}</div>
                        </div>
                        <div className="flex flex-row w-full items-center justify-around">
                            <div className="w-full text-center">บ้าน</div>
                            <div className="w-full text-center">ขาย</div>
                            <div className="w-full text-center">E02</div>
                            <div className="w-full text-center">1200000</div>
                            <div className="w-full text-center">360000</div>
                            <div className="w-full text-center">นายซี สกุลดี</div>
                            <div className="w-full text-center">นายเอ สกุลบี</div>
                            <div className="w-full text-center">{date.toLocaleDateString()}</div>
                        </div>
                        <div className="flex flex-row w-full items-center justify-around">
                            <div className="w-full text-center">หอพัก</div>
                            <div className="w-full text-center">เช่า</div>
                            <div className="w-full text-center">E03</div>
                            <div className="w-full text-center">10000</div>
                            <div className="w-full text-center">30000</div>
                            <div className="w-full text-center">นายซี สกุลดี</div>
                            <div className="w-full text-center">นายเอ สกุลบี</div>
                            <div className="w-full text-center">{date.toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}