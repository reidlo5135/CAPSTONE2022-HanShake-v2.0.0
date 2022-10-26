package kr.co.handshake.facility.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.exception.RestCommunicationException;
import kr.co.handshake.facility.domain.FacilityRepository;
import kr.co.handshake.facility.dto.FacilityResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Log4j2
@Service
@RequiredArgsConstructor
public class FacilityService {
    private final FacilityRepository facilityRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;

    private static final String ALL_FACILITY_URL = "http://localhost:5000/v2/api/facility/";

    @Transactional
    public void requestAndSaveAllFacility() {
        Map<String, List<String>> responseMap = restFactoryService.request(ALL_FACILITY_URL);
        if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
        log.info("Facility Service requestAndSaveAllFacility : " + responseMap);
        for(Map.Entry<String, List<String>> elem : responseMap.entrySet()) {
            List<String> elemList = elem.getValue();
            for(int i=0;i<elemList.size();i++) {
                FacilityResponseDto facilityResponseDto = new FacilityResponseDto(
                        responseMap.get("building").get(i), responseMap.get("department").get(i), responseMap.get("welfare").get(i)
                );
                facilityRepository.save(facilityResponseDto.toEntity());
            }
        }
    }
}
