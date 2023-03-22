package com.example.webshop.service.impl;

import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.dto.SearchResponseDTO;
import com.example.webshop.helper.SearchUtil;
import com.example.webshop.model.Candidate;
import com.example.webshop.repository.CandidateDocumentRepository;
import com.example.webshop.repository.CandidateRepository;
import com.example.webshop.service.ElasticsearchService;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ElasticsearchServiceImpl implements ElasticsearchService {

    private static Logger LOG = LoggerFactory.getLogger(IndexServiceImpl.class);

    @Autowired
    CandidateRepository candidateRepository;
    @Autowired
    CandidateDocumentRepository candidateDocumentRepository;

    private final RestHighLevelClient restHighLevelClient;

    @Autowired
    ElasticsearchServiceImpl(RestHighLevelClient restHighLevelClient) {
        this.restHighLevelClient = restHighLevelClient;
    }

    @Override
    public List<SearchResponseDTO> executeSearchQuery(SearchQueryDTO searchQuery) throws Exception {
        NativeSearchQuery request = SearchUtil.buildSearchRequest(searchQuery);
        if (request == null) {
            LOG.error("Search request creation failed");
            return null;
        }

        try {
            ElasticsearchRestTemplate template = new ElasticsearchRestTemplate(restHighLevelClient);
            SearchHits<Candidate> searchHits = template.search(request, Candidate.class, IndexCoordinates.of("candidates"));
            List<SearchHit<Candidate>> hits = searchHits.getSearchHits();
            List<SearchResponseDTO> dtoList = new ArrayList<>();
            for (SearchHit<Candidate> hit : hits) {
                String id = hit.getId();
                Candidate candidate = candidateRepository.getById(id);
                String highlight = "";
                List<String> cvHighlight = hit.getHighlightField("cv");
                if (cvHighlight.size() > 0) {
                    highlight = highlight.concat("CV:\n").concat(cvHighlight.get(0)).concat(", ");
                }
                List<String> coverHighlight = hit.getHighlightField("cover_letter");
                if (coverHighlight.size() > 0) {
                    highlight = highlight.concat("Cover Letter:\n").concat(coverHighlight.get(0));
                }

                if (highlight.length() > 0) {
                    highlight = highlight.replace("<em>", "").replace("</em>", "");
                } else {
                    highlight = candidate.getFirst_name() + " " + candidate.getLast_name();
                }

                SearchResponseDTO responseDTO = new SearchResponseDTO(
                        id,
                        candidate.getFirst_name(),
                        candidate.getLast_name(),
                        candidate.getEmail(),
                        candidate.getField_of_work(),
                        candidate.getEducation_level(),
                        candidate.getCountry(),
                        candidate.getCity(),
                        candidate.getAddress(),
                        highlight
                        );
                dtoList.add(responseDTO);
            }
            return dtoList;
        } catch (Error e) {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }

    @Override
    public ResponseEntity<String> populateIndexFromDatabase() throws Exception {
        List<Candidate> candidates = candidateRepository.findAll();
        return null;
    }

    public byte[] getCVByID(Long id) {
        String userDirectory = System.getProperty("user.dir");
        Candidate candidate = candidateRepository.getById(id.toString());
        String path = candidate.getCv_location();
        File file = new File("src/main/resources/" + path);
        try {
            FileInputStream inputStream = new FileInputStream(file);
            byte[] contents = new byte[(int) file.length()];
            inputStream.read(contents);
            inputStream.close();
            return contents;
        } catch (Exception e) {
            return null;
        }
    }
    public byte[] getCoverByID(Long id) {
        String userDirectory = System.getProperty("user.dir");
        Candidate candidate = candidateRepository.getById(id.toString());
        String path = candidate.getCover_location();
        File file = new File("src/main/resources/" + path);
        try {
            FileInputStream inputStream = new FileInputStream(file);
            byte[] contents = new byte[(int) file.length()];
            inputStream.read(contents);
            inputStream.close();
            return contents;
        } catch (Exception e) {
            return null;
        }
    }
}
