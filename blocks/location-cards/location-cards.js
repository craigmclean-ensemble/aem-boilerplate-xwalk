import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const ul = document.createElement("ul");

  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);

    const imageParent = document.createElement("div");
    imageParent.className = "cards-card-image";

    const bodyParent = document.createElement("div");
    bodyParent.className = "cards-card-body";

    let imageCount = 0;
    [...row.children].forEach((cell) => {
      if (cell.querySelector("picture")) {
        const wrapper = document.createElement("div");
        wrapper.className = `cards-card-image-${imageCount}`;
        moveInstrumentation(cell, wrapper);

        while (cell.firstChild) wrapper.append(cell.firstChild);
        imageParent.append(wrapper);
        imageCount += 1;
      } else {
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

  ul.querySelectorAll("img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    const optimizedImg = optimizedPic.querySelector("img");

    moveInstrumentation(img, optimizedImg);

    img.closest("picture").replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
