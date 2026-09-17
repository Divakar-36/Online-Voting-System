
package com.voting.backend.controller;

import com.voting.backend.entity.Candidate;
import com.voting.backend.service.CandidateService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(
            CandidateService candidateService) {

        this.candidateService = candidateService;
    }

    @PostMapping(
            "/elections/{electionId}/candidates"
    )
    public ResponseEntity<Candidate> createCandidate(
            @PathVariable Long electionId,
            @RequestBody Candidate candidate) {

        return ResponseEntity.ok(
                candidateService.createCandidate(
                        electionId,
                        candidate
                )
        );
    }

    @GetMapping(
            "/elections/{electionId}/candidates"
    )
    public ResponseEntity<List<Candidate>>
            getCandidatesByElection(
                    @PathVariable Long electionId) {

        return ResponseEntity.ok(
                candidateService
                        .getCandidatesByElection(
                                electionId
                        )
        );
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<Candidate>>
            getAllCandidates() {

        return ResponseEntity.ok(
                candidateService.getAllCandidates()
        );
    }

    @GetMapping("/candidates/{id}")
    public ResponseEntity<Candidate>
            getCandidateById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                candidateService.getCandidateById(id)
        );
    }

    @PutMapping("/candidates/{id}")
    public ResponseEntity<Candidate>
            updateCandidate(
                    @PathVariable Long id,
                    @RequestBody Candidate candidate) {

        return ResponseEntity.ok(
                candidateService.updateCandidate(
                        id,
                        candidate
                )
        );
    }

    @DeleteMapping("/candidates/{id}")
    public ResponseEntity<Void> deleteCandidate(
            @PathVariable Long id) {

        candidateService.deleteCandidate(id);

        return ResponseEntity.noContent().build();
    }
}

