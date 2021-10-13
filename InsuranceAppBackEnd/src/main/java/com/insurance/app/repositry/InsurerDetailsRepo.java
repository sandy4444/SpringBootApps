package com.insurance.app.repositry;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.insurance.app.modal.InsurerDetails;
import com.insurance.app.modal.VehicleDetails;

@Repository
public interface InsurerDetailsRepo extends MongoRepository<InsurerDetails, String> {

	
	@Query("{'planId' : ?0}")
	List<InsurerDetails> findbyPlanId(int i);
}
