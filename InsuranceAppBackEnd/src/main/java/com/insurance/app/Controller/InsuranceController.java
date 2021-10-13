package com.insurance.app.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.app.Exception.GenericValidation;
import com.insurance.app.Services.ProcessInsurer;
import com.insurance.app.Services.ProcessUsers;
import com.insurance.app.Services.ProcessVechicleDetails;
import com.insurance.app.modal.InsurerDetails;
import com.insurance.app.modal.User;
import com.insurance.app.modal.VehicleDetails;
import com.insurance.app.repositry.InsurerDetailsRepo;
import com.mongodb.MongoException;


@RestController
@RequestMapping("/api")
public class InsuranceController {
	
//	@Autowired
//	private ProcessVechicleDetails vehicle;
	
	@Autowired
	private ProcessUsers userProcessor;
	
	@Autowired
	private ProcessVechicleDetails vehicleProcessor;
	
	@Autowired
	private ProcessInsurer vInsurer;
	
	@PostMapping(value = "/create")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		
		System.out.println("CreateUser method getting called");
		
		ResponseEntity<User> responseEntity = null;
		User result = null;
		try {
			result = userProcessor.findUser(user.getEmailId());
		if(result == null || result.getFirstName().isEmpty())	
			userProcessor.addUser(user);
		else
			throw new GenericValidation("Account already exists with Email: "+ user.getEmailId());
		}catch(Exception e) {
			System.err.println("Error Details : " + e);
			throw new GenericValidation(e.getMessage());
		}
		
		return responseEntity.of(Optional.of(user));
	}
	
	@GetMapping(value = "/findUser/{email}")
	@CrossOrigin(origins = "http://localhost:3000")
	public User getUser(@PathVariable (value =  "email") String emailId){
		
		System.out.println("getUser method getting called for : " + emailId);
		
		ResponseEntity<User> responseEntity = null;
		try {
			
			return userProcessor.findUser(emailId);
		}catch(MongoException e) {
			System.err.println("Error Details : " + e);
			throw new GenericValidation(e.getMessage());
		}
	}
	
	
	@PostMapping(value = "/validate")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<User> validateUser(@RequestBody User user) throws GenericValidation {
		
		System.out.println("CreateUser method getting called :" + user);
		
		ResponseEntity<User> responseEntity = null;
		User result = null;
		try {
			result = userProcessor.findUser(user.getEmailId());
			if(null == result || result.getEmailId().isEmpty()) {
				throw new GenericValidation("No Record found with Email: "+ user.getEmailId());
			}else if(!result.getPassword().equals(user.getPassword())) {
				throw new GenericValidation("Password doesn't match. Please retry");
			}
		}catch(Exception e) {
			System.err.println("Error Details : " + e);
			throw new GenericValidation(e.getMessage());
		}
		
		return responseEntity.of(Optional.of(result));
	}
	
	@PostMapping(value = "/vehicleDetails")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<VehicleDetails> getVechileDetails(@RequestBody VehicleDetails vehicleDetails) throws GenericValidation {
		
		System.out.println("getVechileDetails method getting called :" + vehicleDetails);
		
		ResponseEntity<User> responseEntity = null;
		VehicleDetails result = null;
		try {
			result = vehicleProcessor.findVehicleDetails(vehicleDetails.getPersonId());
			
			if(null == result) {
				result = vehicleDetails;
			}
		}catch(Exception e) {
			System.err.println("Error Details : " + e);
			throw new GenericValidation(e.getMessage());
		}
		
		return responseEntity.of(Optional.of(result));
	}
	
	@PostMapping(value = "/updateVechile")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<VehicleDetails> updateVechileDetails(@RequestBody VehicleDetails vehicleDetails) throws GenericValidation {
		
		System.out.println("updateVechileDetails method getting called :" + vehicleDetails);
		
		ResponseEntity<User> responseEntity = null;
		VehicleDetails result = null;
		try {
			result = vehicleProcessor.updateVehicleDetails(vehicleDetails);
			
		}catch(Exception e) {
			System.err.println("Error Details : " + e);
			throw new GenericValidation(e.getMessage());
		}
		
		return responseEntity.of(Optional.of(result));
	}
	
	@PostMapping(value = "/insurerDetails")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<InsurerDetails>> getInsurerDetails() throws GenericValidation {
		
		System.out.println("getInsurerDetails method getting called");
		
		ResponseEntity<User> responseEntity = null;
		List<InsurerDetails> result = null;
		try {
			result = vInsurer.findAllPlans();
			System.err.println(result);
			
		}catch(Exception e) {
			//System.out.println("Error Details : " + e);
			System.err.println("Error Details : " + e);
			throw new GenericValidation(e.getMessage());
		}
		
		return responseEntity.of(Optional.of(result));
	}
}
