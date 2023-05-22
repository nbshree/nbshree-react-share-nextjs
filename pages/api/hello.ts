// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    name: string
    fetchData: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await fetch('https://dummyjson.com/post');

    res.status(200).json({name: 'John Doe', fetchData: (await response.json())})
}
