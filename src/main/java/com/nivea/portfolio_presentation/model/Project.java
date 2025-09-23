
package com.nivea.portfolio_presentation.model;

public class Project {
    private int id;
    private String title;
    private String shortDescription;
    private String technologies;
    private String githubUrl;
    private String description;

    // Construtor
    public Project(int id, String title, String shortDescription, String technologies, String githubUrl, String description) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.technologies = technologies;
        this.githubUrl = githubUrl;
        this.description = description;
    }

    // Getters
    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getShortDescription() { return shortDescription; }
    public String getTechnologies() { return technologies; }
    public String getGithubUrl() { return githubUrl; }
    public String getDescription() { return description; }

    // Setters (se precisar mutabilidade, senão pode deixar só getters)
    public void setId(int id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public void setDescription(String description) { this.description = description; }
}
