package com.coworkflex.backend.service;

import com.coworkflex.backend.model.Desk;
import com.coworkflex.backend.model.Space;
import com.coworkflex.backend.repository.DeskRepository;
import com.coworkflex.backend.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpaceService {

    private final SpaceRepository spaceRepository;
    private final DeskRepository deskRepository;

    public List<Space> getAllSpaces(String city, Integer capacity) {
        if (city != null && capacity != null) {
            return spaceRepository.findByCityIgnoreCaseAndCapacityGreaterThanEqual(city, capacity);
        } else if (city != null) {
            return spaceRepository.findByCityIgnoreCase(city);
        } else if (capacity != null) {
            return spaceRepository.findByCapacityGreaterThanEqual(capacity);
        }
        return spaceRepository.findAll();
    }

    public List<Desk> getDesksBySpace(Long spaceId) {
        return deskRepository.findBySpaceId(spaceId);
    }
}