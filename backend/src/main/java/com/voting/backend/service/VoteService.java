package com.voting.backend.service;

import com.voting.backend.entity.Candidate;
import com.voting.backend.entity.Election;
import com.voting.backend.entity.User;
import com.voting.backend.entity.Vote;
import com.voting.backend.repository.CandidateRepository;
import com.voting.backend.repository.ElectionRepository;
import com.voting.backend.repository.UserRepository;
import com.voting.backend.repository.VoteRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;

    public VoteService(
            VoteRepository voteRepository,
            UserRepository userRepository,
            ElectionRepository electionRepository,
            CandidateRepository candidateRepository) {

        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
    }

    public Vote castVote(
            Long voterId,
            Long electionId,
            Long candidateId) {

        User voter = userRepository.findById(voterId)
                .orElseThrow(() ->
                        new RuntimeException("Voter not found"));

        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found"));

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        if (!election.isActive()) {
            throw new RuntimeException(
                    "This election is not active"
            );
        }

        if (!candidate.getElection().getId().equals(electionId)) {
            throw new RuntimeException(
                    "Candidate does not belong to this election"
            );
        }

        if (voteRepository.existsByVoterIdAndElectionId(
                voterId,
                electionId)) {

            throw new RuntimeException(
                    "You have already voted in this election"
            );
        }

        Vote vote = new Vote();

        vote.setVoter(voter);
        vote.setElection(election);
        vote.setCandidate(candidate);
        vote.setVotedAt(LocalDateTime.now());

        return voteRepository.save(vote);
    }
}