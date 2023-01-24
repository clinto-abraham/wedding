import clientPromise from "../lib/mongodb";

export default function Marriage({ marry }) {
    return (
        <div>
            <h1>Top 20 Marriage photos</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {marry.map((pic, index) => (
                    <li key={index}>
                        <h2>{pic.link}</h2>
                        <img alt='test' src={pic.link} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db('photo');

        const pics = await db
            .collection('url')
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        return {
            props: { marry: JSON.parse(JSON.stringify(pics)) },
        };
    } catch (e) {
        console.error(e);
    }
};