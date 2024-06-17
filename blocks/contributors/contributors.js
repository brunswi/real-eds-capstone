/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  loadFragment,
} from '../fragment/fragment.js';

export default async function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  for (const row of block.children) {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    for (const div of li.children) {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'contributors-card-image';
      } else if (div.children.length === 1 && div.querySelector('a')) {
        const link = div.querySelector('a');
        const path = link ? link.getAttribute('href') : div.textContent.trim();
        const [fragment] = await Promise.all([loadFragment(path)]);
        if (fragment) {
          const fragmentSection = fragment.querySelector(':scope .section');
          if (fragmentSection) {
            div.classList.add(...fragmentSection.classList);
            div.replaceWith(...fragment.childNodes);
          }
        }
      } else div.className = 'contributors-card-body';
    }
    ul.append(li);
  }
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
