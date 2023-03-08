import { createContext, useReducer } from "react";

export const LogsContext = createContext({
  logs: [],
  addLog: ({ title, description, date, duration }) => {},
  deleteLog: (id) => {},
  updateLog: (id, { title, description, date, duration }) => {},
});

function logsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableLogIndex = state.findIndex(
        (log) => log.id === action.payload.id
      );
      const updatableLog = state[updatableLogIndex];
      const updatedItem = { ...updatableLog, ...action.payload.data };
      const updatedLogs = [...state];
      updatedLogs[updatableLogIndex] = updatedItem;
      return updatedLogs;
    case "DELETE":
      return state.filter((log) => log.id !== action.payload);
    default:
      return state;
  }
}

function LogsContextProvider({ children }) {
  const [logsState, dispatch] = useReducer(logsReducer, []);

  function addLog(logData) {
    dispatch({ type: "ADD", payload: logData });
  }

  function setLogs(logs) {
    dispatch({ type: "SET", payload: logs });
  }

  function deleteLog(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateLog(id, logData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: logData } });
  }

  const value = {
    logs: logsState,
    addLog: addLog,
    setLogs: setLogs,
    deleteLog: deleteLog,
    updateLog: updateLog,
  };

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
}

export default LogsContextProvider;
