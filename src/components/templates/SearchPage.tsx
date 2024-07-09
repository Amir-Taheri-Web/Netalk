/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fetchUsers, getUser } from "@/actions/user.action";
import searchIcon from "@/public/assets/search.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Users from "@/modules/Users";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsers(searchString);
      const finalData = JSON.parse(data as string);
      setUsers(finalData);
    } catch (error: any) {
      toast.error("Something went wrong. Try again");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const searchHandler = async (e: any) => {
    e.preventDefault();

    getUsers();
  };

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
      <h2 className="main-title">Search Users</h2>

      <div className="flex flex-col gap-12">
        <form
          onSubmit={searchHandler}
          autoComplete="off"
          className="flex flex-row-reverse gap-4 bg-dark-3 p-2 rounded-lg"
        >
          <input
            type="text"
            className="bg-dark-3 flex-1 p-2 outline-none"
            name="searchString"
            value={searchString}
            placeholder="Search users..."
            onChange={(e) => setSearchString(e.target.value)}
          />

          <button type="submit">
            <Image src={searchIcon} alt="search icon" width={25} height={25} />
          </button>
        </form>

        <div>
          <Users users={users} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
