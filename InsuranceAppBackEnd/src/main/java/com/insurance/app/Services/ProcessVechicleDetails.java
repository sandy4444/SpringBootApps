package com.insurance.app.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.insurance.app.modal.VehicleDetails;
import com.insurance.app.repositry.VehicleDetailsRepo;
import com.mongodb.MongoException;


@Service
public class ProcessVechicleDetails {
	
	@Autowired
	VehicleDetailsRepo vDetailsRepo;
	
	
	public  VehicleDetails updateVehicleDetails(VehicleDetails vehicleDetails) {
		VehicleDetails dummy = null;
		dummy = findVehicleDetails(vehicleDetails.getPersonId());
		
		if(dummy == null) {
			return vDetailsRepo.insert(vehicleDetails);
		}else {
			dummy.setCity(vehicleDetails.getCity());
			dummy.setManufacture(vehicleDetails.getManufacture());
			dummy.setModel(vehicleDetails.getModel());
			dummy.setPAC(vehicleDetails.getPAC());
			dummy.setPlanId(vehicleDetails.getPlanId());
			dummy.setYear(vehicleDetails.getYear());
			dummy.setVehicle(vehicleDetails.getVehicle());
			return vDetailsRepo.save(dummy);
		}
	}
	
	
	public VehicleDetails findVehicleDetails(int i) {
		
		try {
			return vDetailsRepo.findbyPersonId(i).get(0);
		}catch (Exception  e) {
			return null;
		}
	}
	
	
	
}
