package com.example.webshop.service.impl;

import com.example.webshop.helper.IndexUtil;
import com.example.webshop.service.IndexService;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.xcontent.XContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class IndexServiceImpl implements IndexService {
    private static Logger LOG = LoggerFactory.getLogger(IndexServiceImpl.class);
    private final RestHighLevelClient client;

    @Autowired
    public IndexServiceImpl(RestHighLevelClient client) {
        this.client = client;
    }

    @PostConstruct
    public void tryToCreateIndex() {
        final String settings = IndexUtil.loadAsString("elasticsearch-settings.json");
        try {
            boolean indexExists = client.indices().exists(new GetIndexRequest("candidates"), RequestOptions.DEFAULT);
            if (indexExists)
            {
                LOG.warn("Warning, index already exists!");
            }

            final String mappings = IndexUtil.loadAsString("mappings/CandidateDocument.json");
            if (settings == null || mappings == null) {
                LOG.error("Failed to create index");
                return;
            }

            final CreateIndexRequest createIndexRequest = new CreateIndexRequest("candidates");
            createIndexRequest.settings(settings, XContentType.JSON);
            createIndexRequest.mapping(mappings, XContentType.JSON);
            client.indices().create(createIndexRequest, RequestOptions.DEFAULT);
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }
}
