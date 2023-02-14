package com.example.webshop.service.impl;

import org.elasticsearch.action.get.GetResponse;
import com.example.webshop.document.CandidateDocument;
import com.example.webshop.mapper.CandidateMapper;
import com.example.webshop.service.CandidateDocumentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.xcontent.XContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidateDocumentServiceImpl implements CandidateDocumentService {
    private static Logger LOG = LoggerFactory.getLogger(IndexServiceImpl.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private final RestHighLevelClient restHighLevelClient;

    @Autowired
    CandidateDocumentServiceImpl(RestHighLevelClient restHighLevelClient) {
        this.restHighLevelClient = restHighLevelClient;
    }

    public boolean index(final CandidateDocument candidateDocument) {
        try {
            final String candidateDocumentString = MAPPER.writeValueAsString(candidateDocument);
            IndexRequest indexRequest = new IndexRequest("candidates");
            indexRequest.id(candidateDocument.getId().toString());
            indexRequest.source(candidateDocumentString, XContentType.JSON);
            IndexResponse indexResponse = restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
            return indexResponse != null && indexResponse.status().equals(RestStatus.OK);
        }
        catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return false;
        }
    }

    public CandidateDocument getById(final String id) {
        try {
            final GetResponse documentFields = restHighLevelClient.get(
                    new GetRequest("candidates", id.toString()),
                    RequestOptions.DEFAULT
            );
            if (documentFields == null) {
                return null;
            }
            return MAPPER.readValue(documentFields.getSourceAsString(), CandidateDocument.class);
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }
}
