package com.nivea.portfolio_presentation.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nivea.portfolio_presentation.model.Project;
import com.nivea.portfolio_presentation.service.ProjectService;

@Controller
public class ProjectsController {

    private final ProjectService projectsService;

    public ProjectsController(ProjectService projectService) {
        this.projectsService = projectService;
    }

    /**
     * Página principal de projetos - carrega o template project.html.
     */
    @GetMapping("/projects")
    public String listProjects(Model model) {
        List<Project> projects = projectsService.getAllProjects();
        model.addAttribute("projects", projects);
        return "project"; // carrega templates/project.html
    }

    /**
     * Nova rota JSON para o front-end (project.html) consumir dinamicamente via fetch().
     * Retorna a lista de projetos no formato simplificado {title, description, link, githubUrl}.
     */
    @GetMapping(value = "/projects/data", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Map<String, String>> getProjectsData() {
        return projectsService.getAllProjects().stream()
            .map(p -> Map.of(
                "title", p.getTitle(),
                "description", p.getShortDescription() != null ? p.getShortDescription() : "No description available.",
                "link", p.getUrl() != null ? p.getUrl() : "#",
                "githubUrl", p.getGithubUrl() != null ? p.getGithubUrl() : "#"
            ))
            .collect(Collectors.toList());
    }

    /**
     * Exibe detalhes individuais dos projetos, com fallback dinâmico.
     */
    @GetMapping("/projects/{slug}")
    public String showProjectDetails(@PathVariable String slug, Model model) {
        if (slug == null || slug.isBlank()) {
            throw new IllegalArgumentException("Invalid project slug: " + slug);
        }

        String normalized = slug.trim().toLowerCase();

        switch (normalized) {
            case "oneapiirs" -> {
                return "project/oneapiirs";
            }
            case "sadb" -> {
                return "project/sadb";
            }
            case "lifeapp", "life-app", "life" -> {
                return "project/life";
            }
            case "portfolio", "portfolio-presentation" -> {
                return "project/portfolio";
            }
            case "visual-recommendation-system", "recommendation" -> {
                return "project/recommendation";
            }
            case "yolov8-precision-agriculture", "agriculture" -> {
                return "project/agriculture";
            }
            case "alternate-reality-simulator", "ars", "alternatereality", "alternate-reality" -> {
                return "project/alternateReality";
            }
            case "stockmanager", "stock-manager" -> {
                return "project/stockmanager";
            }
            case "welltrack" -> {
                return "project/welltrack";
            }
            case "face-detection", "facedetection", "face-detection-ai" -> {
                return "project/faceDetection";
            }
            default -> {
                final String searchSlug = slug;
                Project project = projectsService.getAllProjects().stream()
                        .filter(p -> p.getTitle()
                                .replace(" ", "")
                                .equalsIgnoreCase(searchSlug.replace("-", "")))
                        .findFirst()
                        .orElseThrow(() -> new IllegalArgumentException("Project not found: " + searchSlug));

                model.addAttribute("project", project);
                return "project-details"; // fallback genérico
            }
        }
    }
}
