package com.store.spring.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainAppApplication.class, args);
		System.out.println("La Swagger corre en:  http://localhost:8080/swagger");
		System.out.println("La api html corre en:  http://localhost:8080/");
	}

}
