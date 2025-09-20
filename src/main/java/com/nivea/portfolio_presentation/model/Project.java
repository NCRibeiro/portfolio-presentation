package com.nivea.portfolio_presentation.model;

public class Project {
    private final int id;
    private final String title;             // antes era "name"
    private final String shortDescription;  // antes era "description"
    private final String technologies;
    private final String githubUrl;         // antes era "link"
    private final String details;           // descrição longa

    public Project(int id, String title, String shortDescription, String technologies, String githubUrl, String details) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.technologies = technologies;
        this.githubUrl = githubUrl;
        this.details = details;
    }

    // Getters
    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getShortDescription() { return shortDescription; }
    public String getTechnologies() { return technologies; }
    public String getGithubUrl() { return githubUrl; }
    public String getDetails() { return details; }
}
