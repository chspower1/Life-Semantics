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

    private int hospitalId;

    private String phone;

    private String symptom;

    private LocalDate date;

    private String imageUrl;

    private String checkOverlap;

    @ManyToOne
    @JoinTable(name="USER_RESERVATION",
               joinColumns=@JoinColumn(name="RESERVATION_ID"),
               inverseJoinColumns=@JoinColumn(name="USER_ID"))
    private Users user;

    @Builder @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter @ToString
    public static class Request {

        private int hospitalId;
        private String phone;

        private String symptom;

        private LocalDate date;

        private String imageUrl;

        private long userId;

        public static Reservation toReserve(Request request, Users user) {

            return Reservation.builder()
                    .hospitalId(request.getHospitalId())
                    .phone(request.getPhone())
                    .symptom(request.getSymptom())
                    .date(request.getDate())
                    .imageUrl(request.getImageUrl())
                    .checkOverlap(String.format("%s_%s_%s", request.getUserId(), request.getHospitalId(), request.getDate()))
                    .user(user)
                    .build();
        }
    }

    @Builder @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter @ToString
    public static class Response {

        private long id;
        private int hospitalId;
        private String phone;

        private String symptom;

        private LocalDate date;

        private String imageUrl;

        private String checkOverlap;

        public static Response toResponse(Reservation reservation) {

            return Response.builder()
                    .id(reservation.getId())
                    .hospitalId(reservation.getHospitalId())
                    .phone(reservation.getPhone())
                    .symptom(reservation.getSymptom())
                    .date(reservation.getDate())
                    .imageUrl(reservation.getImageUrl())
                    .checkOverlap(reservation.getCheckOverlap())
                    .build();
        }
    }

}
