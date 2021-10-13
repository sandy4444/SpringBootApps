package com.insurance.app.modal;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
	
	@Transient
    public static final String SEQUENCE_NAME = "users_sequence";
	
	@Id
	private long id;
	private String firstName;
	private String lastName;
	
	@Indexed(unique = true)
	private String emailId;
	
	private String password;
	
	private Date dob;
	
	@Indexed( unique = true)
	private long vechicleNo;
	
	
	public User() {
		super();
	}

	public User(long id, String firstName, String lastName, String emailId, String password, Date dob,
			long vechicleNo) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.password = password;
		this.dob = dob;
		this.vechicleNo = vechicleNo;
	}

	
	
	public void setId(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public long getVechicleNo() {
		return vechicleNo;
	}
	public void setVechicleNo(long vechicleNo) {
		this.vechicleNo = vechicleNo;
	}

	@Override
	public String toString() {
		return "User : {\"id\":\"" + id + "\", \"firstName\":\"" + firstName + "\", \"lastName\":\"" + lastName
				+ "\", \"emailId\":\"" + emailId + "\", \"password\":\"" + password + "\", \"dob\":\"" + dob
				+ "\", \"vechicleNo\":\"" + vechicleNo + "\"}";
	}
	
}
