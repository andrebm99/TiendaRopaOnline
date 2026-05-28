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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.store.spring.app.Models.Contact;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@CrossOrigin(origins = "http://localhost:8080")
@Tag(name = "Contacto", description = "Endpoint para formulario de contacto.")
@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactInterface contactInterface;

    public ContactController(ContactInterface contactInterface) {
        this.contactInterface = contactInterface;
    } 

    @GetMapping
    @Operation(summary = "LISTAR TODOS LOS MENSAJES", description = "Mostrar todos los mensajes recibidos.")
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

    @GetMapping("/{id}")
    @Operation(summary = "BUSCAR MENSAJE", description = "Mostrar un mensaje recibido.")
    public ResponseEntity<Contact> getById(@PathVariable("id") Integer id) {
        try{
            Contact contact = contactInterface.obtenerPorId(id); 

            if(contact == null){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
            }

            return new ResponseEntity<>(contact, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    
    @PostMapping
        @Operation(summary = "NUEVO MENSAJE", description = "Formulario de contacto para el sistema de ventas.")
    public ResponseEntity<Contact> create(@RequestBody Contact contact) {
        try{
            Contact newContact = contactInterface.createContact(contact); 
            return new ResponseEntity<>(newContact, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "ELIMINAR MENSAJE", description = "Eliminar por id")
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

    @PutMapping("/{id}")
    @Operation(summary = "ACTUALIZAR|MODIFICAR MENSAJE ENVIADO", description = "Modifica los datos de un formulario de contacto existente.")
    public ResponseEntity<Contact> update(@PathVariable("id") Integer id, @RequestBody Contact contact) {
        try {
            Contact updatedContact  = contactInterface.actualizarContact(id, contact);
            if (updatedContact == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedContact, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
