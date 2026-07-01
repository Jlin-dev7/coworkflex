package com.coworkflex.backend.controller;

import com.coworkflex.backend.model.Desk;
import com.coworkflex.backend.model.Space;
import com.coworkflex.backend.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/spaces")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SpaceController {

    private final SpaceService spaceService;

    @GetMapping
    public ResponseEntity<List<Space>> getSpaces(
        @RequestParam(required = false) String city,
        @RequestParam(required = false) Integer capacity
    ) {
        return ResponseEntity.ok(spaceService.getAllSpaces(city, capacity));
    }

    @GetMapping("/{id}/desks")
    public ResponseEntity<List<Desk>> getDesks(@PathVariable Long id) {
        return ResponseEntity.ok(spaceService.getDesksBySpace(id));
    }
}