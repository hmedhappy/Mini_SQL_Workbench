import React, { useEffect, useState } from 'react'
import CancelIcon from '@material-ui/icons/Cancel';


export default function AddContent({open,setopen,table,Current,setrefresh,refresh}) {
    return (
        <div className="addmodal"  style={open? {zIndex:"20",marginTop: '-138px'}:{marginTop: '-138px'}}>
        <form className={open ?'opened':'closed'}>
            <CancelIcon  onClick={()=>(setopen(false),setrefresh(!refresh))} style={{ cursor:"pointer",position: 'absolute',top: '5%',right:"3%"}}/>
            <h4> Table {table} </h4>
       
            {Current?.map((element,index)=>
            <div key={index} style={{display:"flex",margin: '5px',alignItems: 'baseline'}}>
                <h5 style={{margin:'5px'}}>{element.COLUMN_NAME}</h5>
                <input style={{flex:"1"}} name="text" type="text"  />
            </div>
            )}
        <button  
        style={{ margin: '10px'}}
        className="btn btn-secondary"
        onClick={(e)=>{
            e.preventDefault();
            setopen(false);
        }}>SEND</button>
        </form>
    </div>
    )
}
