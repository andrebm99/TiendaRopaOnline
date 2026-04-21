package com.store.spring.app.Services;

import org.springframework.beans.factory.annotation.Autowired;
import com.store.spring.app.Repositories.ContactRepository;

public class ContactService {
    @Autowired
    ContactRepository repository;

}
