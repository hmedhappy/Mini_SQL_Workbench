var list = document.getElementById('list');
function fetchUsers(event) {
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
            console.log(data)
            data.map(user=>{
                list.innerHTML+= `
                <li> name : ${user.first_name} ${user.last_name} | email : ${user.email} | password : ${user.password} </li>
                `
            })
        })
     }