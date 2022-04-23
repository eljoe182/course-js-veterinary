export let db;
class Database {
  constructor() {
    this.createDB();
    this.DB = null;
  }

  createDB() {
    const dbCreate = window.indexedDB.open("schedules", 1);

    dbCreate.onerror = function (event) {
      console.log("Error creating database");
    };

    dbCreate.onsuccess = function (event) {
      console.log("Database created successfully");
      db = dbCreate.result;
    };

    dbCreate.onupgradeneeded = function (event) {
      const objectStore = event.currentTarget.result.createObjectStore(
        "dates",
        {
          keyPath: "id",
          autoIncrement: true,
        }
      );

      objectStore.createIndex("petName", "petName", { unique: false });
      objectStore.createIndex("ownerName", "ownerName", { unique: false });
      objectStore.createIndex("phoneNumber", "phoneNumber", { unique: false });
      objectStore.createIndex("date", "date", { unique: false });
      objectStore.createIndex("time", "time", { unique: false });
      objectStore.createIndex("symptoms", "symptoms", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });
    };
  }
  storeData(data) {
    const transaction = db.transaction(["dates"], "readwrite");
    const objectStore = transaction.objectStore("dates");
    const request = objectStore.add(data);

    request.onsuccess = function (event) {
      console.log("Data saved successfully");
    };

    request.onerror = function (event) {
      console.log("Error saving data");
    };
  }

  updateData(id, data) {
    const transaction = db.transaction(["dates"], "readwrite");
    const objectStore = transaction.objectStore("dates");
    const request = objectStore.get(id);

    request.onsuccess = function (event) {
      const schedule = event.target.result;
      if (schedule) {
        const requestUpdate = objectStore.put(data);

        requestUpdate.onsuccess = function (event) {
          console.log("Data updated successfully");
        };

        requestUpdate.onerror = function (event) {
          console.log("Error updating data");
        };
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data");
    };
  }
  reatriveData() {
    const transaction = db.transaction(["dates"], "readwrite");
    const objectStore = transaction.objectStore("dates");

    let result = [];
    objectStore.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        result.push(cursor.value);
        cursor.continue();
      }
    };

    request.onerror = function (event) {
      console.log("Error retrieving data");
      return null;
    };
    return result;
  }
  deleteData(id) {
    const transaction = db.transaction(["dates"], "readwrite");
    const objectStore = transaction.objectStore("dates");
    const request = objectStore.delete(id);

    request.onsuccess = function (event) {
      console.log("Data deleted successfully");
    };

    request.onerror = function (event) {
      console.log("Error deleting data");
    };
  }
}

export default Database;
