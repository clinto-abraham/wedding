import { useRouter } from "next/router"
import { useEffect, useState } from "react"
export default function NotFound() {
    const [pushURL, setPushURL] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => setPushURL(true), 3000)
        if (pushURL) {
            router.push('/')
        }
    }, [pushURL]);
    return (
        <>
            404 Not Found
        </>
    )
}