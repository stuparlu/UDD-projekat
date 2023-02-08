package com.example.webshop.controller;


import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class QueryController {

    @PostMapping("/searchForJobs")
    public String searchForJobs(@RequestBody String searchQuery){
    searchQuery=searchQuery.substring(0, searchQuery.length()-1);
    System.out.println("YAAAAY");
        return "";
    }
}
