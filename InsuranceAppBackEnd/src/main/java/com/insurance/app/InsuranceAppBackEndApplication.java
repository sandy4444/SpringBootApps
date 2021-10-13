package com.insurance.app;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.insurance.app.modal.User;
import com.insurance.app.repositry.UserRepo;

@SpringBootApplication
public class InsuranceAppBackEndApplication implements CommandLineRunner {
	
	@Autowired
	UserRepo  userRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(InsuranceAppBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub

	}

}
