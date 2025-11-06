package com.shelves.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectTag;
    private String name;
    private LocalDate submissionDate;
    private Integer marksObtained;
    private Integer marksTotal;
    private String status;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSubjectTag() { return subjectTag; }
    public void setSubjectTag(String subjectTag) { this.subjectTag = subjectTag; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDate submissionDate) { this.submissionDate = submissionDate; }

    public Integer getMarksObtained() { return marksObtained; }
    public void setMarksObtained(Integer marksObtained) { this.marksObtained = marksObtained; }

    public Integer getMarksTotal() { return marksTotal; }
    public void setMarksTotal(Integer marksTotal) { this.marksTotal = marksTotal; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
