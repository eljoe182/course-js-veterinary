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

export default Schedule;
