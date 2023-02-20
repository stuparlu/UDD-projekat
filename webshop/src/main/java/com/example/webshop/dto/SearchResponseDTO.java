package com.example.webshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseDTO {
    private String id;
    private String first_name;
    private String last_name;
    private String email;
    private String field_of_work;
    private Integer education_level;
    private String country;
    private String city;
    private String address;
    private String highlight;
}
