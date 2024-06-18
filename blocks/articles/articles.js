export default async function decorate(block) {
  const response = await fetch('/query-index.json');
  const data = await response.json();
  data.data.forEach((magazine) => {
    if (magazine.path.startsWith('/articles/')) {
      const title = document.createElement('h2');
      title.textContent = magazine.title;
      block.append(title);
      const image = document.createElement('img');
      image.src = magazine.image;
      block.append(image);
      const description = document.createElement('p');
      description.textContent = magazine.description;
      block.append(description);
      const link = document.createElement('a');
      const button = document.createElement('button');
      button.classList.add('article-button');
      link.appendChild(button);
      const buttonText = document.createTextNode('Read more');
      button.appendChild(buttonText);
      link.title = 'Read more';
      link.href = magazine.path;
      block.append(link);
    }
  });
}
