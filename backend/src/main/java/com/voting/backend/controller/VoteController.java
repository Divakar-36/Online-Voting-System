package com.voting.backend.controller;

import com.voting.backend.entity.User;
import com.voting.backend.entity.Vote;
import com.voting.backend.repository.UserRepository;
import com.voting.backend.service.VoteService;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/voter")
@CrossOrigin(origins = "http://localhost:5173")
public class VoteController {

    private final VoteService voteService;
    private final UserRepository userRepository;

    public VoteController(
            VoteService voteService,
            UserRepository userRepository) {

        this.voteService = voteService;
        this.userRepository = userRepository;
    }

    @PostMapping(
            "/elections/{electionId}/candidates/{candidateId}/vote"
    )
    public ResponseEntity<?> castVote(
            @PathVariable Long electionId,
            @PathVariable Long candidateId,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            User voter = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException("Voter not found"));

            Vote vote = voteService.castVote(
                    voter.getId(),
                    electionId,
                    candidateId
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Vote submitted successfully",
                            "voteId",
                            vote.getId()
                    )
            );

        } catch (DataIntegrityViolationException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(
                            Map.of(
                                    "message",
                                    "You have already voted in this election"
                            )
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }
}