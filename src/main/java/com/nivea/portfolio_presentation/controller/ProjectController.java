package com.nivea.portfolio_presentation.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.nivea.portfolio_presentation.model.Project;
import com.nivea.portfolio_presentation.service.ProjectService;

@Controller
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Lista todos os projetos na página principal.
     */
    @GetMapping("/projects")
    public String listProjects(Model model) {
        List<Project> projects = projectService.getAllProjects();
        model.addAttribute("projects", projects);
        return "project"; // carrega project.html (timeline dinâmica)
    }

    /**
     * Mostra detalhes de um projeto específico.
     */
    @GetMapping("/projects/{id}")
    public String showProjectDetails(@PathVariable int id, Model model) {
        Project project = projectService.getProjectById(id)
                .orElseThrow(() -> new IllegalArgumentException("❌ Project not found: " + id));
        model.addAttribute("project", project);
        return "project-details"; // carrega project-details.html
    }
}
