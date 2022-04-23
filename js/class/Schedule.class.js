import Database, { db } from "./DB.class.js";

const database = new Database();
class Schedule {
  constructor() {}
  storeSchedule(values) {
    database.storeData(values);
  }
  deleteSchedule(id) {
    database.deleteData(id);
  }
  updateSchedule(id, values) {
    database.updateData(id, values);
  }
}

export default Schedule;
