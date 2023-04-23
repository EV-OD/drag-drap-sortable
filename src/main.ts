import "./style.css";

const items = document.querySelectorAll(".item");
const listboxesElt = document.querySelector(".listboxes");

let draggingElt: null | Element = null;
let dragoverElt: null | Element = null;

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    draggingElt = item;
    item.classList.add("opacity-50");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("opacity-50");
    if (dragoverElt) {
      dragoverElt.classList.remove("border-2", "border-blue-500");
    }
    if (dragoverElt && dragoverElt != draggingElt) {
      let dragoverIndex = [...listboxesElt?.children].indexOf(dragoverElt);
      let draggingIndex = [...listboxesElt?.children].indexOf(draggingElt);

      listboxesElt?.removeChild(draggingElt as Node);
      listboxesElt?.insertBefore(
        draggingElt as Node,
        listboxesElt?.children[dragoverIndex]
      );

      draggingElt = null;
      dragoverElt = null;
    }

    draggingElt = null;
  });
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragoverElt = item;
    if (item != draggingElt) {
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
