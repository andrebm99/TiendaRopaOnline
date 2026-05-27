package com.store.spring.app.Interface;

import java.util.List;
import com.store.spring.app.Models.Contact;

public interface ContactInterface {
    List<Contact> getAllContacts();
    Contact createContact(Contact contact);
    boolean deleteContact(Integer id);
    Contact actualizarContact(Integer id, Contact contact); 
    Contact obtenerPorId(Integer id); 
}
