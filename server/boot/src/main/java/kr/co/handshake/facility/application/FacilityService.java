package kr.co.handshake.facility.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.facility.domain.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FacilityService {
    private final FacilityRepository facilityRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;
    private static final String ALL_FACILITY_URL = "http://localhost:5000/v2/api/facility/";

}
