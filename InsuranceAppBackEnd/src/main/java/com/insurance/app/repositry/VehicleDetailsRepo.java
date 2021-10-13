package com.insurance.app.repositry;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.insurance.app.modal.VehicleDetails;

@Repository
public interface VehicleDetailsRepo extends MongoRepository<VehicleDetails, String> {

	
	@Query("{'personId' : ?0}")
	List<VehicleDetails> findbyPersonId(int i);
}
