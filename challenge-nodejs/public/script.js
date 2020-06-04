/* eslint-disable no-undef */
const app = document.getElementById('root');

const resultPerPage = 10;
const url = 'https://api.github.com/search/repositories';
const searchQuery = 'nodejs';

const params = new URLSearchParams(window.location.search);
let page = 1;
if (params.has('page')) {
  page = Number(params.get('page'));
}

const request = new XMLHttpRequest();
request.open(
  'GET',
  `${url}?q=${searchQuery}&page=${page}&per_page=${resultPerPage}`,
  true
);
request.onload = function () {
  // Begin accessing JSON data here
  const response = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    const { items } = response;
    const tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    const tbdy = document.createElement('tbody');
    items.forEach((repository) => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.appendChild(document.createTextNode(repository.full_name));
      tr.appendChild(td);
      tbdy.appendChild(tr);
    });
    tbl.appendChild(tbdy);
    app.appendChild(tbl);
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `It's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();
