import React from 'react';
import styles from '../styles/MediaGrid.module.css'

const MediaTile = ({media}) => {
    const maxDescriptionLength = 150;

    const truncateDescription = (str) => {
        return str.substring(0, maxDescriptionLength - 1) + '...';
    }

    const [readMore, setReadMore] = React.useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <h1 className={styles.cardTitle}>{media.title}</h1>
                    {/* Truncate the description if it exceeds max lenght and add read more or read less links
                    to expand the description*/}
                    {media.description.length > maxDescriptionLength && !readMore ? <>
                            <p>{truncateDescription(media.description)}</p>
                            <a onClick={() => setReadMore(true)}>{"Read More"}</a></>
                        : <><p>{media.description}</p>
                            {media.description.length > maxDescriptionLength ?
                                <a onClick={() => setReadMore(false)}>{"Read less"}</a> : <></>}</>}
                </div>
            </div>
        </div>
    );
};

export default MediaTile;
