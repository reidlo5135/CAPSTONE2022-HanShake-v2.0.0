package kr.co.handshake.facility.presentation;

import kr.co.handshake.facility.application.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FacilityController {
    private final FacilityService facilityService;
}
