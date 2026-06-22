package com.srgec.online_book_store_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.srgec.online_book_store_management_system.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}