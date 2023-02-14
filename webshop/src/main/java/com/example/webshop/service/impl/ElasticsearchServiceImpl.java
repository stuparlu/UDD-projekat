package com.example.webshop.service.impl;

import com.example.webshop.model.Candidate;
import com.example.webshop.repository.CandidateDocumentRepository;
import com.example.webshop.repository.CandidateRepository;
import com.example.webshop.service.ElasticsearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElasticsearchServiceImpl implements ElasticsearchService {

    @Autowired
    CandidateRepository candidateRepository;
    @Autowired
    CandidateDocumentRepository candidateDocumentRepository;

    @Override
    public ResponseEntity<String> executeSearchQuery(String searchQuery) throws Exception {
        return null;
    }

    @Override
    public ResponseEntity<String> populateIndexFromDatabase() throws Exception {
        List<Candidate> candidates = candidateRepository.findAll();
        return null;
    }
}
