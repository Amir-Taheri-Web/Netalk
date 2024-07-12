/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import searchIcon from "@/public/assets/search.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchCommunities } from "@/actions/community.action";
import CommunitiesList from "@/modules/CommunitiesList";

const CommunitiesPage = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCommunities = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCommunities(searchString);
      const finalData = JSON.parse(data as string);
      setCommunities(finalData);
    } catch (error: any) {
      toast.error("Something went wrong. Try again");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);

  const searchHandler = async (e: any) => {
    e.preventDefault();

    getCommunities();
  };

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
      <h2 className="main-title">Communities</h2>

      <div className="flex flex-col gap-12 max-sm:gap-8">
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
            placeholder="Search communities..."
            onChange={(e) => setSearchString(e.target.value)}
          />

          <button type="submit">
            <Image src={searchIcon} alt="search icon" width={25} height={25} />
          </button>
        </form>

        <div>
          <CommunitiesList communities={communities} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage;
