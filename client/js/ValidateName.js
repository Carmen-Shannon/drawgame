import { client } from "../js/script.js";

async function validate(name) {
  return new Promise(async (resolve) => {
    let errors = new Map();
    let names = await client.requestNames();
    if (names) {
      for (let n of names) {
        if (name === n.name) {
          errors.set("name already exists", "dupNameError");
          break;
        }
      }
    }
    if (name === "") {
      errors.set("name can not be blank", "blankNameError");
    }
    if (name && name.length < 2) {
      errors.set("name must be at least 2 characters", "minLengthError");
    }
    if (name && name.length > 12) {
      errors.set("name must be less than 13 characters", "maxLengthError");
    }
    resolve(errors.size > 0 ? errors : true);
  });
}

export default validate;
