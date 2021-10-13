package com.insurance.app.modal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "InsurerDetails")
public class InsurerDetails {
	
	@Id
	private String id;
	
	private int planId;
	private String insurer;
	public String getId() {
		return id;
	}

	

	public InsurerDetails(int personId, int planId, String insurer, int idv, int premium) {
		super();
		this.planId = planId;
		insurer = insurer;
		this.idv = idv;
		this.premium = premium;
	}



	public void setId(String id) {
		this.id = id;
	}

	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
	}

	public String getInsurer() {
		return insurer;
	}

	public void setInsurer(String insurer) {
		insurer = insurer;
	}

	public int getIdv() {
		return idv;
	}

	public void setIdv(int idv) {
		this.idv = idv;
	}

	public int getPremium() {
		return premium;
	}

	public void setPremium(int premium) {
		this.premium = premium;
	}

	private int idv;
	private int premium;
	
	public InsurerDetails() {
		super();
		// TODO Auto-generated constructor stub
	}



	@Override
	public String toString() {
		return "InsurerDetails : {\"id\": \"" + id + "\", planId\": \"" + planId + "\", insurer\": \"" + insurer
				+ "\", idv\": \"" + idv + "\", premium\": \"" + premium + "}";
	}



	
	
	
	

}
