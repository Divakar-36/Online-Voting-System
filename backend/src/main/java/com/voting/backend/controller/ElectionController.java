package com.voting.backend.controller;

import com.voting.backend.entity.Election;
import com.voting.backend.service.ElectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/elections")
@CrossOrigin(origins = "http://localhost:5173")
public class ElectionController {

    private final ElectionService electionService;

    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }

    // Create election
    @PostMapping
    public ResponseEntity<Election> createElection(
            @RequestBody Election election) {

        Election createdElection =
                electionService.createElection(election);

        return ResponseEntity.ok(createdElection);
    }

    // Get all elections
    @GetMapping
    public ResponseEntity<List<Election>> getAllElections() {

        return ResponseEntity.ok(
                electionService.getAllElections()
        );
    }

    // Get election by ID
    @GetMapping("/{id}")
    public ResponseEntity<Election> getElectionById(
            @PathVariable Long id) {

        return electionService.getElectionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update election
    @PutMapping("/{id}")
    public ResponseEntity<Election> updateElection(
            @PathVariable Long id,
            @RequestBody Election election) {

        try {
            Election updatedElection =
                    electionService.updateElection(id, election);

            return ResponseEntity.ok(updatedElection);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Activate / Deactivate election
    @PutMapping("/{id}/toggle")
    public ResponseEntity<Election> toggleElectionStatus(
            @PathVariable Long id) {

        try {
            Election election =
                    electionService.toggleElectionStatus(id);

            return ResponseEntity.ok(election);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete election
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteElection(
            @PathVariable Long id) {

        try {
            electionService.deleteElection(id);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}