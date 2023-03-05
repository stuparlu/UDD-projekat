package com.example.webshop.helper;

import com.example.webshop.dto.SearchQueryDTO;
import com.example.webshop.service.impl.IndexServiceImpl;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

public final class SearchUtil {
    private static Logger LOG = LoggerFactory.getLogger(IndexServiceImpl.class);

    private SearchUtil() {}

    public static QueryBuilder getQueryBuilder(String fieldName, String fieldValue) {
        if (fieldName.equals("education_level")) {
            return QueryBuilders.matchQuery(fieldName, Integer.parseInt(fieldValue));
        } else if (fieldName.equals("cv") || fieldName.equals("cover_letter")) {
            return QueryBuilders.matchPhraseQuery(fieldName, fieldValue).slop(2);
        }
        MatchPhraseQueryBuilder builder = QueryBuilders.matchPhraseQuery(fieldName, fieldValue);
        return builder;
    }

    public static QueryBuilder getDistanceBuilder(String location, Integer distance) {
            return QueryBuilders.geoDistanceQuery("location").point(mappedPoint(location)).distance(distance, DistanceUnit.KILOMETERS);
    }

    public static GeoPoint mappedPoint(String location) {
        if (location.equals("Novi Sad")) {
            return new GeoPoint(45.2396, 19.8227);
        } else if (location.equals("Belgrade")) {
            return new GeoPoint(44.8125, 20.4612);
        } else {
            return new GeoPoint(0, 0);
        }
    }
    public static SearchRequest buildSearchRequest(SearchQueryDTO dto) {
        if (dto == null) {
            return null;
        }
        List<String> strings = new ArrayList<>(
                Arrays.asList("first_name", "last_name", "education_level", "cv", "cover_letter", "location", "distance")
        );
        List<QueryBuilder> builders = new ArrayList<QueryBuilder>();
        for (String field : strings) {
            if (field.equals("education_level")) {
                if (dto.getSearchTerm(field) != null) {
                    builders.add(getQueryBuilder(field, dto.getSearchTerm(field)));
                }
            } else if (field.equals("cv") || field.equals("cover_letter")) {
                if (dto.getSearchTerm(field) != null && !dto.getSearchTerm(field).equals("")) {
                    String encodedString = dto.getSearchTerm(field);
                    builders.add(getQueryBuilder(field, encodedString));
                }
            } else if (field.equals("location")) {
                String location = dto.getSearchTerm("location");
                if (location != null && !location.equals("")) {
                    String distanceStr = dto.getSearchTerm("distance");
                    if (distanceStr != null) {
                        Integer distance = Integer.parseInt(distanceStr);
                        if (distance > 0) {
                            builders.add(getDistanceBuilder(location, distance));
                        }
                    }
                }
            }
            else if (field.equals("distance")) {
                continue;
            }
            else {
                if (dto.getSearchTerm(field) != null && !dto.getSearchTerm(field).equals("")) {
                    builders.add(getQueryBuilder(field, dto.getSearchTerm(field)));
                }
            }
        }

        BoolQueryBuilder builder = QueryBuilders.boolQuery();
        for (QueryBuilder build : builders) {
            if (build.getName().equals("geo_distance")) {
                builder.mustNot(build);
            } else {
                builder.must(build);
            }
        }

        try {
            SearchSourceBuilder source = new SearchSourceBuilder().postFilter(builder);


            HighlightBuilder highlightBuilder = new HighlightBuilder();
            HighlightBuilder.Field cvHighlightField = new HighlightBuilder.Field("cv");
            cvHighlightField.highlighterType("plain");
            highlightBuilder.field(cvHighlightField);
            HighlightBuilder.Field coverHighlightField = new HighlightBuilder.Field("cover_letter");
            coverHighlightField.highlighterType("plain");
            highlightBuilder.field(coverHighlightField);
            source.highlighter(highlightBuilder);

            SearchRequest searchRequest = new SearchRequest("candidates");
            searchRequest.source(source);
            return  searchRequest;
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }
}
