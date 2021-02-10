import React, { useState } from 'react';
import { add } from '../services/RequestParser';
import CancelIcon from '@material-ui/icons/Cancel';

export default function AddTables({setopen,open,addQuery,setaddQuery,setdata}) {
    const [dataTypes, setdataTypes] = useState(["TINYINT","SMALLINT","MEDIUMINT","INT","BIGINT","FLOAT","DOUBLE","REAL","VARCHAR(255)","VARCHAR(100)","VARCHAR(50)"])
    const handle = (e,index)=>{
        e.preventDefault();
     let newArr = addQuery; 
     switch (e.target.name) {
         case "name": newArr.nomTable = e.target.value ; break;
         case "type":newArr.fields[index].type = e.target.value ; break;
         case "text":newArr.fields[index].name = e.target.value ;  break;
         case "add": newArr.fields.push({name:"",type:""});  break;
         default : console.log('switch problem');
     } ;
     setaddQuery((old)=>({
         ...old,
         ...newArr
     }));
    }
    return (
        <div style={open ==true ? {zIndex:"20"}:null} className="addmodal">
        <form className={open ?'opened':'closed'}>
            <CancelIcon  onClick={()=>setopen(false)} style={{ cursor:"pointer",   position: 'absolute',top: '5%',right:"3%"}}/>
            <h4>Nouvelle Table </h4>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",width: '100%'}}>
                            <h5>Nom Table : </h5>
                            <input className="titreTable" style={{flex:"1"}} name="name" onChange={(e)=>handle(e)}  value={addQuery?.nomTable} type="text" />
                            <button className="btn btn-secondary" name="add" onClick={(e)=>handle(e)}>add</button>
                            <datalist id="types">
                                   {dataTypes.map((e,i)=><option key={i} value={e}>{e}</option>)}
                            </datalist>
                </div>

                {addQuery?.fields.map((element,index)=>
            <div key={index} style={{display:"flex",margin: '5px',alignItems: 'baseline'}}>
                <h5 style={{margin:'5px'}}>Nom du champ :</h5>
                <input style={{flex:"1"}} name="text" type="text" onChange={(e)=>handle(e,index)}  value={element.name} />
                <label htmlFor="type"><h5>Type :</h5></label>
                <input style={{width:'150px',margin: '5px',flex:"1"}} onChange={(e)=>handle(e,index)} type="text" name="type" list="types" id="type"/>
            </div>
            )}

        <button  
        style={{ margin: '10px'}}
        className="btn btn-secondary"
        onClick={(e)=>{
            e.preventDefault();
            add(addQuery,setdata);
            setopen(false);
        }}>SEND</button>
        </form>
    </div>
    )
}
