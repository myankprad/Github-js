const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main")

const getUser = async (username)=>{
 const response = await fetch(APIURL + username);
 const data = await response.json()
 console.log(data)
 const card = `
 <div class="card">
 <div>
     <img src="${data.avatar_url}" alt="">
 </div>
 <div class="user-info">
    <h2>${data.name}</h2>
    <p>${data.bio}</p>
 </div>
 <ul class="info">
     <li>${data.followers}</li>
     <li>${data.following}</li>
     <li>${data.public_repos}</li>
     <li>${data.location}</li>
     

     
 </ul>
 <div id="repos">
     
 </div>
</div>
 `
 main.innerHTML = card;
 
 getRepos(username)

}

getUser("myankprad")

const getRepos = async (username) =>{
    const repos = document.querySelector("#repos")
    const response = fetch(APIURL + username + "/repos")
    const dataa = (await response).json()
    console.log(dataa)
    dataa.map(
        (item)=>{
            const elem = document.createElement("a")
            elem.classList.add("repo")
            elem.href = item.url;
            elem.innerText = item.name;
            elem.target = "_blank"
            repos.appendChild(elem)
        }
    )
}

const formSubmit =()=>{
    const searchBox = document.querySelector("#search")
    if(searchBox.value){
     getUser(searchBox.value)
     searchBox.value = ""
    }
    return false;
}

searchBox.addEventListener(
    "focusout",
    function (){
        formSubmit()
    }
)


