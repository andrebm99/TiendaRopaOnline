package com.store.spring.app.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.store.spring.app.Interface.ContactInterface;
import com.store.spring.app.Models.Contact;
import com.store.spring.app.Repositories.ContactRepository;

@Service
public class ContactService implements ContactInterface{

    private final ContactRepository repository; 

    public ContactService(ContactRepository repository){
        this.repository = repository; 
    }

    @Override
    public List<Contact> getAllContacts() {
        return repository.findAll(); 
    }

    @Override
    public Contact obtenerPorId(Integer id){
        return repository.findById(id).orElse(null); 
    }

    @Override
    public Contact createContact(Contact contact) {
        return repository.save(contact); 
    }

    @Override
    public boolean deleteContact(Integer id) {
        if(!repository.existsById(id)){
            return false; 
        }

        repository.deleteById(id);
        return true; 
    }

    @Override
    public Contact actualizarContact(Integer id, Contact contact){
        return repository.findById(id).map(p -> {
            p.setName(contact.getName());
            p.setLastname(contact.getLastname());
            p.setEmail(contact.getEmail());
            p.setPhone(contact.getPhone());
            p.setMessage(contact.getMessage());

            return repository.save(p);
        }).orElse(null);
    }
    
}
