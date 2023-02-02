import { registerPushURL, registerSeconds } from "@/redux/utilsSlice";
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';

export default function NotFound() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { seconds, pushURL } = useSelector(state => state.utils);

    useEffect(() => {
        const interval = setInterval(() => dispatch(registerSeconds(seconds - 1)), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const handleBack = () => {
        router.back()
    }

    useEffect(() => {
        if (pushURL) {
            router.push('/')
        }
        const pushInterval = setInterval(() => dispatch(registerPushURL(true)), 19000)
        return () => {
            clearInterval(pushInterval);
        };
    }, [pushURL]);
    return (
        <div className='404-not-found'>

            <header className="top-header">
            </header>

            {/* <!--dust particel--> */}
            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>
            {/* <!--Dust particle end---> */}


            <div className="lamp__wrap">
                <div className="lamp">
                    <div className="cable"></div>
                    <div className="cover"></div>
                    <div className="in-cover">
                        <div className="bulb"></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>
            {/* <!-- END Lamp --> */}
            <section className="error">
                {/* <!-- Content --> */}
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title">Page Not Found</h1>
                        <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Don't worry! sit back, we will take you back to homepage in {seconds} seconds.</p>
                    </div>
                    <div className="error__nav e-nav">
                        <Link href={''} onClick={() => handleBack()} className="e-nav__link" />
                    </div>
                </div>
                {/* <!-- END Content --> */}

            </section>

        </div>
    )
}