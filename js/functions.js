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

export function addSchedule(e) {
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
    schedule.editSchedule(id, { ...dateInfo });
    ui.showMessage("Schedule updated", "success");
  } else {
    dateInfo.id = Date.now();
    schedule.addSchedule({ ...dateInfo });
    ui.showMessage("Schedule added", "success");
  }

  ui.addSchedule(schedule);
  resetDataInfo();
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

export function setDateInfo(e) {
  dateInfo[e.target.name] = e.target.value;
}

export function deleteSchedule(id) {
  schedule.deleteSchedule(id);
  ui.addSchedule(schedule);
  ui.showMessage("Schedule deleted", "success");
}

export function editSchedule(id) {
  const { mascota, propietario, telefono, fecha, hora, sintomas } =
    schedule.getSchedule(id);

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

  btnSave.innerText = "Editar";
  btnSave.classList.remove("btn-success");
  btnSave.classList.add("btn-info");
}
