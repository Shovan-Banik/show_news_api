let fetchData=[];
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
    .then(data=>{
      fetchData=data.data;
      displayAllNews(data.data,category_name)})
}
const displayAllNews=(data,category_name)=>{
    document.getElementById('news-count').innerText=data.length;
    document.getElementById('news-category').innerText=category_name;
    const allNewsContainer=document.getElementById('all-news');
    allNewsContainer.innerHTML='';
    data.forEach(singleData=>{
        // console.log(singleData);
        const div=document.createElement('div');
        div.classList.add('card','my-5');
        div.innerHTML=`
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${singleData.image_url}" class="img-fluid rounded" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${singleData.title}</h5>
              <p class="card-text">${singleData.details.slice(0,150)}....</p>
            </div>
            <div class="border-0 card-body d-flex justify-content-between">

        <div class="d-flex">
            <img src="${singleData.author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
            <div class='ms-1'>
                <p class='m-0'>${singleData.author.name ? singleData.author.name : "Not available"}</p>
                <p>${singleData.author.published_date ? singleData.author.published_date : "Not available"}</p>
            </div>
        </div>

            <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-eye"></i>
            <p class="m-0 p-0">${singleData.total_view ? singleData.total_view : "Not available"}</p>
            </div>
            <div class=" d-flex align-items-center">
            <i class="fa-solid fa-star"></i>
            </div>
            <div class=" d-flex align-items-center">
            <i class="fa-solid fa-arrow-right" onclick="loadDetailsModalNews('${singleData._id}')"data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </div>
            </div>
          </div>
        </div>
        `
        allNewsContainer.appendChild(div);
    })  
}

const loadDetailsModalNews=id=>{
    const url=`https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetailsModalNews(data.data[0]))
};
const displayDetailsModalNews=singleData=>{
    console.log(singleData);
    document.getElementById('modal-body').innerHTML=`
    <div class='card mb-3'>
    <div class="row g-0">
          <div class="col-md-12">
            <img src="${singleData.image_url}" class="img-fluid rounded" alt="...">
          </div>
          <div class="col-md-12 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${singleData.title}<span class="badge text-bg-warning">${singleData.others_info.is_trending ? "Trending" : "Not trending"}</span></h5>
              <p class="card-text">${singleData.details}</p>
            </div>
            <div class="border-0 card-body d-flex justify-content-between">

        <div class="d-flex">
            <img src="${singleData.author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
            <div class='ms-1'>
                <p class='m-0'>${singleData.author.name}</p>
                <p>${singleData.author.published_date}</p>
            </div>
        </div>

            <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-eye"></i>
            <p class="m-0 p-0">${singleData.total_view ? singleData.total_view : "Not available"}</p>
            </div>
            <div class=" d-flex align-items-center">
            <i class="fa-solid fa-star"></i>
            </div>
            <div class=" d-flex align-items-center">
            </div>
            </div>
          </div>
        </div>

    </div>
    `
}
const displayTrending=()=>{
  const trendingNews=fetchData.filter(singleData=>singleData.others_info.is_trending===true)
  const category_name=document.getElementById('news-category').innerText;
  displayAllNews(trendingNews,category_name);
}
const displayTodayPick=()=>{
  const todayPick=fetchData.filter(singleData=>singleData.others_info.is_todays_pick===true)
  const category_name=document.getElementById('news-category').innerText;
  displayAllNews(todayPick,category_name);
}
