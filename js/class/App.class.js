import { saveSchedule, setDateInfo, reatriveData } from "../functions.js";
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
    form.addEventListener("submit", saveSchedule);

    petName.addEventListener("change", setDateInfo);
    ownerName.addEventListener("change", setDateInfo);
    phoneNumber.addEventListener("change", setDateInfo);
    date.addEventListener("change", setDateInfo);
    time.addEventListener("change", setDateInfo);
    symptoms.addEventListener("change", setDateInfo);

    reatriveData();
  }
}

export default App;
