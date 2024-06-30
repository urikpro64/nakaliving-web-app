import { AppointmentCard } from "@/components/appointment-card";


export function AppointmentPage() {
  return (
    <div className="relative w-full flex max-h-screen flex-col ">
      
      <main className="w-full flex flex-col">
        <div className="container space-y-5 divide-y p-3 overflow-auto ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-semibold">การนัดหมาย</h1>
            {/* <Link to={"/estate/insert"}>
              <button type="button" className="bg-green-400 rounded-md shadow-md p-2">เพิ่ม</button>
            </Link> */}
          </div>
          <AppointmentCard></AppointmentCard>
          <AppointmentCard></AppointmentCard>
        </div>
      </main>
    </div>
  );
}
