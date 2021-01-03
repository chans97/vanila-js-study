const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const test = [];

fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => cities.push(...data))
    .then(e => console.log(e));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch);
        return place.city.match(regex) || place.state.match(regex)
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        console.log(this);
        return `
            <li>
              <span class="name">${cityName}, ${stateName}</span>
              <span class="population">${numberWithCommas(place.population)}</span>
            </li>
          `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

/*
0. fetch는 Promise 함수겠구나.
1. ()=> 애로우 func 사용 시 인자가 하나일 경우 () 생략 가능
2. push()는 완료 후 list의 총 길이를 반환
3. RegExp 정규표현식 /ad/gi 문자 검색, 교환, 추출 등에 사용
4. RegExp 메소드
    replace	문자열.replace(정규식,대체문자)	일치하는 문자열을 대체하고 대체된 문자열(String) 반환
    match	문자열.match(정규식)	일치하는 문자열의 배열(Array) 반환

관련 자료
https://heropy.blog/2018/10/28/regexp/
*/