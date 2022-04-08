/*
    used API : https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book

    Last update : 2022-04-08
*/

let searchInput = document.getElementById("search-ipt");
let searchButton = document.getElementById("search-btn");
let bookHTML = document.getElementById("book-list");
let pageHTML = document.querySelector(".pagination");
let pageInput = document.getElementById("page-ipt");
let pageButton = document.getElementById("page-btn");

let recommend_rand = Math.floor(Math.random() * 4);
let books;
let page=1;
let page_count;
let Max_page;
let bool_end;
let url = '';
let url_sort = "latest";
let url_query_recommend = {
    0: "책",
    1: "우크라이나",
    2: "javascript",
    3: "코로나"
}
let url_query = url_query_recommend[recommend_rand];


searchInput.value = url_query_recommend[recommend_rand];
searchInput.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.style.color = "black";
});

searchInput.addEventListener("keyup", e => {
    if (e.key == "Enter") {
        search_fnc();    
    }
});
searchButton.addEventListener("click", () => {
    search_fnc();
});

pageButton.addEventListener("click", ()=>{
    page=pageInput.value;
    getLatest();
});

let search_fnc=()=>{
    url_query = searchInput.value;
    searchInput.value = "";
    page=1;
    getLatest();
}

const getLatest = () => {
    url_sort = "latest";
    getBookList();
}
const getAccuracy = () => {
    url_sort = "accuracy";
    getBookList();
}

const getBookList = async () => {
    try {
        url = new URL(
            `https://dapi.kakao.com/v3/search/book?target=title&page=${page}&size=10&sort=${url_sort}&query=${url_query}`
        );

        let header = new Headers({ Authorization: "KakaoAK cdc19a2bd3da5a1a474ca4c334be3b33" });

        let respones = await fetch(url, { headers: header });
        let data = await respones.json();
        //console.log(respones);
        if(respones.status==200){
            if (data.meta.pageable_count == 0) {
                throw new Error("해당 검색결과 없음");
            }

            books = data.documents;
            page_count = data.meta.pageable_count;
            
            //페이지 로드 값을 전역변수로 넘기기
            Max_page = Math.ceil(page_count/10);
            bool_end = data.meta.is_end;
            
            //console.log(data);
            //console.log(books);
            render();
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        //console.log("error : ", error.message);
        errorRender(error.message);
    }
}

const render = () => {
    resultHTML = '';

    try {
        //현재 페이지가 최대 페이지보다 클경우 자동으로 이전페이지로 이동 *api의 오작동 대응용
        if(bool_end=="ture" || page>Max_page){
            page--;
            getBookList();
        }
        resultHTML = books.map(item => {
            return `
            <div class="book-info">
                <div class="book-img">
                <img src="${item.thumbnail==""?"/images/no_image.png":item.thumbnail}">
                </div>
                <div class="book-detail">
                <span class="book-title">${item.title}</span>
                <span>저자 ${item.authors.length <= 1 ? item.authors : (item.authors[0] + ", " + item.authors[1] + " 외")}
                ${item.translators.length <= 1
                    ? item.translators.length == 1 ? "| 역자 " + item.translators : ""
                    : "| 역자 " + (item.translators[0] + ", " + item.translators[1] + " 외")}</span>
                <span>출판 ${item.publisher} | ${item.datetime.slice(0, 10)}</span>
                <span>ISBN : ${item.isbn.substring(0, item.isbn.indexOf(' '))}</span>
                <span class="book-contents">${item.contents == ""
                    ? "내용 비표시"
                    : item.contents.length <= 100 ? item.contents : item.contents.slice(0, 100) + "..."}</span>
                <div class="book-last-line">
                    <span>정가:${item.price} | 판매가:${(item.sale_price == -1) ? "판매처없음" : item.sale_price}</span>
                    <span><a href=${item.url} target="_blank">link>></a></span>
                </div>
                </div>
            </div>
        `
        }).join('');
    } catch (error) {
        resultHTML = `
            <div class="book-info">
                ${error.message}
            </div>
            `
    }
    bookHTML.innerHTML = resultHTML;
    pagenation();
}

const errorRender = (errorEvent) => {
    resultHTML = `
    <div class="book-info justify-content-center">
        ${errorEvent}
    </div>
    `

    bookHTML.innerHTML = resultHTML;
}

const pagenation = () => {
    let pageNationHTML = '';

    let nowPage=page;
    let page_group = Math.ceil(nowPage/5);
    let lastPage = page_group*5;
    let firstPage = lastPage-4;
    
    let last_group_page = Max_page;
    let first_group_page = Math.ceil(last_group_page/5)*5-4;

    pageNationHTML = `
            <li class="page-item ${nowPage<=5?"display-none":""}">
                <a class="page-link" href="#" aria-label="Previous" onclick="pageMove(1)">
                  <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item ${nowPage==1?"display-none":""}">
                <a class="page-link" href="#" aria-label="Previous" onclick="pageMove(page-1)">
                  <span aria-hidden="true">&lt;</span>
                </a>
            </li>`

            for(firstPage;firstPage<=lastPage;firstPage++){
                if(firstPage>last_group_page){
                    break;
                }
                pageNationHTML += `
                    <li class="page-item"><a class="page-link" href="#" onclick="pageMove(${firstPage})">${firstPage}</a></li>
                    `
            }

    pageNationHTML += `
            <li class="page-item ${nowPage==last_group_page?"display-none":""}">
                <a class="page-link" href="#" aria-label="Next" onclick="pageMove(page+1)">
                  <span aria-hidden="true">&gt;</span>
                </a>
            </li>
            <li class="page-item ${nowPage>=first_group_page?"display-none":""}">
                <a class="page-link" href="#" aria-label="Next" onclick="pageMove(${last_group_page})">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `;
    pageHTML.innerHTML = pageNationHTML;
}

const pageMove=(targetNum)=>{
    page=targetNum;
    getBookList();
}

getBookList();