import { addSchedule, setDateInfo } from "../functions.js";
import {
  date,
  form,
  ownerName,
  petName,
  phoneNumber,
  symptoms,
  time,
} from "../selectors.js";

class App {
  constructor() {
    this.init();
  }

  init() {
    form.addEventListener("submit", addSchedule);

    petName.addEventListener("change", setDateInfo);
    ownerName.addEventListener("change", setDateInfo);
    phoneNumber.addEventListener("change", setDateInfo);
    date.addEventListener("change", setDateInfo);
    time.addEventListener("change", setDateInfo);
    symptoms.addEventListener("change", setDateInfo);
  }
}

export default App;
