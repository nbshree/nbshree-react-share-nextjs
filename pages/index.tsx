import React, {useId, useState} from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

const id = Math.random();

const Test = ({data, dt}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log("data", data)
    const myUseId = useId()
    const myUseId2 = useId()
    console.log("myUseId2", myUseId2)
    console.log("myUseId", myUseId)
    console.log("id", id)
    const [value, setValue] = useState<string>();
    return <div>
        <div>{dt}</div>
        {data?.name}
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        <div>
            <label htmlFor={id + '-firstName'}>First Name</label>
            <div>
                <input id={id + '-firstName'} type="text"/>
            </div>
            <label htmlFor={myUseId + '-firstName'}>First Name</label>
            <div>
                <input id={myUseId + '-firstName'} type="text"/>
            </div>
            <label htmlFor={myUseId2 + '-lastName'}>Last Name</label>
            <div>
                <input id={myUseId2 + '-lastName'} type="text"/>
            </div>
        </div>

    </div>
};


export const getServerSideProps: GetServerSideProps<{
    data: { name: string };
    dt: string;
}> = async ({req}) => {
    const {host} = req.headers;
    const currentDomain = `http://${host}`;
    console.log("host", host)
    console.log("currentDomain", currentDomain);
    const dt = new Date().toString()
    const res = await fetch(`${currentDomain}/api/hello`);
    const data = await res.json();
    return {props: {data, dt}};
};

export default Test;