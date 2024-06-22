import { Navbar } from "@/components/navbar";

export function EstateInsertPage() {
    return (
        <div className="relative w-full flex max-h-screen flex-col">
            <Navbar></Navbar>
            <main className="container flex-1 gap-y-2 justify-center items-center p-2">
                <div className="flex w-full flex-row justify-around items-center">
                    <div className="text-2xl">ข้อมูลอสังหาริมทรัพย์</div>
                </div>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col">
                            <label>รหัสข้อมูลอสังหาริมทรัพย์</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="Estate ID" />
                        </div>
                        <div className="flex w-full flex-col">
                            <label>ชนิดอสังหาริมทรัพย์</label>
                            <select className="flex w-full bg-gray-200 rounded-md p-2" name="estateType" id="estateType">
                                <option value={"บ้าน"}>บ้าน</option>
                                <option value={"คอนโด"}>คอนโด</option>
                                <option value={"หอพัก"}>หอพัก</option>
                            </select>
                        </div>
                        <div className="flex w-full flex-col">
                            <label>ประเภทการขาย</label>
                            <select className="flex w-full bg-gray-200 rounded-md p-2" name="type" id="type">
                                <option value={"เช่า"}>เช่า</option>
                                <option value={"ขาย"}>ขาย</option>
                                {/* <option value={"เช่า/ขาย"}>เช่า/ขาย</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col w-full">
                            <label>พื้นที่ (ตารางวา)</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="number" placeholder="Area" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>ราคา</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ราคา" />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col w-full">
                            <label>ละติจูด</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="Latitude" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>ลองติจูด</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="Longitude" />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col w-full">
                            <label>ตำบล</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ตำบล" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>อำเภอ</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="อำเภอ" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>จังหวัด</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="จังหวัด" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>Description</label>
                        <textarea className="flex-1 h-full bg-gray-200 rounded-md p-2" placeholder="Description" />
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex w-full flex-col">
                            <label>ประกัน</label>
                            <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ประกัน" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>เจ้าของ</label>
                        <input className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="เจ้าของ" />
                    </div>
                    <div className="flex flex-col">
                        <label>รูปภาพ</label>
                        <input className="outline-none border-none bg-gray-200 rounded-md p-2" type="file"></input>
                    </div>
                    <div className="flex self-end gap-x-2">
                        <button
                            onClick={() => {
                                window.history.back();
                            }}
                            className="bg-red-500 text-white p-2 rounded-md"
                            type="button"
                        >
                            {"ย้อนกลับ"}
                        </button>
                        <button className="bg-green-400 rounded-md p-2 w-fit">บันทึก</button>
                    </div>

                </form>
            </main>
        </div>
    )
}