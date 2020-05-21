import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import { CCSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "../contacts/ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a Contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              //key will be on direct element after map so we move it to csstransition rather than contactitem
              <CCSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CCSTransition>
            ))
          : contacts.map((contact) => {
              return;
              <CCSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} key={contact.id} />;
              </CCSTransition>;
            })}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
