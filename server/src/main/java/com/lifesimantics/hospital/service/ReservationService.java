package com.lifesimantics.hospital.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.lifesimantics.hospital.entity.Reservation;

@Service
public interface ReservationService {
	public boolean createReservation(Reservation.Request request);
	public List<Reservation.Response> getReservations(String token) throws JsonMappingException, JsonProcessingException;
	public Reservation.Response updateReservation(Reservation.Request reservation);
	public boolean deleteReservation(long reservationId);
}
