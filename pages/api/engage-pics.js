import clientPromise from '@/lib/mongodb';
import connectMongo from '../../db/connections'
import { getEngageFiles, postEngageFiles, } from '../../db/controller';

export default async function apiEngageHandler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the connectMongo.js" }))
    clientPromise().catch(() => res.status(405).json({ error: "Error in the clientPromise" }))
    console.log(req, req.body, res);
    // type of request
    const { method } = req

    switch (method) {
        case 'GET':
            getEngageFiles(req, res)
            break;
        case 'POST':
            postEngageFiles(req, res)
            break;
        case 'DELETE':
            res.status(200).json({ method, name: 'DELETE Request' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowd`)
            break;
    }
}
