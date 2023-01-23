package com.lifesimantics.hospital.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="RESERVATION")
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class Reservation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private long userId;
    
    private String hospitalName;
    
    private String hospitalAddress;
    
    private String hospitalTel;
    
    private String hospitalDepartment;
    
    private String phone;

    private String symptom;

    private LocalDate date;

    private String imageUrl;


    @ManyToOne
    @JoinTable(name="USER_RESERVATION",
               joinColumns=@JoinColumn(name="RESERVATION_ID"),
               inverseJoinColumns=@JoinColumn(name="USER_ID"))
    private Users user;
    

    @Builder @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter @ToString
    public static class Request {
    	private long id;
    	private long userId;
    	private String hospitalName; 
    	private String hospitalAddress;
    	private String hospitalTel;
    	private String hospitalDepartment;
    	private String phone;
        private String symptom;
		private LocalDate date;
        private String imageUrl;
        public static Reservation toReserve(Request request, Users user) {

            return Reservation.builder()
                    .hospitalName(request.getHospitalName())
                    .hospitalAddress(request.getHospitalAddress())
                    .hospitalTel(request.getHospitalTel())
                    .hospitalDepartment(request.getHospitalDepartment())
                    .phone(request.getPhone())
                    .symptom(request.getSymptom())
                    .date(request.getDate())
                    .imageUrl(request.getImageUrl())
                    .userId(request.getUserId())
                    .user(user)
                    .build();
        }
        public static Reservation toUpdate(Reservation oldReservation, Request request,Users user) {
        	return Reservation.builder()
        			.id(oldReservation.getId())
        			.hospitalName(request.getHospitalName())
        			.hospitalAddress(request.getHospitalAddress())
        			.hospitalTel(request.getHospitalTel())
        			.hospitalDepartment(request.getHospitalDepartment())
        			.phone(request.getPhone())
        			.symptom(request.getSymptom())
        			.date(request.getDate())
        			.userId(request.getUserId())
        			.imageUrl(request.getImageUrl())
        			.user(user)
        			.build();
        	
        }
    }

    @Builder @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter @ToString
    public static class Response {

        private long id;
        private String hospitalName; 
    	private String hospitalAddress;
    	private String hospitalTel;
    	private String hospitalDepartment;
        private String phone;
        private long userId;
        private String symptom;
        private LocalDate date;
        private String imageUrl;

        public static Response toResponse(Reservation reservation) {

            return Response.builder()
                    .id(reservation.getId())
                    .hospitalName(reservation.getHospitalName())
                    .hospitalAddress(reservation.getHospitalAddress())
                    .hospitalTel(reservation.getHospitalTel())
                    .hospitalDepartment(reservation.getHospitalDepartment())
                    .phone(reservation.getPhone())
                    .userId(reservation.getUserId())
                    .symptom(reservation.getSymptom())
                    .date(reservation.getDate())
                    .imageUrl(reservation.getImageUrl())
                    .build();
        }
    }

}
