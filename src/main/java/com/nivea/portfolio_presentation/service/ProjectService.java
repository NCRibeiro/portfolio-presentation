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
            "OneAPIIRS bridges legacy COBOL/IRS systems with modern REST APIs. It enables fiscal data modernization, providing real-time dashboards, PostgreSQL persistence, cloud-ready deployment and AI-powered fraud detection modules.",
            "/projects/oneapiirs"
        ),
        new Project(
            2,
            "SADB",
            "Simulated banking system for security research.",
            "Java, Spring Boot, PostgreSQL, Docker",
            "https://github.com/NCRibeiro/SADB",
            "SADB is a laboratory-grade banking simulation system. It supports real-time transfers, attack/defense training scenarios, forensic auditing, and integration with OneAPIIRS for financial security research.",
            "/projects/sadb"
        ),
        new Project(
            3,
            "LiFE",
            "AI-powered mental health assistant.",
            "Python, FastAPI, ML, TensorFlow, Twilio API",
            "https://github.com/NCRibeiro/LiFE",
            "LiFE is an AI-driven mental health assistant providing 24/7 support via chat and voice. It integrates NLP, ML models, and crisis detection workflows to reduce suicide risk and increase accessibility to mental health care.",
            "/projects/life"
        ),
        new Project(
            4,
            "Alternate Reality Simulator",
            "Immersive simulator for exploring alternate life paths.",
            "Python, FastAPI, Gemini API, AI Narrative Engine",
            "https://github.com/NCRibeiro/Alternate_Reality_Simulator",
            "The Alternate Reality Simulator (ARS) allows users to experience alternate versions of their lives or fictional worlds. By combining biometric and psychological data with AI-driven narratives, it generates immersive alternate realities for creativity, therapy and entertainment.",
            "/projects/alternate-reality-simulator"
        ),
        new Project(
            5,
            "Visual Recommendation System",
            "AI-based image recommendation engine.",
            "Python, TensorFlow, EfficientNet, Flask",
            "https://github.com/NCRibeiro/Visual_Recommendation_System_Sytem_by_Similarity",
            "This system analyzes visual content and user preferences to generate accurate product recommendations. It leverages deep learning models (EfficientNet) for image embeddings and achieved a 20% uplift in CTR in testing.",
            "/projects/recommendation"
        ),
        new Project(
            6,
            "YOLOv8 Precision Agriculture",
            "Crop monitoring and disease detection with computer vision.",
            "Python, YOLOv8, OpenCV, TensorFlow",
            "https://github.com/NCRibeiro/YOLO-Precision-Agriculture",
            "AI-powered system that applies YOLOv8 object detection to precision agriculture. It identifies crop health issues in real-time, helping farmers reduce waste, optimize productivity, and improve sustainability.",
            "/projects/agriculture"
        ),
        new Project(
            7,
            "Portfolio Presentation",
            "Interactive personal portfolio (this site).",
            "Java, Spring Boot, Thymeleaf, Bootstrap, Three.js",
            "https://github.com/NCRibeiro/portfolio-presentation",
            "This interactive portfolio showcases my professional projects in an elegant, immersive format. It includes AI narration, 3D particle effects, and dynamic project presentation.",
            "/projects/portfolio"
        ),
        new Project(
            8,
            "StockManager",
            "Inventory and stock control system.",
            "Java, Spring Boot, PostgreSQL",
            "https://github.com/NCRibeiro/StockManager",
            "StockManager is a robust inventory management system with stock control, real-time monitoring, and reporting features for small to medium businesses.",
            "/projects/stockmanager"
        ),
        new Project(
            9,
            "WELLTRACK",
            "Text classification system for sentiment analysis.",
            "Python, TensorFlow, BERT, NLP",
            "https://github.com/NCRibeiro/WELLTRACK",
            "A machine learning model for classifying text sentiment (positive, neutral, negative). Built with TensorFlow and BERT embeddings, tested on large datasets, and designed for integration into chatbots and recommendation systems.",
            "/projects/welltrack"
        )
    );

    public List<Project> getAllProjects() {
        return projects;
    }

    public Optional<Project> getProjectById(int id) {
        return projects.stream()
                .filter(p -> p.getId() == id)
                .findFirst();
    }
}
