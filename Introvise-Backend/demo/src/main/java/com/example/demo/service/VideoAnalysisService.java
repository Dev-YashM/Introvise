package com.example.demo.service;


import com.example.demo.dto.DriveLinkRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class VideoAnalysisService {

    private static final String FLASK_API_URL = "http://127.0.0.1:5001/analyze";

    public String sendLinkForAnalysis(String driveLink) {
        RestTemplate restTemplate = new RestTemplate();

        DriveLinkRequest request = new DriveLinkRequest(driveLink);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<DriveLinkRequest> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(FLASK_API_URL, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            return "Error calling Flask API: " + e.getMessage();
        }
    }
}
