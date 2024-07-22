import { Operation } from "@/types";

export function OwnerAppointmentCard({operation}:{operation:Operation}) {
    const date = new Date(operation.appointment.time).toLocaleString();
    return (
        <div className="flex flex-row gap-x-2 justify-between items-center">
            <div className="flex flex-col gap-y-2">
                <div>รหัสการนัดหมาย: {operation.ID}</div>
                <div>ประเภทอสังหาริมทรัพย์: {operation.estate.salesType}</div>
                <div>รหัสอสังหาริมทรัพย์: {operation.estate.ID}</div>
            </div>
            <div className="flex flex-col gap-y-2">
                <div>รหัสลูกค้า: {operation.user.ID}</div>
                <div>ชื่อ:{operation.user.name}</div>
                <div>เบอร์โทร: {operation.user.tel}</div>
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