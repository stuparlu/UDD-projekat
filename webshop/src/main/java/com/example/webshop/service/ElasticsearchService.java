package com.example.webshop.service;

import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.dto.SearchResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ElasticsearchService {
    List<SearchResponseDTO> executeSearchQuery(SearchQueryDTO searchQuery) throws Exception;

    ResponseEntity<String> populateIndexFromDatabase() throws Exception;

}
