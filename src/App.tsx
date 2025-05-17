import React,{useState,useEffect} from "react";
import Controls from "./Controls";
import './App.scss';
import ImageCat from "./ImageCat";
export function App() {

    const [enable, setEnable] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className={'app'}>
            <Controls enable={enable}
                      refresh={refresh}
                      onEnabled={() => setEnable(!enable)}
                      onRefresh={()=>setRefresh(!refresh)}
            ></Controls>
            <button disabled={!enable || loading} onClick={() => setLoading(!loading)}>Get cat</button>
            <ImageCat enabled={enable} refresh={refresh} loading={loading} onLoading={()=>setLoading(!loading)}/>
        </div>
    )
}