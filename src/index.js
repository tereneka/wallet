import "./index.css";
import PopupCardAdd from "./scripts/components/PopupCardAdd.js";

new PopupCardAdd();

// function storageAvailable(type) {
//   try {
//     var storage = window[type],
//       x = "__storage_test__";
//     storage.setItem(x, x);
//     storage.removeItem(x);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

// if (storageAvailable("localStorage")) {
//   console.log("We can use localStorage");
// } else {
//   console.log("Too bad, no localStorage for us");
// }
