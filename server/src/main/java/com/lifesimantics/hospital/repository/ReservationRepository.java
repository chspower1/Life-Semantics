package com.lifesimantics.hospital.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifesimantics.hospital.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
	Reservation findByHospitalNameAndHospitalAddressAndDateAndUserId
	(String hospitalName, String hospitalAddress, LocalDate date, long userId);
	
	List<Reservation> findAllByUserIdAndDateGreaterThanEqual(long userId,LocalDate today);
	
}
