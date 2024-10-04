document.getElementById("search").addEventListener("keyup", (e) => {
    searchPost(e.target.value);
});

let allPost = async () => {
    let response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    let data = await response.json();
    showPost(data.posts);
};

let searchPost = async (search = '') => {
    let response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    let data = await response.json();
    showPost(data.posts);
};

allPost();

let showPost = (posts) => {
    let container = document.getElementById("container");
    container.innerHTML = '';  // Clear the container

    if(posts.length===0){

       

        container.innerHTML=`

        <h1> Sorry No Data Found ,</h2>
        
        
        `
    }

    for (let post of posts) {
        let div = document.createElement("div");

        div.innerHTML = `
            <figure>
                <img class="rounded-full"
                src=${post.image}
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${post.author.name}</h2>
                <p>${post.title}</p>
                <p>${post.category}</p>
                <button class="btn btn-warning">Show</button>
            </div>
        `;

        // Attach event listener to the button to pass the current post to showDetails
        div.querySelector("button").addEventListener("click", () => showDetails(post));

        container.appendChild(div);
    }
};

let showDetails = (post) => {
    let detailsContainer = document.getElementById("details");
    // detailsContainer.innerHTML = '';  // Clear previous details

    let details_div = document.createElement("div");
    details_div.innerHTML = `
        <h2>Category: ${post.category}</h2>
        <h3>Title: ${post.title}</h3>
        <p>Author: ${post.author.name}</p>
        <p>Content: ${post.content}</p>
    `;

    detailsContainer.appendChild(details_div);
};
