package kr.co.handshake.facility.presentation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.facility.application.FacilityService;
import kr.co.handshake.facility.dto.FacilityResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"4. Facility"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/facility")
public class FacilityController {
    private final FacilityService facilityService;

    @GetMapping
    @ApiOperation(value = "전체 식단 조회", notes = "Select Diet All")
    public ResponseEntity<ListResult<FacilityResponseDto>> findAll() {
        return ResponseEntity.ok().body(facilityService.findFacilityAll());
    }

    @PostMapping
    @ApiOperation(value = "전체 식단 api 요청 후 DB 저장", notes = "Save on DB After Request API Entire Diet")
    public ResponseEntity save() {
        facilityService.requestAndSaveAllFacility();
        return ResponseEntity.ok().build();
    }
}
