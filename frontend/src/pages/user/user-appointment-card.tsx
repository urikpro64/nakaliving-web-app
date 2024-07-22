import { Operation } from "@/types";

export function UserAppointmentCard({operation}:{operation:Operation}) {
    const date = new Date(operation.appointment.time).toLocaleString();
    return (
        <div className="flex flex-row gap-x-2 justify-between items-center">
            <div className="flex flex-col gap-y-2">
                <div>รหัสการนัดหมาย: {operation.ID}</div>
                <div>ประเภทอสังหาริมทรัพย์: {operation.estate.salesType}</div>
                <div>รหัสอสังหาริมทรัพย์: {operation.estate.ID}</div>
            </div>
            <div className="flex flex-col gap-y-2">
                <div>รหัสนายหน้า: {operation.agent.ID ? operation.agent.ID : "-"}</div>
                <div>ชื่อ:{operation.agent.name ? operation.agent.name : "-"}</div>
                <div>เบอร์โทร: {operation.agent.tel ? operation.agent.tel : "-"}</div>
            </div>
            <div className="flex flex-col gap-y-2">
                <div>สถานะ: รอการมอบหมาย</div>
                <div>เวลา: {date}</div>
            </div>
        </div>
    )
}