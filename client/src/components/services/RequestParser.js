export const Query = (event,setdata) => {
    event.preventDefault();
    fetch(`http://localhost:5000/users`,{
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({query:event.target.query.value})

})
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            setdata(data);
        })
     }

export const add = ({nomTable,fields},setdata) => {
    const request = `CREATE TABLE ${nomTable}( id_${nomTable} INT AUTO_INCREMENT, primary key (id_${nomTable}), ${fields.map(element=> `${element.name} ${element.type}`)});`
    fetch(`http://localhost:5000/users`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query:request})
    
    })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setdata(data);
            })

}    

export const getTables = (settables) => {
    const request = `show tables`
    fetch(`http://localhost:5000/users`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query:request})
    
    })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                settables(data);
            })
}


export const getFields = (table,setcurrentTable) => {
    const request = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`
    fetch(`http://localhost:5000/users`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query:request})
    
    })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setcurrentTable(data);
            })
}