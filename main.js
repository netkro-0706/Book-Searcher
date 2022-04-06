let searchInput = document.getElementById("search-ipt");
let searchButton = document.getElementById("search-btn");
let bookHTML = document.getElementById("book-list");


let recommend_rand = Math.floor(Math.random()*4);
let books;
let url = '';
let url_sort = "latest";
let url_query_recommend = {
    0 : "책",
    1 : "우크라이나",
    2 : "javascript",
    3 : "코로나"
}
let url_query = url_query_recommend[recommend_rand];


searchInput.value = url_query_recommend[recommend_rand];
searchInput.addEventListener("click", ()=>{
    searchInput.value="";
    searchInput.style.color = "black";
});

searchInput.addEventListener("keyup", e => {
    if (e.key == "Enter"){
        url_query=searchInput.value;
        searchInput.value="";
        getLatest();
    }

});

searchButton.addEventListener("click", ()=>{
    url_query=searchInput.value;
    searchInput.value="";
    getLatest();
});

const getLatest = () => {
    url_sort = "latest";
    getBookList();
}
const getAccuracy = () => {
    url_sort = "accuracy";
    getBookList();
}

const getBookList = async () => {
    try{
        url = new URL(
            `https://dapi.kakao.com/v3/search/book?target=title&size=10&sort=${url_sort}&query=${url_query}`
        );

        let header = new Headers({ Authorization: "KakaoAK cdc19a2bd3da5a1a474ca4c334be3b33" });

        let respones = await fetch(url, { headers: header });
        let data = await respones.json();
        
        if(data.meta.pageable_count==0){
            throw new Error("해당 검색결과 없음");
        }
        
        books = data.documents;
        console.log(data);
        console.log(books);
        render();

    } catch(error){
        console.log("error : ", error.message);
        errorRender(error.message);
    }
}

const render = () => {
    resultHTML = '';

    try{
        resultHTML = books.map(item => {
            return `
            <div class="book-info">
                <div class="book-img">
                <img src="${item.thumbnail}">
                </div>
                <div class="book-detail">
                <span class="book-title">${item.title}</span>
                <span>저자 ${item.authors.length <= 1 ? item.authors : (item.authors[0] + ", " + item.authors[1] + " 외")}
                ${item.translators.length <= 1
                    ? item.translators.length == 1 ? "| 역자 "+item.translators : ""
                    : "| 역자 "+(item.translators[0] + ", " + item.translators[1] + " 외")}</span>
                <span>출판 ${item.publisher} | ${item.datetime.slice(0, 10)}</span>
                <span>ISBN : ${item.isbn.substring(0, item.isbn.indexOf(' '))}</span>
                <span class="book-contents">${item.contents == ""
                    ? "내용 비표시"
                    :  item.contents.length<=100?item.contents:item.contents.slice(0, 100)+"..."}</span>
                <div class="book-last-line">
                    <span>정가:${item.price} | 판매가:${(item.sale_price == -1) ? "판매처없음" : item.sale_price}</span>
                    <span><a href=${item.url} target="_blank">link>></a></span>
                </div>
                </div>
            </div>
        `
        }).join('');
    } catch(error){
        resultHTML = `
            <div class="book-info">
                검색된 내용 없음
            </div>
            `
    } 
    bookHTML.innerHTML = resultHTML;

}

const errorRender = (errorEvent)=>{
    resultHTML = `
    <div class="book-info justify-content-center">
        ${errorEvent}
    </div>
    `
    
    bookHTML.innerHTML = resultHTML;
}

getBookList();