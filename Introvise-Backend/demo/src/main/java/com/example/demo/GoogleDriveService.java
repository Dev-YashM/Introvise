package com.example.demo;

import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.auth.oauth2.Credential;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;

import com.example.demo.service.VideoAnalysisService;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ClassPathResource;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.util.Collections;

@Service
public class GoogleDriveService {

    private static final String APPLICATION_NAME = "Interview Video Uploader";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    private Drive driveService;

    @Autowired
    private VideoAnalysisService videoAnalysisService;

    @PostConstruct
    public void init() throws Exception {
        InputStream in = new ClassPathResource("credentials.json").getInputStream();
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                clientSecrets,
                Collections.singletonList(DriveScopes.DRIVE_FILE)
        ).setDataStoreFactory(new FileDataStoreFactory(new java.io.File("tokens")))
                .setAccessType("offline").build();

        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");

        driveService = new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public String uploadFileAndAnalyze(MultipartFile file, String description, String folderId) throws IOException {
        // Upload the file to Google Drive
        File fileMetadata = new File();
        fileMetadata.setName(file.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(folderId));
        fileMetadata.setDescription(description);

        FileContent mediaContent = new FileContent(file.getContentType(), convertToFile(file));
        File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        String fileId = uploadedFile.getId();

        // Set permission to anyone with the link
        Permission permission = new Permission()
                .setType("anyone")
                .setRole("reader");
        driveService.permissions().create(fileId, permission).execute();

        // Create the shareable Google Drive link
        String driveLink = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";

        // Send the link to the Flask API via the VideoAnalysisService
        String analysisResponse = videoAnalysisService.sendLinkForAnalysis(driveLink);

        return analysisResponse; // or return driveLink if you want to return the URL instead
    }

    private java.io.File convertToFile(MultipartFile multipartFile) throws IOException {
        java.io.File convFile = java.io.File.createTempFile("upload-", multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(multipartFile.getBytes());
        }
        return convFile;
    }
}
