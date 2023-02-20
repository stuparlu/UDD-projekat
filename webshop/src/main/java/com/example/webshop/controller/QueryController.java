package com.example.webshop.controller;


import com.example.webshop.document.CandidateDocument;
import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.dto.SearchResponseDTO;
import com.example.webshop.mapper.CandidateMapper;
import com.example.webshop.model.Candidate;
import com.example.webshop.repository.CandidateRepository;
import com.example.webshop.service.CandidateDocumentService;
import com.example.webshop.service.ElasticsearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    @GetMapping("/reindex")
    public String reindex() {
        try {
            List<Candidate> candidates = candidateRepository.findAll();
            for (Candidate candidate : candidates) {
                CandidateDocument doc = new CandidateMapper().candidateToCandidateDocument(candidate);
                candidateDocumentService.index(doc);
            }
            return "";
        } catch (Exception e) {
            return "";
        }
    }
    @PostMapping("/advancedSearchForJobs")
    public List<SearchResponseDTO> searchForJobs(@RequestBody SearchQueryDTO searchQueryDto) {
        try {
            List<SearchResponseDTO> responseData = elasticsearchService.executeSearchQuery(searchQueryDto);
            return responseData;
        } catch (Exception e) {
            return null;
        }
    }
}
