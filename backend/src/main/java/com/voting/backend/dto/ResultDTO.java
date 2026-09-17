package com.voting.backend.dto;

public class ResultDTO {

    private Long candidateId;
    private String candidateName;
    private long voteCount;

    public ResultDTO(
            Long candidateId,
            String candidateName,
            long voteCount) {

        this.candidateId = candidateId;
        this.candidateName = candidateName;
        this.voteCount = voteCount;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public long getVoteCount() {
        return voteCount;
    }
}
