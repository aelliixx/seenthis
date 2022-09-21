import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styles from "../styles/Home.module.css";

const MediaPane = ({id, title, description, format, on_hide}) => {
    const [scroll, setScroll] = useState(undefined);
    const maxScrollBeforeHide = 400; // Let the user scroll a little before the pane is hidden.

    // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
    const keyStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    const triplet = (e1, e2, e3) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63)

    const rgbDataURL = (r, g, b) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${
            triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

    // Once component is mounted, run this...
    useEffect(() => {
        const handleScroll = () => {
            if (Math.abs(scrollY - scroll) > maxScrollBeforeHide && scroll !== undefined)
                on_hide();
        };

        const escFunction = (event) => {
            if (event.key === "Escape") {
                on_hide();
            }
        };

        document.addEventListener("keydown", escFunction, false);
        window.addEventListener("scroll", handleScroll);

        // Set initial scroll position on component mount.
        setScroll(scrollY);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
            window.removeEventListener("scroll", handleScroll);
        };


    }, [on_hide, scroll]);

    return (
        <>
            <article className={styles.media_overlay}>
                <div className={styles.pane}>
                    <div className={styles.overlay_image}>
                        {format === "image" ?
                            <Image src={"http://localhost:8080/api/images/" + id} // If image
                                   layout={"fill"}
                                   objectFit={"cover"}
                                   alt={title}
                                   placeholder="blur"
                                   blurDataURL={rgbDataURL(104, 104, 122)}/> // Placeholder while image is loading.
                            :
                            <video className={styles.overlay_image} // If video
                                   controls
                                   preload={"auto"}
                                   src={"http://localhost:8080/api/videos/" + id}
                                   autoPlay={true}
                                   id={"video-stream"}>
                                Sorry, your browser does not support embedded videos.
                            </video>
                        }
                    </div>
                    <section className={styles.media_info}>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </section>
                </div>
            </article>
            <a className={styles.close} onClick={on_hide}/>
        </>
    );
};

export default MediaPane;
