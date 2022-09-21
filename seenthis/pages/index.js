import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MediaGrid from "../components/MediaGrid";
import {useMedia} from "../utils/MediaContext";
import MediaPane from "../components/MediaPane";
import {API} from "../utils/API";
import Link from "next/link";

export default function Home({apiResponse, images, videos}) {

    const {media, setMedia} = useMedia(); // Use React context to store media state and set it on other components.

    const hideMedia = () => {
        // noinspection JSIgnoredPromiseFromCall
        setMedia(undefined);
    }

    return (
        <div>
            <Head>
                <title>SeenThis Media</title>
                <meta name="description" content="SeenThis code challenge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {apiResponse ?
                <main> {/* If API is alive */}
                    <h1 className={styles.title}>Your media gallery.</h1>
                    <MediaGrid grid_name="Photos" media={images} format={"image"} media_context={setMedia}/>
                    <MediaGrid grid_name="Videos" media={videos} format={"video"} media_context={setMedia}/>
                </main>
                :
                <main> {/* If API is unresponsive */}
                    <h1 className={styles.title}>API Error</h1>
                </main>}

            {media !== undefined ?
                media.format === "image" ?
                    <MediaPane id={media.id} title={images[media.id - 1].title} format={"image"}
                               description={images[media.id - 1].description} on_hide={hideMedia}/> // If image
                    :
                    <MediaPane id={media.id} title={videos[media.id - 1].title} format={"video"}
                               description={videos[media.id - 1].description} on_hide={hideMedia}/> // If video
                :
                <></> // If no media is selected, do not render the media pane.
            }


            <footer>
                <h4>Created by Donatas Mockus as part of SeenThis code challenge</h4>
                <Link  href={"https://github.com/aelliixx"}>Github</Link>
                <span> | </span>
                <Link href={"https://github.com/aelliixx/seenthis"}>This Repo</Link>

            </footer>
        </div>
    )
}

export async function getStaticProps(context) {
    const getApiHealth = async () => {
        try {
            const res = await API.get("/health");
            if (res.data != null) {

                return res.data;
            }
        } catch (err) {
            console.log("ERROR: API is down" + err);
            return null;
        }
    }

    const getImages = async () => {
        try {
            const res = await API.get("/images");
            if (res.data != null) {
                return res.data;
            }
        } catch (err) {
            console.log("ERROR: /images endpoint is down");
            return null;
        }
    }

    const getVideos = async () => {
        try {
            const res = await API.get("/videos");
            if (res.data != null) {
                return res.data;
            }
        } catch (err) {
            console.log("ERROR: /videos endpoint is down");
            return null;
        }
    }

    const apiResponse = await getApiHealth();

    if (!apiResponse) {
        return {
            props: {
                apiResponse: false
            },
            revalidate: 120,
        }
    } else {
        const images = await getImages();
        const videos = await getVideos();
        return {
            props: {
                apiResponse: true,
                images,
                videos
            },
            revalidate: 120,
        }
    }
}
