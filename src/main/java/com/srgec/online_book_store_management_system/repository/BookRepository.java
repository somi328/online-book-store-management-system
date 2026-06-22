package com.srgec.online_book_store_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srgec.online_book_store_management_system.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

}