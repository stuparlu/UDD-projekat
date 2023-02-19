package com.example.webshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchQueryDTO {
    private String first_name;
    private String last_name;
    private Integer education_level;
    private String cv;
    private String cover_letter;

    public  String getSearchTerm(String fieldName) {
        if (fieldName.equals("first_name")) {
            return first_name;
        } else if (fieldName.equals("last_name")) {
            return last_name;
        } else if (fieldName.equals("education_level")) {
            return education_level.toString();
        } else if (fieldName.equals("cv")) {
            return cv;
        } else if (fieldName.equals("cover_letter")) {
            return cover_letter;
        } else {
            return null;
        }
    }
}
