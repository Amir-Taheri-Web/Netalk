"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchThreads } from "@/actions/thread.action";
import ThreadCard from "./ThreadCard";
import Loader from "./Loader";

let skipAmount = 10;

const LoadMoreThreads = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemaining, setIsRemaining] = useState<boolean>(true);

  const fetchPosts = async () => {
    setIsLoading(true);

    const result = await fetchThreads(10, skipAmount);

    setThreads([...threads, ...JSON.parse(result as string).threads]);
    setIsRemaining(JSON.parse(result as string).isNext);

    skipAmount += 10;

    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && isRemaining) {
      fetchPosts();
    }
  }, [inView]);
  return (
    <>
      <ul className="max-w-[1000px] self-center w-full flex-1 flex flex-col gap-12">
        {!!!threads.length ? (
          <Loader />
        ) : (
          threads.map((item) => <ThreadCard key={item._id} thread={item} />)
        )}
      </ul>

      {isLoading && !!threads.length && <Loader />}
      <div ref={ref}></div>
    </>
  );
};

export default LoadMoreThreads;
