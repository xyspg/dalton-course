import React from 'react';
import client from "@/lib/client";
import classNames from "classnames";
import {clsx} from "clsx";
import ELPTable from "@/app/elp/ELPTable";
import {notFound} from "next/navigation";

const Page = async () => {
    const list = await getData()
    return (
        <>
            <ELPTable list={list} />
        </>
    );
};

const getData = async () => {
    const query = `*[_type == "ELP"]`
    return await client.fetch(query)
}

export default Page;