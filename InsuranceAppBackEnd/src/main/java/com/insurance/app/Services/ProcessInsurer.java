package com.insurance.app.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.app.modal.InsurerDetails;
import com.insurance.app.modal.User;
import com.insurance.app.repositry.InsurerDetailsRepo;
import com.insurance.app.repositry.UserRepo;
import com.mongodb.MongoClientException;

@Service
public class ProcessInsurer {
	
	@Autowired
	InsurerDetailsRepo  insurerDetailsRepo;
	
	
	
	public InsurerDetails findByPlanId(int planId) {
		
		try {
		return insurerDetailsRepo.findbyPlanId(planId).get(0);
		}catch(MongoClientException e) {
			return null;
		}
	}
	
	public List<InsurerDetails> findAllPlans() {
		
		try {
		return insurerDetailsRepo.findAll();
		}catch(MongoClientException e) {
			return null;
		}
	}
}
