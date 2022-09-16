import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MediaGrid from "../components/MediaGrid";
import {localFetch} from "../Utils/fetch";
import {useMedia} from "../lib/MediaContext";
import {useState} from "react";
import MediaPane from "../components/MediaPane";

export default function Home({apiResponse, images}) {

    const {media, setMedia} = useMedia();
    const [showMedia, setShowMedia] = useState(false);

    const hideMedia = () => {
        // noinspection JSIgnoredPromiseFromCall
        setMedia(undefined);
    }

    return (
        <div>
            <Head>
                <title>SeenThis Media</title>
                <meta name="description" content="SeenThis code challenge"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {apiResponse ? <main>
                    <h1 className={styles.title}>Your media gallery.</h1>
                    <MediaGrid grid_name="Photos" media={images} media_context={setMedia}/>
                </main> :
                <main>
                    <h1 className={styles.title}>API Error</h1>
                </main>}

            {media !== undefined ?
            <MediaPane image={media} title={images[media - 1].title} description={images[media - 1].description} on_hide={hideMedia}/> : <></>}


            <footer>
            </footer>
        </div>
    )
}

export async function getStaticProps(context) {
    const getApiHealth = async () => {
        try {
            const res = await localFetch.get("/health");
            if (res.data != null) {

                return res.data;
            }
        } catch (err) {
            console.log("ERROR: API is down");
            return null;
        }
    }

    const getImages = async () => {
        try {
            const res = await localFetch.get("/images");
            if (res.data != null) {
                return res.data;
            }
        } catch (err) {
            console.log("ERROR: API is down");
            return null;
        }
    }

    const apiResponse = await getApiHealth();

    if (!apiResponse) {
        return {
            props: {
                apiResponse: !!(await getApiHealth())
            },
            revalidate: 120,
        }
    } else {
        const images = await getImages();
        console.log(images);
        return {
            props: {
                apiResponse: !!apiResponse,
                images: images
            },
            revalidate: 120,
        }
    }
}
