import React from 'react';
import styles from "../styles/MediaGrid.module.css"
import MediaTile from "./MediaTile";

const MediaGrid = ({grid_name, media}) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{grid_name}</h2>
            <div className={styles.grid}>
                {media.map((media, index) => <MediaTile media={media} key={index}/>)}
            </div>
        </div>
    );
};

export default MediaGrid;
