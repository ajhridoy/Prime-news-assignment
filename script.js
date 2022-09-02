const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}
const displayCategory = categoris => {
    // console.log(categoris)
    const disCategory = document.getElementById('dis-category');
    categoris.forEach(category => {
        console.log(category)   
        const div = document.createElement('div');
        div.classList.add('hover-back')
        div.innerText = category.category_name
        disCategory.appendChild(div);
    });
}
loadCategory()