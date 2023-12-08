import axios from "axios";

const BACKEND_URL = "https://ragequake-3eac3-default-rtdb.firebaseio.com";

export function storeRage(rageData) {
  axios.post(BACKEND_URL + "/rageQuakes.json", rageData);
}

export  async function fetchRage() {
   const response = await axios.get(BACKEND_URL + "/rageQuakes.json");

   const rages = [];

   for (const key in response.data) {
    const rageObj = {
        id: key,
        title: response.data[key].title,
        intensity: response.data[key].intensity,
        situation: response.data[key].situation,
        timestamp: response.data[key].timestamp,
        trigger: response.data[key].trigger,
        description: response.data[key].description,
    }; 
        rages.push(rageObj);
   }
   return rages;
}
