package com.voting.backend.repository;

import com.voting.backend.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {

    List<Election> findByActiveTrue();
}