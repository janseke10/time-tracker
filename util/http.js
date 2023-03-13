import axios from "axios";

const BACKEND_URL =
  "https://timetracker-2646e-default-rtdb.europe-west1.firebasedatabase.app";

//logdata {title, desciption, duration, date }
export async function storeLog(logData) {
  const response = await axios.post(BACKEND_URL + "/logs.json", logData);
  const id = response.data.name;
  return id;
}

export async function fetchLogsById(userId) {
  const logs = [];
  const url = BACKEND_URL + `/logs.json?orderBy="userId"&equalTo="${userId}"`;
  try {
    const response = await axios.get(url);
    for (const key in response.data) {
      const logObject = {
        id: key,
        title: response.data[key].title,
        description: response.data[key].description,
        date: response.data[key].date,
        duration: response.data[key].duration,
      };
      logs.push(logObject);
    }
  } catch (err) {
    console.log(err);
  }

  return logs;
}

export function updateLog(id, logData) {
  return axios.put(BACKEND_URL + `/logs/${id}.json`, logData);
}

export function deleteLog(id) {
  return axios.delete(BACKEND_URL + `/logs/${id}.json`);
}

export async function exportLogs() {
  const url = BACKEND_URL + `/logs.json?downdload=logexport.txt`;
  try {
    const response = await axios.get(url);
    console.log("ja hallo", response);
  } catch (err) {
    console.log(err);
  }
}
