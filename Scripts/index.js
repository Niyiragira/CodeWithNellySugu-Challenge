const container= document.querySelector("#div2");
const header = document.createElement("span");
header.textContent="List of users";
container.appendChild(header);

const navBar =document.querySelector("#menuBar");
const h4= document.createElement("h4");
h4.textContent = "#CodeWithNellySugu";

navBar.appendChild(h4)

const navBarItem = document.createElement("div");
navBarItem.setAttribute("class","navBarItems")
navBarItem.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.reload();
})

const postsContainer= document.querySelector("#div3")
const loading = document.querySelector('.loading')

const displayUserPosts = (doc) => {

    const post = document.createElement('li');
    post.setAttribute("class", "post");

    const title = document.createElement("div")
    title.setAttribute("class", "title");
    title.textContent = doc.title;

    const body = document.createElement("div")
    body.setAttribute("class", "postBody");
    body.textContent = doc.body;

    post.appendChild(title);
    post.appendChild(body);

    postsContainer.appendChild(post);

}

const renderUser = (doc) =>{

    const user = document.createElement("li");
    user.setAttribute("class", "user");

    const name = document.createElement("div");
    name.setAttribute("class","name");
    name.textContent = doc.name;

    const email = document.createElement("div");
    email.setAttribute("class", "email");
    email.textContent = doc.email;

    const button = document.createElement("button");
    button.textContent = ("Posts");
    
    user.setAttribute('data-id', doc.id);
    user.setAttribute("name", doc.name)

    user.appendChild(name);
    user.appendChild(email);

    user.appendChild(button)

    container.appendChild(user);

    button.addEventListener("click",(e) => {
        loading.style.display = 'flex'

        const id = e.target.parentElement.getAttribute("data-id")
        const name = e.target.parentElement.getAttribute("name")
        const header = document.createElement("span");
        header.textContent=`List of posts by ${name}` ;
        postsContainer.appendChild(header)

        container.style.display = "none";
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
              data.map(post=>{
                  displayUserPosts(post);
                  navBarItem.textContent= "<<Back to users";
                  navBar.appendChild(navBarItem)
                  document.querySelector('.loading').style.display = 'none'
              })
            }).catch(error => {
                console.log(error)
        })
    })
}

fetch("https://jsonplaceholder.typicode.com/users",{
        method:"GET"
    })
    .then( response => response.json())
    .then(data=>{
        data.map(user =>{
            renderUser(user)
            navBarItem.textContent = "Users";
            navBar.appendChild(navBarItem)
            document.querySelector('.loading').style.display = 'none'
        })
    }).catch(error => {
        console.log(error)
    })
