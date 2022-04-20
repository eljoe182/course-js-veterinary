const form = document.querySelector("#nueva-cita");
const petName = document.querySelector("#mascota");
const ownerName = document.querySelector("#propietario");
const phoneNumber = document.querySelector("#telefono");
const date = document.querySelector("#fecha");
const time = document.querySelector("#hora");
const symptoms = document.querySelector("#sintomas");
const dateList = document.querySelector("#citas");
const btnSave = document.querySelector("button[type=submit]");

const dateInfo = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

class Schedule {
  constructor() {
    this.schedules = [];
  }
  addSchedule(values) {
    this.schedules = [...this.schedules, values];
  }
  getSchedule(id) {
    return this.schedules.find((schedule) => schedule.id === id);
  }
  deleteSchedule(id) {
    this.schedules = this.schedules.filter((schedule) => schedule.id !== id);
  }
  editSchedule(id, values) {
    this.schedules = this.schedules.map((schedule) =>
      schedule.id === id ? values : schedule
    );
  }
}

class UI {
  showMessage(message, typeMessage) {
    const div = document.createElement("div");
    if (typeMessage === "error") {
      div.classList.add(
        "alert",
        "alert-danger",
        "d-block",
        "text-center",
        "col-12"
      );
    } else {
      div.classList.add(
        "alert",
        "alert-success",
        "d-block",
        "text-center",
        "col-12"
      );
    }
    div.innerText = message;
    document
      .querySelector("#contenido")
      .insertBefore(div, document.querySelector(".agregar-cita"));
    setTimeout(() => {
      div.remove();
    }, 1000);
  }
  addSchedule({ schedules }) {
    dateList.innerHTML = "";
    schedules.forEach((row) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = row;
      const li = document.createElement("li");

      li.classList.add("col-12", "mt-2", "list-group-item");
      const divRow1 = document.createElement("div");
      divRow1.classList.add("row");

      const col1 = document.createElement("div");
      col1.classList.add("col-md-12");

      const label1 = document.createElement("label");
      label1.classList.add("font-weight-bold");
      label1.innerText = "Nombre de la mascota: ";

      const span1 = document.createElement("span");
      span1.classList.add("font-weight-normal");
      span1.innerText = mascota;

      col1.appendChild(label1);
      label1.appendChild(span1);
      divRow1.appendChild(col1);

      const divRow2 = document.createElement("div");
      divRow2.classList.add("row");

      const col2 = document.createElement("div");
      col2.classList.add("col-md-12");

      const label2 = document.createElement("label");
      label2.classList.add("font-weight-bold");
      label2.innerText = "Propietario: ";

      const span2 = document.createElement("span");
      span2.classList.add("font-weight-normal");
      span2.innerText = propietario;

      col2.appendChild(label2);
      label2.appendChild(span2);
      divRow2.appendChild(col2);

      const divRow3 = document.createElement("div");
      divRow3.classList.add("row");

      const col3 = document.createElement("div");
      col3.classList.add("col-md-12");

      const label3 = document.createElement("label");
      label3.classList.add("font-weight-bold");
      label3.innerText = "Teléfono: ";

      const span3 = document.createElement("span");
      span3.classList.add("font-weight-normal");
      span3.innerText = telefono;

      col3.appendChild(label3);
      label3.appendChild(span3);
      divRow3.appendChild(col3);

      const divRow4 = document.createElement("div");
      divRow4.classList.add("row");

      const col4 = document.createElement("div");
      col4.classList.add("col-md-12");

      const label4 = document.createElement("label");
      label4.classList.add("font-weight-bold");
      label4.innerText = "Fecha: ";

      const span4 = document.createElement("span");
      span4.classList.add("font-weight-normal");
      span4.innerText = fecha;

      col4.appendChild(label4);
      label4.appendChild(span4);
      divRow4.appendChild(col4);

      const divRow5 = document.createElement("div");
      divRow5.classList.add("row");

      const col5 = document.createElement("div");
      col5.classList.add("col-md-12");

      const label5 = document.createElement("label");
      label5.classList.add("font-weight-bold");
      label5.innerText = "Hora: ";

      const span5 = document.createElement("span");
      span5.classList.add("font-weight-normal");
      span5.innerText = hora;

      col5.appendChild(label5);
      label5.appendChild(span5);
      divRow5.appendChild(col5);

      const divRow6 = document.createElement("div");
      divRow6.classList.add("row");

      const col6 = document.createElement("div");
      col6.classList.add("col-md-12");

      const label6 = document.createElement("label");
      label6.classList.add("font-weight-bold");
      label6.innerText = "Sintomas: ";

      const span6 = document.createElement("span");
      span6.classList.add("font-weight-normal");
      span6.innerText = sintomas;

      col6.appendChild(label6);
      label6.appendChild(span6);
      divRow6.appendChild(col6);

      li.appendChild(divRow1);
      li.appendChild(divRow2);
      li.appendChild(divRow3);
      li.appendChild(divRow4);
      li.appendChild(divRow5);
      li.appendChild(divRow6);

      const divButtons = document.createElement("div");
      divButtons.classList.add("row");

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btn", "btn-danger", "col-6");
      btnDelete.innerText = "Eliminar";
      btnDelete.onclick = () => deleteSchedule(id);

      const btnEdit = document.createElement("button");
      btnEdit.classList.add("btn", "btn-info", "col-6");
      btnEdit.innerText = "Editar";
      btnEdit.type = "button";
      btnEdit.onclick = () => editSchedule(id);

      divButtons.appendChild(btnDelete);
      divButtons.appendChild(btnEdit);

      li.appendChild(divButtons);

      dateList.appendChild(li);
    });
  }
}

const schedule = new Schedule();
const ui = new UI();

function addSchedule(e) {
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

  console.log(id);

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

function resetDataInfo() {
  form.reset();
  dateInfo.mascota = "";
  dateInfo.propietario = "";
  dateInfo.telefono = "";
  dateInfo.fecha = "";
  dateInfo.hora = "";
  dateInfo.sintomas = "";
  delete dateInfo.id;
}

function setDateInfo(e) {
  dateInfo[e.target.name] = e.target.value;
}

function deleteSchedule(id) {
  schedule.deleteSchedule(id);
  ui.addSchedule(schedule);
  ui.showMessage("Schedule deleted", "success");
}

function editSchedule(id) {
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

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addSchedule);

  petName.addEventListener("change", setDateInfo);
  ownerName.addEventListener("change", setDateInfo);
  phoneNumber.addEventListener("change", setDateInfo);
  date.addEventListener("change", setDateInfo);
  time.addEventListener("change", setDateInfo);
  symptoms.addEventListener("change", setDateInfo);
}
