// Exercise 2: Goofy Scripts
// Let's write some toy scripts that we can use to mess with the internet!
// Write a function that selects all images on the webpage and sets their src attribute to https://i.giphy.com/media/IfuEfxTfeorNS/giphy.webp
// Write a function that selects all paragraphs on the webpage and capitalizes their text. DOM objects have a textContent property that you can access to get the text in the element, or set to change the text.

function imageChange() {
  let images = document.querySelectorAll("img");
  for(let i = 0; i < images.length; i++) {
    images[i].src = "https://i.giphy.com/media/IfuEfxTfeorNS/giphy.webp";
  }
}

function capitalize() {
  let paras = document.querySelectorAll("p");
  for(let i = 0; i < paras.length; i++) {
    paras[i].textContent = paras[i].textContent.toUpperCase();
  }
}