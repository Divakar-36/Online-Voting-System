package com.voting.backend.repository;

import com.voting.backend.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    boolean existsByVoterIdAndElectionId(
            Long voterId,
            Long electionId
    );

    long countByElectionId(Long electionId);

    long countByElectionIdAndCandidateId(
            Long electionId,
            Long candidateId
    );
}