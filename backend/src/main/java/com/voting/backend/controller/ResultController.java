package com.voting.backend.controller;

import com.voting.backend.dto.ResultDTO;
import com.voting.backend.entity.Candidate;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.ElectionRepository;
import com.voting.backend.repository.VoteRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;

    public ResultController(
            ElectionRepository electionRepository,
            CandidateRepository candidateRepository,
            VoteRepository voteRepository) {

        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
    }

    @GetMapping("/elections/{electionId}/results")
    public ResponseEntity<?> getResults(
            @PathVariable Long electionId) {

        if (!electionRepository.existsById(electionId)) {
            return ResponseEntity.notFound().build();
        }

        List<Candidate> candidates =
                candidateRepository.findByElectionId(electionId);

        List<ResultDTO> results = new ArrayList<>();

        for (Candidate candidate : candidates) {

            long voteCount =
                    voteRepository.countByElectionIdAndCandidateId(
                            electionId,
                            candidate.getId()
                    );

            results.add(
                    new ResultDTO(
                            candidate.getId(),
                            candidate.getName(),
                            voteCount
                    )
            );
        }

        return ResponseEntity.ok(results);
    }
}