package com.example.webshop.service;

import com.example.webshop.document.CandidateDocument;

public interface CandidateDocumentService {
    public boolean index(final CandidateDocument candidateDocument);

    public CandidateDocument getById(final String id);
}
