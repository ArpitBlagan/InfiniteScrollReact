import axios from 'axios';
import { useEffect,useState} from 'react';
//Cancel to call one api request even query is changing...
function Search(query,pageNumber){
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
    const[res,setRes]=useState([]);
    const[more,setMore]=useState(false);
    useEffect(()=>{setRes([])},[query])
    useEffect(()=>{
        setLoading(true);
        setError(false);
        let cancel;
        axios({method:'GET',url:'http://openlibrary.org/search.json',
        params:{
            q:query,page:pageNumber
        },cancelToken:new axios.CancelToken((c)=>{cancel=c})
        }).then(res=>{setRes(prevRes=>{
            return[...prevRes,
            ...res.data.docs.map(b=>b.title)
            ]})
            setMore(res.data.docs.length>0);
            setLoading(false);}
            ).catch(e=>{
            if(axios.isCancel(e))return
            setError(true);
        })
    },[query,pageNumber]);
    return {loading,res,more,error};
} 
export default Search;