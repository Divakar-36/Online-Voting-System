package com.voting.backend.controller;

import com.voting.backend.entity.Candidate;
import com.voting.backend.entity.Election;
import com.voting.backend.entity.User;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.ElectionRepository;
import com.voting.backend.repository.UserRepository;
import com.voting.backend.repository.VoteRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/voter")
@CrossOrigin(origins = "http://localhost:5173")
public class VoterController {

    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    public VoterController(
            ElectionRepository electionRepository,
            CandidateRepository candidateRepository,
            UserRepository userRepository,
            VoteRepository voteRepository) {

        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
    }

    @GetMapping("/elections")
    public ResponseEntity<List<Election>> getActiveElections() {

        return ResponseEntity.ok(
                electionRepository.findByActiveTrue()
        );
    }

    @GetMapping("/elections/{electionId}/candidates")
    public ResponseEntity<List<Candidate>> getCandidates(
            @PathVariable Long electionId) {

        if (!electionRepository.existsById(electionId)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                candidateRepository.findByElectionId(electionId)
        );
    }

    @GetMapping("/elections/{electionId}/status")
    public ResponseEntity<?> getVotingStatus(
            @PathVariable Long electionId,
            Authentication authentication) {

        String email = authentication.getName();

        User voter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Voter not found"));

        boolean hasVoted =
                voteRepository.existsByVoterIdAndElectionId(
                        voter.getId(),
                        electionId
                );

        return ResponseEntity.ok(
                Map.of(
                        "electionId", electionId,
                        "hasVoted", hasVoted
                )
        );
    }
}