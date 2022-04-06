let searchInput = document.getElementById("search-ipt");
let searchButton = document.getElementById("search-btn");
let bookHTML = document.getElementById("book-list");

let books;
let sort = "latest";

const getBookList = async()=>{
    let url = new URL(
        "https://dapi.kakao.com/v3/search/book?target=title&size=10&sort=latest&query=책"
        );
    let header = new Headers({Authorization : "KakaoAK cdc19a2bd3da5a1a474ca4c334be3b33"});

    let respones = await fetch(url, {headers:header});
    let data = await respones.json();

    books = data.documents;
    console.log(books);
    render();
}

const render = ()=>{
    resultHTML = '';

    resultHTML = books.map(item => {
        return `
        <div class="book-info">
            <div class="book-img">
              <img src="${item.thumbnail}">
            </div>
            <div class="book-detail">
              <span class="book-title">${item.title}</span>
              <span>${item.authors} 지음 | ${item.translators} 역자</span>
              <span>출판 ${item.publisher} | ${item.datetime.slice(0, 10)}</span>
              <span>ISBN : ${item.isbn}</span>
              <span>${item.contents.slice(0, 100)}...</span>
              <div class="book-last-line">
                <span>정가:${item.price} | 판매가:${item.sale_price}</span>
                <span><a href=${item.url} target="_blank">link>></a></span>
              </div>
            </div>
          </div>
    `
    }).join('');

    bookHTML.innerHTML = resultHTML;

}

getBookList();