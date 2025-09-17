"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { HashLoader } from "react-spinners";

export const ReportView: React.FC<{ id: string }> = ({ id }) => {
  useEffect(() => {
    fetch("/api/incr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  }, [id]);

  return null;
};

export const GetView: React.FC<{ id: string }> = ({ id }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<{ views: number }>(
    `/api/views?id=${id}`,
    fetcher
  );
  // const views = data?.views;
  const views = 0;
  return (
      <div className=" text-neutral-700 ">
        {views} Views
      </div>
  );
};
