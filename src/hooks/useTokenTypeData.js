import {useState, useEffect, useRef} from 'react';
import { getNFTActor } from '../functions/actor';

let cache = null;

export const useTokenTypeData = () => {
    const [tokenTypeData, setTokenTypeData] = useState({});
    const fishverse_ext =  getNFTActor();

    useEffect(() => {
        if (fishverse_ext && Object.keys(tokenTypeData).length == 0) {
            if (cache){
                setTokenTypeData(cache);
            } else {                
                fishverse_ext.getTokenTypeData().then((result) => {     
                const tokenTypeDataDict = result.reduce((a, v) => ({ ...a, [v[0]]: v[1]}), {})  
                setTokenTypeData(tokenTypeDataDict);
                cache = tokenTypeDataDict;
              });   
            }   
        }
    }, []);

    return tokenTypeData;
}