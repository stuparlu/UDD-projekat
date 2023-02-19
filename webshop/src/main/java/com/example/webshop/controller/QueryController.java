package com.example.webshop.controller;


import com.example.webshop.document.CandidateDocument;
import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.helper.SearchUtil;
import com.example.webshop.mapper.CandidateMapper;
import com.example.webshop.model.Candidate;
import com.example.webshop.repository.CandidateRepository;
import com.example.webshop.service.CandidateDocumentService;
import com.example.webshop.service.ElasticsearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class QueryController {

    @Autowired
    ElasticsearchService elasticsearchService;

    @Autowired
    CandidateDocumentService candidateDocumentService;

    @Autowired
    CandidateRepository candidateRepository;

    @PostMapping("/searchForJobs")
    public String searchForJobs(@RequestBody String searchQuery) {
        searchQuery = searchQuery.substring(0, searchQuery.length()-1);
        List<String> list = new ArrayList<>();
        try {
//            elasticsearchService.executeSearchQuery(dto);
//            elasticsearchService.populateIndexFromDatabase();


//            Optional<Candidate> cand = candidateRepository.findById("0");
//            CandidateDocument doc = new CandidateMapper().candidateToCandidateDocument(cand.get());
//            candidateDocumentService.index(doc);

//            CandidateDocument cand = candidateDocumentService.getById("0");


            return "";
        } catch (Exception e) {
            return "";
        }
    }
    @PostMapping("/advancedSearchForJobs")
    public String searchForJobs(@RequestBody SearchQueryDTO searchQueryDto) {
        try {
            elasticsearchService.executeSearchQuery(searchQueryDto);
            return "";
        } catch (Exception e) {
            return "";
        }
    }
}
