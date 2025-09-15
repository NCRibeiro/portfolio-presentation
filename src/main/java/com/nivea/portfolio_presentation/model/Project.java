package com.nivea.portfolio_presentation.model;

public class Project {
    private final int id;
    private final String name;
    private final String description;
    private final String technologies;
    private final String link;
    private final String details; // descrição longa

    public Project(int id, String name, String description, String technologies, String link, String details) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.technologies = technologies;
        this.link = link;
        this.details = details;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getTechnologies() { return technologies; }
    public String getLink() { return link; }
    public String getDetails() { return details; }
}
