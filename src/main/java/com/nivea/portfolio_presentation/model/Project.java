package com.nivea.portfolio_presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private int id;
    private String title;
    private String shortDescription;
    private String technologies;
    private String githubUrl;
    private String description;
    private String url;

    // ✅ Getters e Setters são gerados automaticamente pelo Lombok.
    //    Mas se quiser manter alguns manuais, pode, desde que sem duplicar lógica.

    public String getUrl() {
        return url; // 🔥 agora retorna o valor real
    }
}
