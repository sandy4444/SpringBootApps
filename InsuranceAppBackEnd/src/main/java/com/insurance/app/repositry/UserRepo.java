package com.insurance.app.repositry;

import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.insurance.app.modal.User;

@Repository
public interface UserRepo extends MongoRepository<User, Long> {

	@Query("{'emailId' : ?0}")
	List<User> findbyEmailId(String emailId);
}
