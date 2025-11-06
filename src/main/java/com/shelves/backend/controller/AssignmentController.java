package com.shelves.backend.controller;

import com.shelves.backend.model.Assignment;
import com.shelves.backend.repository.AssignmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class AssignmentController {
    private final AssignmentRepository repo;

    public AssignmentController(AssignmentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Assignment> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> get(@PathVariable Long id) {
        Optional<Assignment> a = repo.findById(id);
        return a.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Assignment create(@RequestBody Assignment assignment) {
        return repo.save(assignment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assignment> update(@PathVariable Long id, @RequestBody Assignment updated) {
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setSubjectTag(updated.getSubjectTag());
            existing.setSubmissionDate(updated.getSubmissionDate());
            existing.setMarksObtained(updated.getMarksObtained());
            existing.setMarksTotal(updated.getMarksTotal());
            existing.setStatus(updated.getStatus());
            repo.save(existing);
            return ResponseEntity.ok(existing);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
