import { useState } from "react";
import { useForm } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_API_URL

type FormData = {
    Name: string,
    Description: string,
    EstateType: string,
    SalesType: string,
    Area: number,
    Price: number,
    Latitude: string,
    Longitude: string,
    Subdistrict: string,
    District: string,
    Province: string,
    Insurance: string,
    Owner: string,
    Images: File
}

export function EstateInsertPage() {
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [imageFile, setImageFile] = useState<File>()
    const {
        setValue,
        register,
        handleSubmit,
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async (data) => {
        setAlertMessage("");
        console.log(data)
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);
        formData.append("EstateType", data.EstateType);
        formData.append("SalesType", data.SalesType);
        formData.append("Area", data.Area.toString());
        formData.append("Price", data.Price.toString());
        formData.append("Latitude", data.Latitude);
        formData.append("Longitude", data.Longitude);
        formData.append("Subdistrict", data.Subdistrict);
        formData.append("District", data.District);
        formData.append("Province", data.Province);
        formData.append("Insurance", data.Insurance);
        formData.append("Owner", data.Owner);

        if (imageFile) {
            console.log(imageFile.name)
            formData.append("Images", imageFile);
        }

        const result = await fetch(`${BASE_URL}/estate`, {
            method: "POST",
            credentials: "include",
            body: formData
        }).then(response => response.json())
        if (result.success) {
            return
        }
        setAlertMessage("Something went wrong");
    })
    return (
        <div className="relative w-full flex max-h-screen flex-col">
            <main className="container flex-1 gap-y-2 justify-center items-center p-2">
                <div className="flex w-full flex-row justify-around items-center">
                    <div className="text-2xl">ข้อมูลอสังหาริมทรัพย์</div>
                </div>
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <label>ชื่อ</label>
                        <input {...register("Name", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ชื่อ" />
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex w-full flex-col">
                            <label>ชนิดอสังหาริมทรัพย์</label>
                            <select {...register("EstateType", { required:true})} onChange={(e) => setValue("EstateType",e.currentTarget.value)} className="flex w-full bg-gray-200 rounded-md p-2" name="estateType" id="estateType">
                                <option value="บ้าน">บ้าน</option>
                                <option value="คอนโด">คอนโด</option>
                                <option value="หอพัก">หอพัก</option>
                            </select>
                        </div>
                        <div className="flex w-full flex-col">
                            <label>ประเภทการขาย</label>
                            <select {...register("SalesType", { required: true })} onChange={(e) => setValue("SalesType",e.currentTarget.value)} className="flex w-full bg-gray-200 rounded-md p-2" name="type" id="type">
                                <option value="เช่า">เช่า</option>
                                <option value="ขาย">ขาย</option>
                                {/* <option value={"เช่า/ขาย"}>เช่า/ขาย</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col w-full">
                            <label>พื้นที่ (ตารางวา)</label>
                            <input {...register("Area", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="number" placeholder="Area" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>ราคา</label>
                            <input {...register("Price", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ราคา" />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col w-full">
                            <label>ละติจูด</label>
                            <input {...register("Latitude", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="Latitude" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>ลองติจูด</label>
                            <input {...register("Longitude", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="Longitude" />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex flex-col w-full">
                            <label>ตำบล</label>
                            <input {...register("Subdistrict", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ตำบล" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>อำเภอ</label>
                            <input {...register("District", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="อำเภอ" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>จังหวัด</label>
                            <input {...register("Province", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="จังหวัด" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>คำอธิบาย</label>
                        <textarea {...register("Description", { required: true })} className="flex-1 h-full bg-gray-200 rounded-md p-2" placeholder="Description" />
                    </div>
                    <div className="flex flex-1 gap-2">
                        <div className="flex w-full flex-col">
                            <label>ประกัน</label>
                            <input {...register("Insurance", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="ประกัน" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>เจ้าของ</label>
                        <input {...register("Owner", { required: true })} className="flex bg-gray-200 rounded-md p-2" type="text" placeholder="เจ้าของ" />
                    </div>
                    <div className="flex flex-col">
                        <label>รูปภาพ</label>
                        <input onChange={(e) => setImageFile(e.currentTarget.files?.[0])} className="outline-none border-none bg-gray-200 rounded-md p-2" type="file"></input>
                    </div>
                    <div>{alertMessage}</div>
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
                        <button className="bg-green-400 rounded-md p-2 w-fit" type="submit">บันทึก</button>
                    </div>

                </form>
            </main>
        </div>
    )
}