package com.example.webshop.helper;

import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.service.impl.IndexServiceImpl;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class SearchUtil {
    private static Logger LOG = LoggerFactory.getLogger(IndexServiceImpl.class);

    private SearchUtil() {}

    public static QueryBuilder getQueryBuilder(SearchQueryDTO dto) {
        if (dto == null) {
            return null;
        }

        List<String> strings = new ArrayList<>(
                Arrays.asList("first_name", "last_name", "education_level", "cv", "cover_letter")
        );

//        if()

//        if (fields.isEmpty()) {
//            return null;
//        }

//        if (fields.size() > 1) {
//            MultiMatchQueryBuilder queryBuilder = QueryBuilders.multiMatchQuery(dto.getSearchTerm())
//                .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
//                .operator(Operator.AND);
//            fields.forEach(queryBuilder::field);
//            return queryBuilder;
//        }


//        return fields.stream()
//                .findFirst()
//                .map(field -> QueryBuilders.matchQuery(field, dto.getSearchTerm())
//                        .operator(Operator.OR))
//                .orElse(null);
        return null;
    }

    public static SearchRequest buildSearchRequest(SearchQueryDTO dto) {
        try {
            SearchSourceBuilder builder = new SearchSourceBuilder().postFilter(getQueryBuilder(dto));
            SearchRequest searchRequest = new SearchRequest("candidates");
            searchRequest.source(builder);
            return  searchRequest;
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }
}
