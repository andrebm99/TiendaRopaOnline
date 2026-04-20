package com.store.spring.app.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.spring.app.Models.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long>{
    
}
