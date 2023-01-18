package com.lifesimantics.hospital.repository;

import com.lifesimantics.hospital.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    public Users findByAccountId(String accountId);
    public Users findByAccountIdAndPassword(String accountId, String Password);
}
