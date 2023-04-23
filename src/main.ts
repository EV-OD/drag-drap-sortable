import "./style.css";

const items = document.querySelectorAll(".item");
const listboxesElt = document.querySelector(".listboxes");

let draggingElt: null | Element = null;
let dragoverElt: null | Element = null;
let index: null | number = null;
let direction: "up" | "down" | null = null;
let hr = document.createElement("hr");
hr.className = "h-1 bg-white border-none";

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    draggingElt = item;
    item.classList.add("opacity-50");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("opacity-50");
    if (dragoverElt && draggingElt !== dragoverElt) {
      dragoverElt.classList.remove("border-2", "border-blue-500");
      listboxesElt?.removeChild(draggingElt as Node);
      draggingElt?.classList.add("animate-load-drag");
      if (direction == "up") {
        dragoverElt.before(draggingElt as Node);
      } else if (direction == "down") {
        dragoverElt.after(draggingElt as Node);
      }
    }
    hr.remove();
    let deleteAnimation = () => {
      draggingElt?.classList.remove("animate-load-drag");
      draggingElt?.removeEventListener("animationend", deleteAnimation);
      draggingElt = null;
      dragoverElt = null;
      index = null;
      direction = null;
    };
    draggingElt?.addEventListener("animationend", deleteAnimation);
  });
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragoverElt = item;
    if (item != draggingElt) {
      let eltDimData = item.getBoundingClientRect();
      let eltParentData = item.parentElement?.getBoundingClientRect();

      let mouseRelativeY = e.clientY - eltParentData?.top;
      let middleDim = eltDimData.top - eltDimData.height / 2;
      if (middleDim > mouseRelativeY) {
        item.before(hr);
        direction = "up";
      } else {
        item.after(hr);
        direction = "down";
      }
      dragoverElt.classList.add("border-2", "border-blue-500");
    }
  });
  item.addEventListener("dragleave", () => {
    item.classList.remove("border-2", "border-blue-500");
  });
});

if (listboxesElt) {
  listboxesElt.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}
