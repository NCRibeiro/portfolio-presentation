package com.nivea.portfolio_presentation.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nivea.portfolio_presentation.model.Project;

@Service
public class ProjectService {

    private final List<Project> projects = Arrays.asList(
        new Project(
            1,
            "OneAPIIRS",
            "A unified fiscal-data modernization platform.",
            "Java, Python, FastAPI, PostgreSQL, Docker, Flutter",
            "https://github.com/NCRibeiro/OneAPIIRS",
            "OneAPIIRS bridges legacy COBOL/IRS systems with modern REST APIs. It enables fiscal data modernization, providing real-time dashboards, PostgreSQL persistence, cloud-ready deployment and AI-powered fraud detection modules."
        ),
        new Project(
            2,
            "SADB",
            "Simulated banking system for security research.",
            "Java, Spring Boot, PostgreSQL, Docker",
            "https://github.com/NCRibeiro/SADB",
            "SADB is a laboratory-grade banking simulation system. It supports real-time transfers, attack/defense training scenarios, forensic auditing, and integration with OneAPIIRS for financial security research."
        ),
        new Project(
            3,
            "LiFE",
            "AI-powered mental health assistant.",
            "Python, FastAPI, ML, TensorFlow, Twilio API",
            "https://github.com/NCRibeiro/LiFE",
            "LiFE is an AI-driven mental health assistant providing 24/7 support via chat and voice. It integrates NLP, ML models, and crisis detection workflows to reduce suicide risk and increase accessibility to mental health care."
        )
    );

    public List<Project> getAllProjects() {
        return projects;
    }

    public Optional<Project> getProjectById(int id) {
        return projects.stream().filter(p -> p.getId() == id).findFirst();
    }
}
