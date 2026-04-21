package com.store.spring.app.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.spring.app.Interface.ContactInterface;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.store.spring.app.Models.Contact;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactInterface contactInterface;

    public ContactController(ContactInterface contactInterface) {
        this.contactInterface = contactInterface;
    } 

    @GetMapping
    public ResponseEntity<List<Contact>> getAll() {

        try{
            List<Contact> contacts = contactInterface.getAllContacts(); 

            if(contacts.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            }

            return new ResponseEntity<>(contacts, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    
    @PostMapping
    public ResponseEntity<Contact> create(@RequestBody Contact contact) {
        try{
            Contact newContact = contactInterface.createContact(contact); 
            return new ResponseEntity<>(newContact, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id){
        try{
            boolean isDeleted = contactInterface.deleteContact(id);
            if(!isDeleted){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    
    
    
}
