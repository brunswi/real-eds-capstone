export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('social-container');
  // eslint-disable-next-line no-plusplus
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const name = row.children[0].textContent;
    const link = row.children[1].textContent;
    li.innerHTML = `<div><a href="${link}" class="fa fa-brands fa-${name}" aria-label="${name}" target="_blank"></a></div>`;
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
