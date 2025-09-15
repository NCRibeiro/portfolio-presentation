package com.nivea.portfolio_presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.nivea.portfolio_presentation.model.Project;
import com.nivea.portfolio_presentation.service.ProjectService;


@SuppressWarnings("unused")
class ProjectDetailsController {

    private final ProjectService projectService;

    public ProjectDetailsController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/project/{id}")
    public String showProjectDetails(@PathVariable int id, Model model) {
        Project project = projectService.getProjectById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
        model.addAttribute("project", project);
        return "project-details";
    }
}

@Controller
public class ProjectController {

    // Multiverso de projetos
    @GetMapping("/projects")
    public String projects() {
        return "projects"; // abre src/main/resources/templates/projects.html
    }

    // Detalhes - OneAPIIRS
    @GetMapping("/project/oneapiirs")
    public String oneapiirs() {
        return "project/oneapiirs"; // abre src/main/resources/templates/project/oneapiirs.html
    }

    // Detalhes - SADB
    @GetMapping("/project/sadb")
    public String sadb() {
        return "project/sadb"; // abre src/main/resources/templates/project/sadb.html
    }

    // Detalhes - Life
    @GetMapping("/project/life")
    public String life() {
        return "project/life"; // abre src/main/resources/templates/project/life.html
    }
}