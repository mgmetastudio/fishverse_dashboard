import {useState, useEffect, useRef} from 'react';
import { useNFTActor } from './useActor';

let cache = null;

export function useTokenTypeData(){
    const fishverse_ext =  useNFTActor();
    const [tokenTypeData, setTokenTypeData] = useState({});

    useEffect(() => {
        if (fishverse_ext && Object.keys(tokenTypeData).length == 0) {
            if (cache){
                setTokenTypeData(cache);
            } else {                
                fishverse_ext.getTokenTypeData().then((result) => {     
                const tokenTypeDataDict = result.reduce((a, v) => ({ ...a, [v[0]]: v[1]}), {})  
                setTokenTypeData(tokenTypeDataDict);
                cache = tokenTypeDataDict;
                console.log("GOT RESULT !!! TOKEN TYPE DATA !!!", result)
              });   
            }   
        }
    }, []);

    return tokenTypeData;
}