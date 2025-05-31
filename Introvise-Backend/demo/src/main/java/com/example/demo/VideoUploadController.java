package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/upload")
@CrossOrigin("*")
public class VideoUploadController {

    private final GoogleDriveService driveService;

    @Autowired
    public VideoUploadController(GoogleDriveService driveService) {
        this.driveService = driveService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadVideo(
            @RequestParam("video") MultipartFile video,
            @RequestParam("questionId") String questionId,
            @RequestParam("questionText") String questionText
    ) {
        try {
            // Static Google Drive folder ID — update if needed
            String responseFromFlask = driveService.uploadFileAndAnalyze(
                    video,
                    questionText,  // description
                    "1pgqk824Y-WZTEBwYdLIE9cQqVH9jFrTC"  // folderId
            );

            return ResponseEntity.ok("Uploaded and analyzed successfully. Response: " + responseFromFlask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload or analysis failed: " + e.getMessage());
        }
    }
}


//
//@RestController
//@RequestMapping("/api/upload")
//@CrossOrigin("*")
//public class VideoUploadController {
//
//    private final GoogleDriveService driveService;
//
//    @Autowired
//    public VideoUploadController(GoogleDriveService driveService) {
//        this.driveService = driveService;
//    }
//
//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<String> uploadVideo(
//            @RequestParam("video") MultipartFile video,
//            @RequestParam("questionId") String questionId,
//            @RequestParam("questionText") String questionText
//    ) {
//        try {
//            // Assuming folderId is static for now; update if needed
//            String fileId = driveService.uploadFile(video, questionText, "1pgqk824Y-WZTEBwYdLIE9cQqVH9jFrTC");
//            return ResponseEntity.ok("Uploaded successfully with File ID: " + fileId);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Upload failed: " + e.getMessage());
//        }
//    }
//}