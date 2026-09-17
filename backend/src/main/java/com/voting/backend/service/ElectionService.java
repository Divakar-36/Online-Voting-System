package com.voting.backend.service;

import com.voting.backend.entity.Election;
import com.voting.backend.repository.ElectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ElectionService {

    private final ElectionRepository electionRepository;

    public ElectionService(ElectionRepository electionRepository) {
        this.electionRepository = electionRepository;
    }

    // Create election
    public Election createElection(Election election) {
        election.setActive(false);
        return electionRepository.save(election);
    }

    // Get all elections
    public List<Election> getAllElections() {
        return electionRepository.findAll();
    }

    // Get election by ID
    public Optional<Election> getElectionById(Long id) {
        return electionRepository.findById(id);
    }

    // Update election
    public Election updateElection(Long id, Election updatedElection) {

        Election existingElection = electionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        existingElection.setName(updatedElection.getName());
        existingElection.setDescription(updatedElection.getDescription());
        existingElection.setStartDate(updatedElection.getStartDate());
        existingElection.setEndDate(updatedElection.getEndDate());
        existingElection.setActive(updatedElection.isActive());

        return electionRepository.save(existingElection);
    }

    // Activate or deactivate election
    public Election toggleElectionStatus(Long id) {

        Election election = electionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        election.setActive(!election.isActive());

        return electionRepository.save(election);
    }

    // Delete election
    public void deleteElection(Long id) {

        if (!electionRepository.existsById(id)) {
            throw new RuntimeException("Election not found");
        }

        electionRepository.deleteById(id);
    }
}