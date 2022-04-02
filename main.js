let searchInput = document.getElementById("search-ipt");
let searchButton = document.getElementById("search-btn");

const getBookList = async()=>{
    let url = new URL("https://dapi.kakao.com/v3/search/book?target=title&size=20&sort=latest&query=책");
    let header = new Headers({Authorization : "KakaoAK cdc19a2bd3da5a1a474ca4c334be3b33"});

    let respones = await fetch(url, {headers:header});
    let data = await respones.json();

    console.log(data);
}

getBookList();