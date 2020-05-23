import React, { useReducer } from "react";

// We are using uuid to mimic backend database id generator
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //GET CONTACT
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //CLear Contacts
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACT });
  };

  //Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //CLear Contact current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //filter contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  //remove filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        setCurrent,
        clearCurrent,
        addContact,
        deleteContact,
        updateContact,
        filterContacts,
        clearFilter,
        getContact,
        clearContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
