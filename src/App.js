import React from 'react'
import Search  from './Search'
import {useState,useRef,useCallback} from 'react';

function App() {
    const [query,setQuery]=useState('');
    const [pageNumber,setPage]=useState(1);
    const {loading,res,more,error}=Search(query,pageNumber);
    const ob=useRef();
    const last=useCallback(node=>{
        if(loading){
            return ;
        }
        if(ob.current){ob.current.disconnet()}
        ob.current=new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting&&more){
                setPage(prevPageNumber=>prevPageNumber+1)
            }
        })
        if(node){ob.current.ob(node)}
    },[loading,more])
  return(
    <div>
    <input onChange={(event)=>{setQuery(event.target.value);setPage(1);}} type="text" value={query} placeholder="Any Book"/>
    {
        res.map((book,index)=>{
            if(book.length===index+1){return <div ref={last} key={book}>{book}</div>}
            return <div key={book}>{book}</div>
        })
    }
    <div>{loading&&'loading..'}</div>
    <div>{error&&'error'}</div>
    </div>
  );
}

export default App;