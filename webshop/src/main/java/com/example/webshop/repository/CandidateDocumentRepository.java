package com.example.webshop.repository;

import com.example.webshop.document.CandidateDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface CandidateDocumentRepository extends ElasticsearchRepository<CandidateDocument, String> {
}
