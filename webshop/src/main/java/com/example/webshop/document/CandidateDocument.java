package com.example.webshop.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Setting;

import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(indexName = "candidates")
@Setting(settingPath = "elasticsearch-settings.json")
public class CandidateDocument {
    @Id
    protected String id;

    protected String first_name;

    protected String last_name;

    protected String email;

    protected String field_of_work;

    protected Integer education_level;

    protected String country;

    protected String city;

    protected String address;

    protected String cv;

    protected String cover_letter;
}
