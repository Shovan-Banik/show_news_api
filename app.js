const loadCategories=()=>{
const url='https://openapi.programming-hero.com/api/news/categories';
fetch(url)
.then(res=>res.json())
.then(data=>displayCategories(data.data))
};
const displayCategories=datum=>{
const categoryContainer=document.getElementById('category-container');
datum.news_category.forEach(data=>{
    // console.log(data);
    /* aivabe shortcut use kore append likha cahari item container a rakha jay.
    categoryContainer.innerHTML +=`
    <a class="nav-link active" href="#">${data.category_name}</a>
    ` */
    const p=document.createElement('p');
    p.innerHTML=`<a onclick="displayNewsById('${data.category_id}','${data.category_name}')" class="nav-link active" href="#">${data.category_name}</a>`
    categoryContainer.appendChild(p);

})
}
const displayNewsById=(category_id,category_name)=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayAllNews(data,category_name))
}
const displayAllNews=(data,category_name)=>{
    console.log(data.data.length,category_name);
    document.getElementById('news-count').innerText=data.data.length;
    document.getElementById('news-category').innerText=category_name;
}