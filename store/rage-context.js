import { createContext, useReducer } from "react";


export const RageContext = createContext({
  rageQuakes: [],
  addRage: ({ title, timestamp, intensity, trigger, situation }) => {},
  setRage: (rages) => {},
  deleteRage: (id) => {},
  updateRage: (id, { title, timestamp, intensity, trigger, situation }) => {},
});

function rageReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
      case 'SET':
        return action.payload;
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
  const [rageState, dispatch] = useReducer(rageReducer, []);

  function addRage(rageData) {
    dispatch({ type: "ADD", payload: rageData });
  }

  function setRages(rages) {
    dispatch({ type: "SET", payload: rages });
  }

  function deleteRage(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateRage(id, rageData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: rageData } });
  }

  const value = {
    rageQuakes: rageState,
    setRages: setRages, // Fix: Use setRages instead of setRage
    addRage: addRage,
    deleteRage: deleteRage,
    updateRage: updateRage, // Optionally, you can use shorthand syntax: updateRage
  };

  return (
    <RageContext.Provider value={value}>
      {children}
    </RageContext.Provider>
  );
}

export default RageContextProvider;
