package com.lifesimantics.hospital.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="USERS")
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class Users {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private String accountId;

    private String password;

    private String name;

    @OneToMany(mappedBy="user")

    private List<Reservation> reservations;

    @Builder @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter @ToString
    public static class Request {

        private String accountId;
        private String password;
        private String name;

        public static Users toCreate(Request request) {

            return Users.builder()
                    .accountId(request.getAccountId())
                    .password(request.getPassword())
                    .name(request.getName())
                    .reservations(new ArrayList())
                    .build();
        }
    }

    @Builder @NoArgsConstructor @AllArgsConstructor
    @Getter @Setter @ToString
    public static class Response {

        private long id;
        private String accountId;
        private String name;

        private List<Reservation.Response> reservations;

        public static Response toResponse(Users user) {
            List<Reservation.Response> reservations = new ArrayList<Reservation.Response>();
            user.getReservations().stream()
                    .forEach(reservation -> reservations.add(Reservation.Response.toResponse(reservation)));

            return Response.builder()
                    .id(user.getId())
                    .accountId(user.getAccountId())
                    .name(user.getName())
                    .reservations(reservations)
                    .build();
        }
    }
}
