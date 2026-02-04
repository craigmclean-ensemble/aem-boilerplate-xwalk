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
