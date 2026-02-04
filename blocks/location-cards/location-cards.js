import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const ul = document.createElement("ul");

  [...block.children].forEach((row, rowIndex) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    const imageParent = document.createElement("div");
    imageParent.className = "cards-card-image";

    const bodyParent = document.createElement("div");
    bodyParent.className = "cards-card-body";

    [...row.children].forEach((cell, cellIndex) => {
      if (cell.querySelector("picture")) {
        const wrapper = document.createElement("div");
        wrapper.className = `cards-card-image-${cellIndex}`;
        moveInstrumentation(cell, wrapper);

        cell.querySelectorAll("img").forEach((img) => {
          const isEager = rowIndex === 0 || rowIndex === 1;
          const width = cellIndex === 0 ? "750" : "350";

          const optimizedPic = createOptimizedPicture(
            img.src,
            img.alt,
            isEager,
            [{ width }],
          );

          const optimizedImg = optimizedPic.querySelector("img");
          moveInstrumentation(img, optimizedImg);
          img.closest("picture").replaceWith(optimizedPic);
        });

        while (cell.firstChild) wrapper.append(cell.firstChild);
        imageParent.append(wrapper);
      } else {
        // Body processing
        moveInstrumentation(cell, bodyParent);
        while (cell.firstChild) bodyParent.append(cell.firstChild);

        const h2 = bodyParent.querySelector("h2");
        if (h2) {
          const strong = h2.querySelector("strong");
          if (strong) {
            moveInstrumentation(strong, h2);
            h2.innerHTML = strong.innerHTML;
          }
        }
      }
    });

    li.append(imageParent);
    li.append(bodyParent);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
