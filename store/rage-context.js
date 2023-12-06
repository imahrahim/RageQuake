import { createContext, useReducer } from "react";
import data from "../data/data";

const dummyData = data;

export const RageContext = createContext({
  rageQuakes: [],
  addRage: ({ title, timestamp, intensity, trigger, situation }) => {},
  deleteRage: (id) => {},
  updateRage: (id, { title, timestamp, intensity, trigger, situation }) => {},
});

function rageReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const updateableRageIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const updateableRage = state[updateableRageIndex];
      const updatedItem = { ...updateableRage, ...action.payload.data };
      const updatedRage = [...state];
      updatedRage[updateableRageIndex] = updatedItem;
      return updatedRage;
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function RageContextProvider({ children }) {
  const [rageState, dispatch] = useReducer(rageReducer, dummyData);

  function addRage(rageData) {
    dispatch({ type: "ADD", payload: rageData });
  }

  function deleteRage(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateRage(id, rageData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: rageData } });
  }

const value = {
    rageQuakes: rageState,
    addRage: addRage,
    deleteRage: deleteRage,
    updateRage:updateRage,
}

  return (
    <RageContext.Provider
      value={value}
    >
      {children}
    </RageContext.Provider>
  );
}

export default RageContextProvider;
