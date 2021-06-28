const container= document.querySelector("#div2")

const renderUser = (doc) =>{
    
    const user = document.createElement("div");
    user.setAttribute("class", "user");

    const name = document.createElement("div");
    name.setAttribute("class","name");
    name.textContent = doc.name;

    const email = document.createElement("div");
    email.setAttribute("class", "email");
    email.textContent = doc.email;
    
    user.setAttribute('data-id', doc.id)

    user.appendChild(name);
    user.appendChild(email);

    container.appendChild(user)
}

fetch("https://jsonplaceholder.typicode.com/users",{
        method:"GET"
    })
    .then( response => response.json())
    .then(data=>{
        data.map(user =>{
            renderUser(user)
            // console.log(user)
        })
    }).catch(error => {
        console.log(error)
    })
