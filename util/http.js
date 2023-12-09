import axios from "axios";

const BACKEND_URL = "https://ragequake-3eac3-default-rtdb.firebaseio.com";

export async function storeRage(rageData) {
 const response = await axios.post(BACKEND_URL + "/rageQuakes.json", rageData);
 const id = response.data.name;
 return id;
}

export async function fetchRage() {
  const response = await axios.get(BACKEND_URL + "/rageQuakes.json");

  const rages = [];

  for (const key in response.data) {
    const rageObj = {
      id: key,
      title: response.data[key].title,
      intensity: response.data[key].intensity,
      situation: response.data[key].situation,
      timestamp: response.data[key].timestamp ? response.data[key].timestamp.toString() : null,
      trigger: response.data[key].trigger,
      description: response.data[key].description,
    }; 
    rages.push(rageObj);
  }

  return rages;
}


export function updateRages(id, rageData) {
  return axios.put(BACKEND_URL + `/rageQuakes/${id}.json`, rageData);
}

export function deleteRages(id) {
  return axios.delete(BACKEND_URL + `/rageQuakes/${id}.json`);
}
