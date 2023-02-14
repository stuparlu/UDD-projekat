package com.example.webshop.mapper;

import com.example.webshop.document.CandidateDocument;
import com.example.webshop.model.Candidate;

public class CandidateMapper {
    public Candidate candidateDocumentToCandidate(CandidateDocument candidateDocument) {
        return new Candidate(
                candidateDocument.getId(),
                candidateDocument.getFirst_name(),
                candidateDocument.getLast_name(),
                candidateDocument.getEmail(),
                candidateDocument.getField_of_work(),
                candidateDocument.getEducation_level(),
                candidateDocument.getCountry(),
                candidateDocument.getCity(),
                candidateDocument.getAddress());
    }

    public CandidateDocument candidateToCandidateDocument(Candidate candidate) {
        return new CandidateDocument(
                candidate.getId(),
                candidate.getFirst_name(),
                candidate.getLast_name(),
                candidate.getEmail(),
                candidate.getField_of_work(),
                candidate.getEducation_level(),
                candidate.getCountry(),
                candidate.getCity(),
                candidate.getAddress());
    }
}
