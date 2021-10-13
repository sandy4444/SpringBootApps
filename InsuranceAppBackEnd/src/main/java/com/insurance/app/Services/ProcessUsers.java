package com.insurance.app.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.app.modal.User;
import com.insurance.app.repositry.UserRepo;
import com.mongodb.MongoClientException;
import com.mongodb.MongoException;

@Service
public class ProcessUsers {
	
	@Autowired
	UserRepo  userRepo;
	
	@Autowired
	com.insurance.app.Services.SequenceGeneratorService sequenceGeneratorService;
	
	public  User addUser(User user) {
	
		user.setId(sequenceGeneratorService.generateSequence("User_Sequence"));
		User insertUser = userRepo.insert(user);	
		return insertUser;	
		
	}
	
	public User findUser(String email) {
		
		try {
		return userRepo.findbyEmailId(email).get(0);
		}catch(Exception e) {
			return null;
		}
	}

}
