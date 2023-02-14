package com.example.webshop.service;

import org.springframework.http.ResponseEntity;

public interface ElasticsearchService {
    ResponseEntity<String> executeSearchQuery(String searchQuery) throws Exception;

    ResponseEntity<String> populateIndexFromDatabase() throws Exception;

}
