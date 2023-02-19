package com.example.webshop.service;

import com.example.webshop.dto.SearchQueryDTO;
import org.springframework.http.ResponseEntity;

public interface ElasticsearchService {
    ResponseEntity<String> executeSearchQuery(SearchQueryDTO searchQuery) throws Exception;

    ResponseEntity<String> populateIndexFromDatabase() throws Exception;

}
