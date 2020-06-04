/* eslint-disable no-undef */
const pagination = document.getElementById('pagination');
const currentUrl = window.location.href;
const splittedUrl = currentUrl.split('/');

const prevLink = document.createElement('a');
prevLink.appendChild(document.createTextNode('Prev'));
if (page !== 1) {
  prevLink.setAttribute(
    'href',
    `http://${splittedUrl[2]}/index?page=${page - 1}`
  );
}
pagination.appendChild(prevLink);

for (let i = 1; i <= 10; i += 1) {
  if (i === 1) {
    const startLink = document.createElement('a');
    startLink.setAttribute('href', `http://${splittedUrl[2]}/index?page=${i}`);
    startLink.appendChild(document.createTextNode(`First`));
    pagination.appendChild(startLink);
  }

  const pageLink = document.createElement('a');
  pageLink.setAttribute('href', `http://${splittedUrl[2]}/index?page=${i}`);
  pageLink.appendChild(document.createTextNode(`${i}`));
  pagination.appendChild(pageLink);

  if (i === 10) {
    const startLink = document.createElement('a');
    startLink.setAttribute('href', `http://${splittedUrl[2]}/index?page=${i}`);
    startLink.appendChild(document.createTextNode(`End`));
    pagination.appendChild(startLink);
  }
}

const nextLink = document.createElement('a');
nextLink.appendChild(document.createTextNode('Next'));
if (page !== 10) {
  nextLink.setAttribute(
    'href',
    `http://${splittedUrl[2]}/index?page=${page + 1}`
  );
}
pagination.appendChild(nextLink);
