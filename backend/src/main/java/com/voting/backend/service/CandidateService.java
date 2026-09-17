
package com.voting.backend.service;

import com.voting.backend.entity.Candidate;
import com.voting.backend.entity.Election;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.ElectionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;

    public CandidateService(
            CandidateRepository candidateRepository,
            ElectionRepository electionRepository) {

        this.candidateRepository = candidateRepository;
        this.electionRepository = electionRepository;
    }

    public Candidate createCandidate(
            Long electionId,
            Candidate candidate) {

        Election election = electionRepository
                .findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Election not found"
                        ));

        if (candidate.getName() == null ||
                candidate.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Candidate name is required"
            );
        }

        candidate.setName(
                candidate.getName().trim()
        );

        if (candidate.getDescription() != null) {
            candidate.setDescription(
                    candidate.getDescription().trim()
            );
        }

        candidate.setElection(election);

        return candidateRepository.save(candidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public List<Candidate> getCandidatesByElection(
            Long electionId) {

        if (!electionRepository.existsById(electionId)) {
            throw new RuntimeException(
                    "Election not found"
            );
        }

        return candidateRepository.findByElectionId(
                electionId
        );
    }

    public Candidate getCandidateById(Long id) {

        return candidateRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate not found"
                        ));
    }

    public Candidate updateCandidate(
            Long id,
            Candidate updatedCandidate) {

        Candidate existingCandidate =
                candidateRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                ));

        if (updatedCandidate.getName() == null ||
                updatedCandidate.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Candidate name is required"
            );
        }

        existingCandidate.setName(
                updatedCandidate.getName().trim()
        );

        if (updatedCandidate.getDescription() != null) {
            existingCandidate.setDescription(
                    updatedCandidate
                            .getDescription()
                            .trim()
            );
        } else {
            existingCandidate.setDescription(null);
        }

        return candidateRepository.save(
                existingCandidate
        );
    }

    public void deleteCandidate(Long id) {

        Candidate candidate =
                candidateRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                ));

        candidateRepository.delete(candidate);
    }
}

