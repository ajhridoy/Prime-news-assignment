const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}
const displayCategory = categoris => {
    // console.log(categoris)
    const disCategory = document.getElementById('dis-category');
    categoris.forEach(category => {
        // console.log(category)   
        const div = document.createElement('div');
        div.classList.add('hover-back')
        div.innerHTML = `
            <span onclick="loadNews(${category.category_id})">${category.category_name}</span>
        `
        disCategory.appendChild(div);
    });
}
const loadNews = (categoryId) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}
const displayNews = newsArr =>{
    // console.log(newsArr)
    const newsCard = document.getElementById('news-card')
    newsCard.innerHTML = '';
    newsArr.forEach(news => {
        console.log(news);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.classList.add('mb-4')
        cardDiv.classList.add('d-flex')
        cardDiv.classList.add('shadow')
        cardDiv.classList.add('rounded')
        cardDiv.innerHTML = `
           <div class="col-md-4 p-3">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
           </div>
         <div class="col-md-8 ms-3 p-3">
            <div class="card-body">
            <h3 class="card-title">${news.title}</h3>
            <p class="card-text mt-3">${news.details.slice(0, 250) + '...'}</p>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <div class="d-flex">
                    <div><img class="authore-img rounded-pill" src="${news.author.img ? news.author.img: 'No Authore img'}" alt=""></div>
                    <div class="ms-2 d-flex align-items-center">
                        <h5>${news.author.name ? news.author.name: 'No Name Found'}</h5></br>
                    </div>
                </div>
                <div>
                    <span><i class="fa-solid fa-eye"></i></span>
                    <span class="fw-semibold">${news.total_view ? news.total_view: 'No Views'}</i></span>
                </div>
                <div>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <div>
                    <button class="btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button>
               </div>
            </div>
         </div>
        `;
        newsCard.appendChild(cardDiv);
    })
}
loadCategory()