package com.example.demo.controller;

import com.example.demo.service.VideoAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/video")
public class VideoAnalysisController {

    @Autowired
    private VideoAnalysisService videoAnalysisService;

    @PostMapping("/analyze")
    public String analyzeVideo(@RequestBody String driveLink) {
        return videoAnalysisService.sendLinkForAnalysis(driveLink);
    }
}
