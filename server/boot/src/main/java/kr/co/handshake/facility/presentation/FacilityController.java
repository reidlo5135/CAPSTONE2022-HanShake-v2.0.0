package kr.co.handshake.facility.presentation;

import io.swagger.annotations.ApiOperation;
import kr.co.handshake.facility.application.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/facility")
public class FacilityController {
    private final FacilityService facilityService;

    @GetMapping
    @ApiOperation(value = "전체 시설 조회", notes = "Select Facility All")
    public ResponseEntity save() {
        facilityService.requestAndSaveAllFacility();
        return ResponseEntity.ok().build();
    }
}
