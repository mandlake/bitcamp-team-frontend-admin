"use client";

import { ILawyer } from "@/components/_model/lawyer/lawyer";
import { findAll } from "@/components/_service/admin/admin.service";
import { getAllLawyer } from "@/components/_service/lawyer/lawyer.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ManagementLawyerPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [lawyer, setLawyer] = useState<ILawyer[]>([
    {
      id: 0,
      email: "1234@naver.com",
      password: "123456779",
      name: "lwamae",
      phone: "010-2345-6789",
      birth: "2000-03-03",
      lawyerNo: "11982748",
      account: "0000000000000",
      mid: "9188219",
      auth: false,
      createdDate: "2022-01-01",
      modifiedDate: "2022-01-01",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const lawyerPerPage = 10;

  const getNotifications = async (page: any) => {
    try {
      const response = await dispatch(getAllLawyer());
      console.log(response);
      setLawyer(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    try {
      setIsChecked(!isChecked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (id: any) => {
    console.log("id : ", id);
    // const updatedLawyer = { ...lawyer[id], auth: !lawyer[id].auth };
    // dispatch(updateLawyer(updatedLawyer));
    // setIsChecked(!isChecked); // Update checkbox state immediately
    try {
      // await dispatch(enableAdminById(id)).then(() => {
      //   window.location.reload();
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("notification board page");
    getNotifications(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(lawyer.length / lawyerPerPage);
  return (
    <>
      <div className="flex flex-col items-center pt-32">
        <h1 className="text-3xl">변호사 관리</h1>
        <div className="flex flex-row items-center justify-between w-full mt-10">
          <div className="w-40 flex flex-row items-center gap-5"></div>
          <div className="w-7/12 h-7 border border-black flex flex-row justify-between">
            <input className="w-80 focus:outline-none" />
            <Image
              width={25}
              height={25}
              src={
                "https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000"
              }
              style={{ width: 25, height: 25 }}
              alt={"find"}
            />
          </div>
          <div className="w-40 flex flex-row items-center gap-5">
            <p className="text-lg">auth enabled</p>
            <input
              type="checkbox"
              checked={!isChecked}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col pt-10">
            <div className="flex flex-row gap-2 items-baseline border-b-2 border-black px-2 py-1 text-center">
              <div className="w-16">NO.</div>
              <div className="w-32">이메일</div>
              <div className="w-32">이름</div>
              <div className="w-32">전화번호</div>
              <div className="w-32">생일</div>
              <div className="w-24">변호사번호</div>
              <div className="w-32">계좌번호</div>
              <div className="w-24">가맹점번호</div>
              <div className="w-24">auth</div>
              <div className="w-32">createdDate</div>
              <div className="w-32">modifiedDate</div>
            </div>
            {lawyer?.map((item, key) => (
              <div
                key={key}
                className="flex flex-col border-b border-black/30 group"
              >
                <div className="flex flex-row gap-2 px-2 py-1 text-center">
                  <div className="w-16 px-1">{key + 1}</div>
                  <div className="w-32 px-2 text-left truncate">
                    {item.email}
                  </div>
                  <div className="w-32 px-1">{item.name}</div>
                  <div className="w-32 px-1">{item.phone}</div>
                  <div className="w-32 px-1">{item.birth}</div>
                  <div className="w-24 px-1">{item.lawyerNo}</div>
                  <div className="w-32 px-1">{item.account}</div>
                  <div className="w-24 px-1">{item.mid}</div>
                  <div className="w-24 px-1 flex items-center justify-center">
                    <div className="w-16 px-1">
                      <input
                        type="checkbox"
                        checked={item.auth}
                        onChange={(e: any) => handleCheck(item.auth)}
                      />
                    </div>
                  </div>
                  <div className="w-32 px-1">{item.createdDate}</div>
                  <div className="w-32 px-1">{item.modifiedDate}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center pt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 border border-gray-300 rounded"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 mx-1 ${
                  currentPage === i + 1 ? "text-black" : "text-gray-300"
                } rounded`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 border border-gray-300 rounded"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementLawyerPage;
