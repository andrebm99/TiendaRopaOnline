package com.store.spring.app.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="contact")
public class Contact{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id", unique = true)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "email", nullable = false)
    private String email; 

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "message", nullable = false)
    private String message;

    public Contact() {
    }

    public Contact(Integer id, String name, String lastname, String email, String phone, String message) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public int hashCode(){
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash; 
    }


    @Override
    public boolean equals(Object object){
        if(!(object instanceof Contact)){
            return false; 
        }

        Contact other = (Contact) object; 

        if((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))){
            return false; 
        }
        return true; 
    }
}
