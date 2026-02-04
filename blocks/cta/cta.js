/* import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const container = block.querySelector(":scope > div > div");
  if (!container) return;

  const linkRow = container.querySelector("p:last-child");
  const link = linkRow ? linkRow.querySelector("a") : null;

  if (linkRow && link) {
    const newAnchor = document.createElement("a");
    moveInstrumentation(linkRow, newAnchor);
    newAnchor.href = link.href;
    newAnchor.title = link.title;
    newAnchor.className = "cta-button-container";

    while (linkRow.firstChild) {
      newAnchor.appendChild(linkRow.firstChild);
    }

    const oldLink = newAnchor.querySelector("a");
    const text = document.createElement("span");
    moveInstrumentation(oldLink, text);
    text.className = "email-text";
    text.textContent = oldLink.textContent;
    oldLink.replaceWith(text);

    linkRow.replaceWith(newAnchor);
  }
} */

import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const mainDiv = document.createElement("div");
  [...block.children].forEach((row) => {
    const li = document.createElement("div");
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      div.className = "contact-card";
    });
    mainDiv.append(li);
  });

  block.replaceChildren(mainDiv);
}
