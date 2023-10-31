import mockData from "./images.js";

// Get the container for carousel items and create a controller div
const carousel = document.getElementById("carousel-items");
const selectedItem = document.getElementById("selected-item");
let isMouseDown = false;
let isDragging = false; 
let startX, scrollLeft;
const root = document.documentElement;

function initView(mockData) {
  for (let i = 1; i < mockData.length; i++) {
    const item = createItem(i)
    carousel.appendChild(item);
  }
  const item = createItem(0)
  item.children[2].classList.add("show")
  selectedItem.appendChild(item)
}

initView(mockData)

let timeOutId


carousel.addEventListener("click", (e) => {
  const item = e.target;
  if (item.classList.contains("carousel-item") && !isDragging) {
    clearTimeout(timeOutId);
    const newItem = item.cloneNode(true)
    const rect = item.getBoundingClientRect();
    newItem.style.setProperty('--start-top', `${rect.top}px`);
    newItem.style.setProperty('--start-left', `${rect.left}px`);
    newItem.classList.add("selected")
    setTimeout(() => {
      item.classList.add("selected")
    }, 100);
    selectedItem.appendChild(newItem)
    setTimeout(() => {
      newItem.children[2].classList.add("hide")
    }, 500);
    setTimeout(() => {
      newItem.children[2].classList.remove("hide")
      newItem.children[2].classList.add("show")
    }, 1500);
    setTimeout(() => {
      item.classList.remove("selected")
      carousel.appendChild(item)
    }, 1500);
    timeOutId = setTimeout(() => {
      const selectedItems = selectedItem.children
      for (let i = 0; i < selectedItems.length - 1; i++) {
        selectedItems[i].remove()
      }
    }, 1500);
  }
})


















carousel.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
  isDragging = false; 
});

carousel.addEventListener("mouseleave", () => {
  isMouseDown = false;
  isDragging = false;
});

carousel.addEventListener("mouseup", (e) => {
  isMouseDown = false;
  const imageWidth = carousel.children[0].clientWidth
  const nearestSnapPoint = Math.round(carousel.scrollLeft/imageWidth % 250) * (imageWidth + 20)
  carousel.scrollTo({
    left: nearestSnapPoint,
    behavior: "smooth",
  })
});

carousel.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1;  
  carousel.scrollLeft = scrollLeft - walk;
  isDragging = true;
});






function createItem(i) {
  // Create elements for each item
  const item = document.createElement("div");
  item.className = "carousel-item";
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const image = document.createElement("img");
  image.src = mockData[i].image;

  const itemContent = document.createElement("div");
  itemContent.className = "carousel-content";

  const location = document.createElement("p");
  location.textContent = mockData[i].location;
  location.className = "location";

  const name = document.createElement("h1");
  name.textContent = mockData[i].name;
  name.className = "name";

  const description = document.createElement("p");
  description.textContent = mockData[i].description;
  description.className = "text-hide description";

  // Append elements to the thumbnail item
  itemContent.appendChild(location);
  itemContent.appendChild(name);
  itemContent.appendChild(description);
  item.appendChild(overlay);
  item.appendChild(image);
  item.appendChild(itemContent);

  return item
}


