/* eslint-disable @typescript-eslint/no-explicit-any */
import { userType } from "@/types/userMgmtDataTypes";
import UserTableRow from "./UserTableRow";
import {
  DEPARTMENT,
  DESIGNATION,
  EMAIL_ID,
  FIRST_NAME,
  GENDER,
  LAST_NAME,
  SNO,
} from "@/utils/AppConstants";
import { MdChevronRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface UserTableInterface {
  users: userType[];
}
function UserTable({ users }: UserTableInterface) {
  const [usersData, setUsersData] = useState<userType[] | undefined>(undefined);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [searchedValue, setSearchedValue] = useState<string>("");

  useEffect(() => {
    setUsersData(users ?? []);
  }, [users]);

  function handleSearchChange(e: any) {
    const value = e?.target?.value;
    setSearchedValue(value);
    if (usersData && value !== "") {
      const temp = [];
      for (let index = 0; index < users?.length; index++) {
        if (
          users[index]?.firstName.toLowerCase().includes(value.toLowerCase()) ||
          users[index]?.lastName.toLowerCase().includes(value.toLowerCase()) ||
          users[index]?.emailId.toLowerCase().includes(value.toLowerCase())
        ) {
          temp.push(users[index]);
        }
      }

      setUsersData(temp);
    } else {
      setUsersData(users);
    }
    setFrom(0);
    setTo(5);
  }

  function handlePrevClick() {
    if (from > 0) {
      setFrom(from - 5);
      setTo(to - 5);
    }
  }
  function handleNextClick() {
    if (to < users?.length) {
      setFrom(from + 5);
      setTo(to + 5);
    }
  }
  function handleClearSearchClick() {
    setSearchedValue("");
    setUsersData(users)
  }

  return (
    <div>
      <div className="flex justify-between gap-6 items-center">
        <div className="relative">
          <Input
            className="w-[20vw]"
            about="Search By Name OR Email Id"
            icon="search"
            value={searchedValue}
            onChange={handleSearchChange}
          />
          <X
            className="absolute w-4 h-4  top-3 right-5 cursor-pointer"
            onClick={handleClearSearchClick}
          />
        </div>
        <div className="flex  gap-4 ">
          <div className="text-nowrap">{`Page ${to / 5} of ${Math.ceil(
            (usersData ? (usersData?.length as never) : 5) / 5
          )}  `}</div>
          <div className="flex gap-3 items-center mr-4">
            <div
              onClick={handlePrevClick}
              className="rounded-md bg-purple-700 text-background cursor-pointer"
            >
              <MdKeyboardArrowLeft className="w-6 h-6" />
            </div>
            <div
              onClick={handleNextClick}
              className="rounded-md bg-purple-700 text-background cursor-pointer"
            >
              <MdChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <UserTableRow
          className="font-semibold"
          c1={SNO}
          c2={EMAIL_ID}
          c3={FIRST_NAME}
          c4={LAST_NAME}
          c5={GENDER}
          c6={DESIGNATION}
          c7={DEPARTMENT}
        />
        {usersData?.slice(from, to)?.map((user: userType, index) => (
          <UserTableRow
            key={index}
            c1={index + 1 + from}
            c2={user?.emailId}
            c3={user?.firstName}
            c4={user?.lastName}
            c5={user?.gender}
            c6={user?.designation}
            c7={user?.department}
          />
        ))}
        {(!users || usersData?.length === 0 || !usersData) && (
          <div className="w-full flex items-center justify-center py-8 border ">
            No Results!
          </div>
        )}
      </div>
    </div>
  );
}
export default UserTable;
