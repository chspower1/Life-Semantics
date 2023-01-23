package com.lifesimantics.hospital.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.TreeTraversingParser;
import com.lifesimantics.hospital.entity.Reservation;
import com.lifesimantics.hospital.entity.Reservation.Request;
import com.lifesimantics.hospital.entity.Reservation.Response;
import com.lifesimantics.hospital.entity.Users;
import com.lifesimantics.hospital.repository.ReservationRepository;
import com.lifesimantics.hospital.repository.UserRepository;

@Service
public class ReservationServiceImpl implements ReservationService {
	

	@Autowired 
	private ReservationRepository reservationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	private AuthService authService= new AuthServiceImpl();  
	
	@Override
	public boolean createReservation(Request request) {
		if(searchReservation(request)) {
		Users savedUser = userRepository.findById(request.getUserId()).get();
		reservationRepository.save(Reservation.Request.toReserve(request, savedUser));
		return true;
		}else return false;
	}
	
	@Override
	public boolean deleteReservation(long reservationId) {
		if(reservationRepository.findById(reservationId).get()!=null) {
		reservationRepository.deleteById(reservationId);
		return true;
		}
		else return false;
	}

	@Override
	public Response updateReservation(Request reservation) {
		Users user = userRepository.findById(reservation.getUserId()).get();
		Reservation oldReservation = reservationRepository.findById(reservation.getId()).get();
		oldReservation = Reservation.Request.toUpdate(oldReservation,reservation, user);
		reservationRepository.save(oldReservation);
		return Reservation.Response.toResponse(reservationRepository.findById(reservation.getId()).get());
	}

	private boolean searchReservation(Request request) {
		Reservation reservation = reservationRepository.findByHospitalNameAndHospitalAddressAndDateAndUserId
				(request.getHospitalName(), request.getHospitalAddress(), request.getDate(), request.getUserId());
		if(reservation==null) return true;
		else return false;
	}

	
	@Override
	public List<Response> getReservations(String token) throws JsonMappingException, JsonProcessingException {
		List<Response> response = new ArrayList<Reservation.Response>();
		long userId = checkToken(token);
		LocalDate today=LocalDate.now();
		List<Reservation> reservations = reservationRepository.findAllByUserIdAndDateGreaterThanEqual
				(userId, today);
		reservations.stream().forEach(reservation -> response.add(Reservation.Response.toResponse(reservation)));
		
		return response;
		
	}
	
	private long checkToken(String token) throws JsonMappingException, JsonProcessingException {
		Map<String, Object> map=authService.checkLogin(token);
		ObjectMapper mapper = new ObjectMapper();
		Users.Response user = mapper.readValue((String) map.get("user"), Users.Response.class);
		
		return user.getId();
	}
	
	
}
