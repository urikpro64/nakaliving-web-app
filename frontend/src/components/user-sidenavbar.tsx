import { BookUser, Home, LogOutIcon, User } from "lucide-react"
import { Link } from "react-router-dom"

export function UserSideNavBar() {
    return (
        <nav className="px-4 py-4 shadow-2xl">
            <div className="flex flex-col w-full h-full justify-between text-nowrap font-semibold gap-y-2 divide-y divide-gray-400">
                <div className="flex flex-row items-center gap-x-2">
                    <div className="bg-blue-600 text-white p-2 rounded-md">
                        <Home />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg">User</div>
                        <div className="text-xs font-normal">นายเอ สกุลบี</div>
                    </div>
                </div>
                <div className="flex flex-col h-full pt-4 gap-y-4 text-neutral-700 font-medium text-sm">
                    <div className="flex flex-row w-full gap-x-2 items-center">
                        <User />
                        <Link to="/user/C000001">
                            <div>ข้อมูลผู้ใช้</div>
                        </Link>
                    </div>
                    <div className="flex flex-row w-full gap-x-2 items-center">
                        <BookUser />
                        <Link to="/user/C000001/appointment">
                            <div>นัดหมาย</div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col pt-2">
                    <div className="flex flex-row w-full gap-x-2 items-center p-2 bg-red-500 text-white rounded-md shadow-md drop-shadow-md">
                        <LogOutIcon />
                        <div>ออกจากระบบ</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}