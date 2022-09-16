import React from 'react';
import styles from '../styles/MediaGrid.module.css'
import Image from "next/image";
import {localFetch} from "../Utils/fetch";

const MediaTile = ({media, media_context}) => {
        const maxDescriptionLength = 150;

        const truncateDescription = (str) => {
            return str.substring(0, maxDescriptionLength - 1) + '...';
        }

        // on click
        const handleClick = async () => {
            media_context(media.id);
        }

        const [readMore, setReadMore] = React.useState(false);

        return (
            <div className={styles.card}>
                <Image className={styles.image} src={"http://localhost:8080/thumbnails/" + media.thumbnail}
                       layout="fill" alt={media.title}/>
                <div className={styles.infoWrapper} onClick={handleClick}>
                    <div className={styles.info}>
                        <h1>{media.title}</h1>
                        <p>{media.description}</p>

                    </div>
                </div>
            </div>
        );
    }
;

export default MediaTile;
