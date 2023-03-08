import axios from "axios";

const BACKEND_URL =
  "https://timetracker-2646e-default-rtdb.europe-west1.firebasedatabase.app";

//logdata {title, desciption, duration, date }
export async function storeLog(logData) {
  const response = await axios.post(BACKEND_URL + "/logs.json", logData);
  const id = response.data.name;
  return id;
}

export async function fetchLogs() {
  const response = await axios.get(BACKEND_URL + "/logs.json");

  const logs = [];
  for (const key in response.data) {
    const logObject = {
      id: key,
      title: response.data[key].title,
      description: response.data[key].desciption,
      date: new Date(response.data[key].date),
      duration: response.data[key].duration,
    };
    logs.push(logObject);
  }
  return logs;
}

export function updateLog(id, logData) {
  return axios.put(BACKEND_URL + `/logs/${id}.json`, logData);
}

export function deleteLog(id) {
  return axios.delete(BACKEND_URL + `/logs/${id}.json`);
}
