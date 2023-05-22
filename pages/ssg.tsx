import React, {useState} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from "next";

type DataType = {
    title: string;
};

const Ssg = ({data, dt}: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log("data", data)
    const [value, setValue] = useState<string>();
    return <div>
        <div>{dt}</div>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        {(data || []).slice(0, 2).map((item, index) => {
            return <div key={index}>{item.title}</div>
        })}
    </div>
};


export const getStaticProps: GetStaticProps<{
    data: DataType[];
    dt: string;
}> = async () => {
    const dt = new Date().toString()
    const res = await fetch('https://dummyjson.com/post');
    const data = await res.json();
    return {props: {data: data.posts, dt}};
};

export default Ssg;