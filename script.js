const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}
const displayCategory = categoris => {
    const disCategory = document.getElementById('dis-category');
    categoris.forEach(category => {  
        const div = document.createElement('div');
        div.classList.add('hover-back')
        div.innerHTML = `
            <span onclick="loadNews(${category.category_id})">${category.category_name}</span>
        `
        disCategory.appendChild(div);
    });
}

const showSpinner = document.getElementById('show-spinner')
const loadNews = (categoryId) =>{
    showSpinner.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error))
}

const displayNews = newsArr =>{
    console.log(newsArr) 

    // short by views
    newsArr.sort((a, b) =>{
        return b.total_view - a.total_view
    })

    // no found message
    const noFound = document.getElementById('no-found')
    if(newsArr.length === 0){
        noFound.classList.remove('d-none')
    }else{
        noFound.classList.add('d-none')
    }
    // display count of news
    const newsCount = document.getElementById('news-count');
    newsCount.innerHTML = '';
    const newsDiv = document.createElement('h2');
    newsDiv.innerText = `${newsArr.length ? newsArr.length : 'No'} News in here `
    newsCount.appendChild(newsDiv);

    const newsCard = document.getElementById('news-card')
    newsCard.innerHTML = '';
    showSpinner.classList.add('d-none');
    newsArr.forEach(news => {
        console.log(news);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.classList.add('mb-4')
        cardDiv.classList.add('d-md-flex')
        cardDiv.classList.add('shadow')
        cardDiv.classList.add('rounded')
        cardDiv.innerHTML = `
           <div class="col-12 col-md-4 p-3">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
           </div>
         <div class="col-12 col-md-8 ms-3 p-3">
            <div class="card-body">
            <h3 class="card-title">${news.title}</h3>
            <p class="card-text mt-4">${news.details.slice(0, 200) + '...'}</p>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-md-between mt-5">
                <div class="d-flex col">
                    <div><img class="authore-img rounded-pill" src="${news.author.img ? news.author.img: 'No Authore img'}" alt=""></div>
                    <div class="ms-2 d-flex align-items-center">
                        <h5>${news.author.name ? news.author.name: 'No Name Found'}</h5></br>
                    </div>
                </div>
                <div class="col">
                    <span><i class="fa-solid fa-eye"></i></span>
                    <span class="fw-semibold">${news.total_view ? news.total_view: 'No Views'}</i></span>
                </div>
                <div class="col">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <div class="col">
                    <button onclick="loadModals('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
               </div>
            </div>
         </div>
        `;
        newsCard.appendChild(cardDiv);
    })   
}

// display modals
const loadModals = (news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayModals(data.data))
    .catch(error => console.log(error))
}
const displayModals = disNews =>{
    console.log(disNews)
    const ModalTitle = document.getElementById('exampleModalLabel');
    ModalTitle.innerText = disNews[0].title
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <p>${disNews[0].details}</p>
        <img class="img-fluid" src="${disNews[0].image_url}" alt="">
    `
}
const toggleLoder = isLoading => {
    const loderSection = document.getElementById('loder');
    if(isLoading){
        loderSection.classList.remove('d-none');
    }else{
        loderSection.classList.add('d-none');
    }
}
loadCategory()