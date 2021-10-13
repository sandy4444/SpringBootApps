package com.insurance.app.modal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "VehicleDetails")
public class VehicleDetails {
	
	@Id
	private String id;
	
	@Indexed(unique = true)
	private int personId;
	private String planId;
	private String vehicle;
	private Boolean PAC;
	private String city;
	private String manufacture;
	private String model;
	private String year;
	public VehicleDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public VehicleDetails(String id, int personId, String planId, String vehicleNo, Boolean pAC, String city,
			String manufacture, String model, String year) {
		super();
		this.id = id;
		this.personId = personId;
		this.planId = planId;
		this.vehicle = vehicleNo;
		PAC = pAC;
		this.city = city;
		this.manufacture = manufacture;
		this.model = model;
		this.year = year;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getPersonId() {
		return personId;
	}
	public void setPersonId(int personId) {
		this.personId = personId;
	}
	public String getPlanId() {
		return planId;
	}
	public void setPlanId(String planId) {
		this.planId = planId;
	}
	public String getVehicle() {
		return vehicle;
	}
	public void setVehicle(String vehicleNo) {
		this.vehicle = vehicleNo;
	}	
	public Boolean getPAC() {
		return PAC;
	}
	public void setPAC(Boolean pAC) {
		PAC = pAC;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getManufacture() {
		return manufacture;
	}
	public void setManufacture(String manufacture) {
		this.manufacture = manufacture;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	
	@Override
	public String toString() {
		return "VehicleDetails : {\"id\":\"" + id + "\", \"personId\":\"" + personId + "\", \"planId\":\"" + planId
				+ "\", \"vehicleNo\":\"" + vehicle + "\", \"PAC\":\"" + PAC + "\", \"city\":\"" + city
				+ "\", \"manufacture\":\"" + manufacture + "\", \"model\":\"" + model + "\", \"year\":\"" + year
				+ "\"}";
	}
	
	

}
