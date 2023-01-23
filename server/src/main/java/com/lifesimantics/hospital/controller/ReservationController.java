package com.lifesimantics.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.lifesimantics.hospital.entity.Reservation;
import com.lifesimantics.hospital.service.ReservationService;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

	@Autowired
	private ReservationService reservationService;
	
	@PostMapping
	public boolean createReservation(@RequestBody Reservation.Request reservation) {
        return reservationService.createReservation(reservation);
    }
	@GetMapping
	public List<Reservation.Response> getReservations(@RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException{
		return reservationService.getReservations(token);
	}
	@PutMapping
	public Reservation.Response updateReservation(@RequestBody Reservation.Request reservation){
		return reservationService.updateReservation(reservation);
	}
	@DeleteMapping
	public boolean deleteReservation(@RequestBody long reservationId) {
		return reservationService.deleteReservation(reservationId);
	}
}
