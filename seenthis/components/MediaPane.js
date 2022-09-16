import React, {useCallback, useEffect, useState} from 'react';
import Image from "next/image";
import styles from "../styles/Home.module.css";

const MediaPane = ({image, title, description, on_hide}) => {
    const [scroll, setScroll] = useState(undefined);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollY !== scroll && scroll !== undefined)
                on_hide();
            setScroll(scrollY);
        };

        const escFunction = (event) => {
            if (event.key === "Escape") {
                on_hide();
            }
        };

        document.addEventListener("keydown", escFunction, false);
        window.addEventListener("scroll", handleScroll);

        // just trigger this so that the initial state
        // is updated as soon as the component is mounted
        // related: https://stackoverflow.com/a/63408216
        handleScroll();

        return () => {
            document.removeEventListener("keydown", escFunction, false);
            window.removeEventListener("scroll", handleScroll);
        };


    }, [on_hide]);

    return (
        <div className={styles.media_overlay}>
            <div className={styles.pane}>
                <div className={styles.overlay_image}>
                    <Image src={"http://localhost:8080/api/images/" + image} layout={"fill"} objectFit={"contain"}
                           alt={title}/>
                </div>
                <div className={styles.media_info}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <a className={styles.close} onClick={on_hide}/>
            </div>
        </div>
    );
};

export default MediaPane;
