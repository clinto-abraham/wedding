import connectMongo from '../../db/connections'
import { getMarriageFiles, postMarriageFiles } from '../../db/controller';

export default async function apiEngageHandler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection" }))
    // type of request
    const { method } = req

    switch (method) {
        case 'GET':
            getMarriageFiles(req, res)
            break;
        case 'POST':
            postMarriageFiles(req, res)
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
