import { db } from "./class/DB.class.js";
import Schedule from "./class/Schedule.class.js";
import UI from "./class/UI.class.js";
import {
  btnSave,
  date,
  form,
  ownerName,
  petName,
  phoneNumber,
  symptoms,
  time,
} from "./selectors.js";

const schedule = new Schedule();
const ui = new UI();

const dateInfo = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

export function setDateInfo(e) {
  dateInfo[e.target.name] = e.target.value;
}

export function resetDataInfo() {
  form.reset();
  dateInfo.mascota = "";
  dateInfo.propietario = "";
  dateInfo.telefono = "";
  dateInfo.fecha = "";
  dateInfo.hora = "";
  dateInfo.sintomas = "";
  delete dateInfo.id;
}

export function reatriveData() {
  const objectStore = db.transaction("dates").objectStore("dates");
  let result = [];
  objectStore.openCursor().onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      result.push(cursor.value);
      cursor.continue();
    }
    ui.addSchedule(result);
  };
}

export function saveSchedule(e) {
  e.preventDefault();
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
    dateInfo;
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.showMessage("All fields are required", "error");
    return;
  }

  if (id) {
    schedule.updateSchedule(id, { ...dateInfo });
    ui.showMessage("Schedule updated", "success");
  } else {
    dateInfo.id = Date.now();
    schedule.storeSchedule({ ...dateInfo });
    ui.showMessage("Schedule added", "success");
  }

  reatriveData();
  resetDataInfo();
}

export function editSchedule(data) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = data;

  dateInfo.id = id;
  dateInfo.mascota = mascota;
  dateInfo.propietario = propietario;
  dateInfo.telefono = telefono;
  dateInfo.fecha = fecha;
  dateInfo.hora = hora;
  dateInfo.sintomas = sintomas;

  petName.value = mascota;
  ownerName.value = propietario;
  phoneNumber.value = telefono;
  date.value = fecha;
  time.value = hora;
  symptoms.value = sintomas;

  btnSave.innerText = "Actualizar";
  btnSave.classList.remove("btn-primary");
  btnSave.classList.add("btn-success");
}

export function deleteSchedule(id) {
  schedule.deleteSchedule(id);

  reatriveData();
  resetDataInfo();
  ui.showMessage("Schedule deleted", "success");
}
