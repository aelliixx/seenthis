import '../styles/globals.css'
import {MediaProvider} from "../utils/MediaContext";

function MyApp({Component, pageProps}) {
    return (
        <MediaProvider>
            <Component {...pageProps} />
        </MediaProvider>
    );
}

export default MyApp
