export default async function decorate(block) {
  const response = await fetch('/query-index.json');
  const data = await response.json();
  data.data.forEach((magazine) => {
    if (magazine.path.startsWith('/articles/')) {
      const title = document.createElement('h2');
      title.textContent = magazine.title;
      block.append(title);
      const imageLink = document.createElement('a');
      imageLink.href = magazine.path;
      imageLink.setAttribute('aria-label', magazine.title);
      const image = document.createElement('img');
      image.src = magazine.image;
      image.alt = magazine.title;
      imageLink.append(image);
      block.append(imageLink);
      const description = document.createElement('p');
      description.textContent = magazine.description;
      block.append(description);
      const link = document.createElement('a');
      link.setAttribute('aria-label', magazine.title);
      const button = document.createElement('button');
      button.classList.add('article-button');
      link.appendChild(button);
      const buttonText = document.createTextNode('Read more');
      button.appendChild(buttonText);
      const screenReaderText = document.createElement('span');
      screenReaderText.textContent = magazine.title;
      screenReaderText.classList.add('screen-reader-text');
      button.appendChild(screenReaderText);
      link.href = magazine.path;
      block.append(link);
    }
  });
}
