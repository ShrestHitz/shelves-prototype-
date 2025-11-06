package com.shelves.backend.controller;

import com.shelves.backend.model.LearningMaterial;
import com.shelves.backend.repository.LearningMaterialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "*")
public class LearningMaterialController {
    private final LearningMaterialRepository repo;

    public LearningMaterialController(LearningMaterialRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<LearningMaterial> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningMaterial> get(@PathVariable Long id) {
        Optional<LearningMaterial> m = repo.findById(id);
        return m.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public LearningMaterial create(@RequestBody LearningMaterial material) {
        return repo.save(material);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningMaterial> update(@PathVariable Long id, @RequestBody LearningMaterial updated) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setUrl(updated.getUrl());
            existing.setDescription(updated.getDescription());
            existing.setSubjectTag(updated.getSubjectTag());
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
