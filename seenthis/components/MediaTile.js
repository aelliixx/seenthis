import React from 'react';
import styles from '../styles/MediaGrid.module.css'
import Image from "next/image";

const MediaTile = ({media, format, media_context}) => {
        const handleClick = async () => {
            media_context({id: media.id, format});
        }

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
