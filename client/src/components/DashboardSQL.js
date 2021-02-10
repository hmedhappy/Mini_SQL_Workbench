import React, { useEffect, useState } from 'react'
import { JsonToTable } from "react-json-to-table";
import '../DashboardSQL.css' ;
import { Query ,getTables ,getFields } from './services/RequestParser';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import AddTables from './modals/AddTables';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AddContent from './modals/AddContent';





export default function DashboardSQL() {
    const [data, setdata] = useState() ;
    const [open, setopen] = useState(false);
    const [open2, setopen2] = useState(false);
    const [tables, settables] = useState([])
    const [table, settable] = useState("users");
    const [Current, setCurrent] = useState([]);
    const [refresh, setrefresh] = useState(false)
    const [addQuery, setaddQuery] = useState({nomTable:"",fields:[]})
   
   useEffect(async() => {
    await getTables(settables);
   }, [refresh]);
   useEffect(async() => {
    await  getFields(table,setCurrent) ;

   }, [refresh])
   
    return (
        <div>
            <div style={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>

            <Button 
            variant="outlined" 
            className="btn btn-secondary"
                startIcon={<AddToPhotosIcon/>}
            onClick={()=>setopen(!open)} >
            + TABLE
            </Button> 
            <form class="form" onSubmit={(e)=>Query(e,setdata)}>
            <TextField
            style={{margin:"1rem",width: '50vw',fontFamily: 'system-ui'}}
                error={data?.error}
                label="Query"
                onChange={()=>setdata()}
                helperText={data?.error}
                variant="outlined"
                name='query'
        />       
                
        <input style={{display:'none'}} type="submit" value="Query"/>
            </form>
          
            <select style={{width: '20vw'}} value={table} className="custom-select" onChange={async(e)=>{
                settable(e.target.value);
                setrefresh(!refresh);
            }}>
                {tables.map(element=><option value={element.Tables_in_acme}>{element.Tables_in_acme}</option>)}
            </select>
            <Button 
            onClick={()=>setopen2(!open2)}
            className="btn btn-secondary"
            endIcon={<AddToPhotosIcon/>}
            >
            </Button>
            </div>
            {data?.error 
            ? <Alert severity="error">No result due to an Error</Alert>
            : <JsonToTable json={data} styles={{width:'70vw',margin:'auto'}} />             
            }
           <AddTables open={open} setopen={setopen} addQuery={addQuery} setaddQuery={setaddQuery} setdata={setdata}  />             
           <AddContent open={open2} setopen={setopen2} table={table} Current={Current} setrefresh={setrefresh} refresh={refresh}   />             
        </div>
    )
}
