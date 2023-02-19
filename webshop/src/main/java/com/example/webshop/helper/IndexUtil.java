package com.example.webshop.helper;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.Base64;

public class IndexUtil {
    private static Logger LOG = LoggerFactory.getLogger(IndexUtil.class);

    public static String loadAsString(final String path) {
        try {
            final File resource = new ClassPathResource(path).getFile();
            return new String(Files.readAllBytes(resource.toPath()));
        } catch (final Exception e) {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }

    public static String readFile(String filePath) {
        String encodedfile = null;
        File file = new File("src/main/resources/" + filePath);
        System.out.println("Working Directory = " + System.getProperty("user.dir"));

        try {
            FileInputStream fileInputStreamReader = new FileInputStream(file);
            byte[] bytes = new byte[(int) file.length()];
            fileInputStreamReader.read(bytes);
            encodedfile = new String(Base64.getEncoder().encodeToString(bytes));
            return encodedfile;
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return null;
        }
    }
}
