import '../styles/globals.css'
import {MediaProvider} from "../lib/MediaContext";

function MyApp({Component, pageProps}) {
    return (
        <MediaProvider>
            <Component {...pageProps} />
        </MediaProvider>
    );
}

export default MyApp
