package com.example.webshop.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="candidates")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Candidate {
    @Id
    @SequenceGenerator(name = "account_sequence_generator", sequenceName = "account_sequence", initialValue = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_sequence_generator")
    @Column(name = "id", unique = true)
    protected String id;
    @Column(name = "first_name", nullable = false)
    protected String first_name;
    @Column(name = "last_name", nullable = false)
    protected String last_name;
    @Column(name = "email", nullable = false)
    protected String email;
    @Column(name = "field_of_work", nullable = false)
    protected String field_of_work;
    @Column(name = "education_level", nullable = false)
    protected Integer education_level;
    @Column(name = "country", nullable = false)
    protected String country;
    @Column(name = "city", nullable = false)
    protected String city;
    @Column(name = "address", nullable = false)
    protected String address;
}
