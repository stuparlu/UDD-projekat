package com.example.webshop.controller;


import com.example.webshop.document.CandidateDocument;
import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.dto.SearchResponseDTO;
import com.example.webshop.mapper.CandidateMapper;
import com.example.webshop.model.Candidate;
import com.example.webshop.repository.CandidateRepository;
import com.example.webshop.service.CandidateDocumentService;
import com.example.webshop.service.ElasticsearchService;
import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
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

    @GetMapping(value = "/getCvByID/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadPDF(@PathVariable Long id) throws IOException {
        try {
            byte [] bytes = elasticsearchService.getCVByID(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("inline").filename("filename.pdf").build());
            headers.setContentLength(bytes.length);
            return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping(value = "/getCoverByID/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadCover(@PathVariable Long id) throws IOException {
        try {
            byte [] bytes = elasticsearchService.getCoverByID(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("inline").filename("filename.pdf").build());
            headers.setContentLength(bytes.length);
            return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }
}
