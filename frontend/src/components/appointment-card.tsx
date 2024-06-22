export function AppointmentCard() {
    const date = new Date().toLocaleString();
    return (
        <div className="flex flex-row gap-x-2 justify-between items-center">
            <div className="flex flex-col gap-y-2">
                <div>รหัสการนัดหมาย: N01</div>
                <div>รหัสประเภทอสังหาริมทรัพย์: N01</div>
                <div>รหัสอสังหาริมทรัพย์: N01</div>
            </div>
            <div className="flex flex-col gap-y-2">
                <div>รหัสลูกค้า: C0001</div>
                <div>ชื่อ: นายมะขาม มะยม</div>
                <div>เบอร์โทร: 0909999999</div>
            </div>
            <div className="flex flex-col gap-y-2">
                <div>สถานะ: รอการมอบหมาย</div>
                <div className="flex flex-row">
                    <div>นายหน้า:</div>
                    <select name="agent" id="agent">
                        <option value={"AG001"}>นายเอ</option>
                        <option value={"AG001"}>นายบี</option>
                        <option value={"AG001"}>นายซี</option>
                    </select>
                </div>
                <div>เวลา: {date}</div>
            </div>
            <button className="h-fit p-2 bg-gray-700 rounded-md shadow-md text-white">มอบหมาย</button>
        </div>
    )
}