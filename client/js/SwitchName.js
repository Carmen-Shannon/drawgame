import ND from "../elements/NameDisplay.js";
import NI from "../elements/NameInput.js";
import { client } from "../js/script.js";

function lockName(nameInput) {
  const nd = new ND("namedisplay", nameInput.val);
  client.addName(nameInput.val);
  nameInput.el.replaceWith(nd.el);
  return nd;
}

function unlockName() {
  const nd = document.getElementById("namedisplay");
  const ni = new NI("nameinput");
  client.removeName();
  nd.replaceWith(ni.el);
  return ni;
}

export { lockName, unlockName };
