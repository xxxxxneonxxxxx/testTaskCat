import React,{useState,useEffect}from "react";
import styled from "styled-components";

type ImageCat = {
    enabled: boolean,
    refresh:boolean,
    loading: boolean,
    onLoading:()=>void,
}

const StyledImageCat = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    border: 1px #ccc solid;
`

export default function ImageCat({enabled, refresh, loading,onLoading}:ImageCat){

    const [imgCats,setImgCats] = useState<string[]>([]);
    const [newImgCats,setNewImgCats] = useState<string[]>([]);
    const [imgCat, setImgCat] = useState<string>('');
    const [index,setIndex]=useState<number>(0)
    const [load, setLoad] = useState<boolean>(true);

    useEffect( ()=>{
        async function loadCats(){
            try {
                const response=await fetch('https://api.thecatapi.com/v1/images/search?limit=6')
                const json = await response.json()
                setLoad(false)
                imgCats.length===0?setImgCats(json.map((cat:any)=>cat.url)):setNewImgCats(json.map((cat:any)=>cat.url))
                console.log(json)
            }catch (err){
                setLoad(true);
            }
        }
        if (load){
            loadCats()
        }
    },[load])

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>
        if(enabled && refresh){
            timer =setInterval(()=>{
                setIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % imgCats.length;
                    setImgCat(String(imgCats[nextIndex]));
                    return nextIndex;
                })
            },5000)
        }
        return () => {
            clearInterval(timer);
        }
    }, [enabled, refresh]);

    useEffect(()=>{
        function loadingCat(){
            setIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % imgCats.length;
                setImgCat(String(imgCats[nextIndex]));
                onLoading()
                console.log(nextIndex)
                return nextIndex;
            })
        }
        if (enabled && loading){
            loadingCat()
        }
    },[enabled,loading])

    useEffect(() => {
        if (newImgCats.length > 0 && index === imgCats.length-1) {
            setImgCats(newImgCats);
            setNewImgCats([]);
            setIndex(0);
            setImgCat(newImgCats[0] || '');
        }
        if (index>=7 && newImgCats.length===0){
            setLoad(true);
        }
    }, [index]);


    return (
        <StyledImageCat src={imgCat}/>
    )
};