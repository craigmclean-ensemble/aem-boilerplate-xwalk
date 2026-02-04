/* export default function decorate(block) {

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('picture')) {
        div.className = 'cards-card-image';
        const pEls = div.querySelectorAll('p');
        if (pEls.length) {
          // replace any <p> elements inside image container with <div>s
          pEls.forEach((p, key) => {
            const newDiv = document.createElement('div');
            newDiv.className = `cards-card-image-${key}`;
            while (p.firstChild) newDiv.appendChild(p.firstChild);
            p.replaceWith(newDiv);
          });
        } else {
          // no <p> elements — wrap the picture in a div for consistent structure
          const pic = div.querySelector('picture');
          if (pic) {
            const wrapper = document.createElement('div');
            wrapper.className = 'cards-card-image-0';
            pic.replaceWith(wrapper);
            wrapper.appendChild(pic);
          }
        }
      } else {
        div.className = 'cards-card-body';

        const h2 = div.querySelector('h2');
        if (h2) {
          const strong = h2.querySelector('strong');
          if (strong) {
            h2.innerHTML = strong.innerHTML;
          }
        }
      }
    });
    ul.append(li);
  });

  block.replaceChildren(ul);
}
 */

import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "cards-card-image";
      else div.className = "cards-card-body";
    });
    ul.append(li);
  });
  ul.querySelectorAll("picture > img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
}
