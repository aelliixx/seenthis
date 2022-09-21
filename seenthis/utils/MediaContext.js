import React, {useContext, useState} from 'react';

export const MediaContext = React.createContext({
    media: undefined,
    setMedia: async (media) => null
})

export const useMedia = () => useContext(MediaContext);

export const MediaProvider = ({children}) => {

    const [media, setMedia] = useState(undefined);

    return <MediaContext.Provider value={{media, setMedia}}>{children}</MediaContext.Provider>
};
