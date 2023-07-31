import React from 'react';
import {HashLoader} from "react-spinners";

const Loading = () => {
    return (
        <>
            <div className="h-[80vh] flex justify-center items-center flex-col gap-8">
                <HashLoader />
                <p className="text-neutral-700 capitalize text-xl">Loading...</p>{" "}
            </div>
        </>
    );
};

export default Loading;
