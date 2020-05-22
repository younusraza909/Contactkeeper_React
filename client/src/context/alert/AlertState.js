import React, { useReducer } from "react";
import authReducer from "../alert/alertReducer";
import authContext from "../alert/alertContext";
import { v4 as uuid } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "../types";
import alertContext from "../alert/alertContext";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(authReducer, initialState);

  //SetAlert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();

    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <alertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
