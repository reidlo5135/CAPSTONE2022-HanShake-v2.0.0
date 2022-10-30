package kr.co.handshake.facility.presentation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.handshake.facility.application.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"4. Facility"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/facility")
public class FacilityController {
    private final FacilityService facilityService;

    @PostMapping(value = "/building")
    @ApiOperation(value = "전체 시설 api 요청 후 DB 저장", notes = "Save on DB After Request API Entire Facility")
    public ResponseEntity saveBuilding() {
        facilityService.requestAndSaveAllBuilding();
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/department")
    @ApiOperation(value = "전체 시설 api 요청 후 DB 저장", notes = "Save on DB After Request API Entire Facility")
    public ResponseEntity saveDepartment() {
        facilityService.requestAndSaveAllDepartment();
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/welfare")
    @ApiOperation(value = "전체 시설 api 요청 후 DB 저장", notes = "Save on DB After Request API Entire Facility")
    public ResponseEntity saveWelfare() {
        facilityService.requestAndSaveAllWelfare();
        return ResponseEntity.ok().build();
    }
}


