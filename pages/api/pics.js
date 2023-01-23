import clientPromise from "../../lib/mongodb";

const getPics = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db('photo');

        const pics = await db
            .collection('url')
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        res.json(pics);
        return {
            props: { engage: JSON.parse(JSON.stringify(pics)) },
        };
    } catch (e) {
        console.error(e);
    }
};

export default getPics