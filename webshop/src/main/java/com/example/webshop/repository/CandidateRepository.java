package com.example.webshop.repository;

import com.example.webshop.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, String> {
}
