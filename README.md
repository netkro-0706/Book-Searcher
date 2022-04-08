# 책 검색 웹사이트 Book-Searcher
![bookSearcher main](https://user-images.githubusercontent.com/74494210/162439119-087b9210-9dd9-48ef-b21c-6b9bfb904da3.png)

Demo : https://netkro-0706.github.io/Book-Searcher/

## 개발목표  
원하는 책을 찾을 수 있는 웹사이트를 개발  
API와 pagination을 이해하여 그 기술을 이용한 웹사이트 구축

## 사용기술
HTML  
CSS  
Javascript  
Bootstrap  
Font Awesome  
API - [Kakao Developers -> search-book](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)

## 기능
+ 미디어 쿼리를 이용하여 반응형 웹페이지를 구현  
  PC  
  ![bookSearcher main_sizing](https://user-images.githubusercontent.com/74494210/162488628-2e47c692-0c0d-4001-b573-68df4b3f90c7.png)  
  Tablet  
  ![bookSearcher tabsizing](https://user-images.githubusercontent.com/74494210/162489043-b3f301b6-d358-41c0-9d25-db9513a53e85.png)  
  Phone  
  ![bookSearcher phonesizing](https://user-images.githubusercontent.com/74494210/162489060-2296ace4-a138-4746-9ea7-dd18b932cd23.png)  

+ Pagination  
  ![pagination](https://user-images.githubusercontent.com/74494210/162489925-554c7e55-1e80-4ff0-bc72-8b8aee9b05ad.png)



## 개선사항
API문제로 페이지의 최대값이 현재페이지의 위치에 따라 변동되는 문제가 발생중 -> 실시간으로 변동되는 최대페이지 값에 유연하게 맞출 수 있는 대응이 필요  
ex)최대 페이지로 이동시 최대 페이지 값이 줄어들어 에러 발생    
  API와 받은 meta값을 좀 더 분석 및 조합하여 필터에 가격내림차순, 가격오름차순, 판매상태순의 구현이 필요
