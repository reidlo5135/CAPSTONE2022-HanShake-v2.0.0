package kr.co.handshake.facility.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.exception.RestCommunicationException;
import kr.co.handshake.facility.domain.building.BuildingRepository;
import kr.co.handshake.facility.domain.department.DepartmentRepository;
import kr.co.handshake.facility.domain.welfare.WelfareRepository;
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
    private final BuildingRepository buildingRepository;
    private final DepartmentRepository departmentRepository;
    private final WelfareRepository welfareRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;

    private static final String ALL_FACILITY_URL = "http://localhost:5000/v2/api/facility";

    @Transactional
    public void requestAndSaveAllBuilding() {
        Map<String, List<String>> responseMap = restFactoryService.request(ALL_FACILITY_URL + "/building");
        if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
        log.info("Facility Service requestAndSaveAllBuilding : " + responseMap);
        for(Map.Entry<String, List<String>> elem : responseMap.entrySet()) {
            List<String> elemList = elem.getValue();
            for(int i=0;i<elemList.size();i++) {
                FacilityResponseDto facilityResponseDto = new FacilityResponseDto(responseMap.get("building").get(i));
                buildingRepository.save(facilityResponseDto.toBuilding());
            }
        }
    }

    @Transactional
    public void requestAndSaveAllDepartment() {
        Map<String, List<String>> responseMap = restFactoryService.request(ALL_FACILITY_URL + "/department");
        if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
        log.info("Facility Service requestAndSaveAllDepartment : " + responseMap);
        for(Map.Entry<String, List<String>> elem : responseMap.entrySet()) {
            List<String> elemList = elem.getValue();
            for(int i=0;i<elemList.size();i++) {
                FacilityResponseDto facilityResponseDto = new FacilityResponseDto(responseMap.get("department").get(i));
                departmentRepository.save(facilityResponseDto.toDepartment());
            }
        }
    }

    @Transactional
    public void requestAndSaveAllWelfare() {
        Map<String, List<String>> responseMap = restFactoryService.request(ALL_FACILITY_URL + "/welfare");
        if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
        log.info("Facility Service requestAndSaveAllWelfare : " + responseMap);
        for(Map.Entry<String, List<String>> elem : responseMap.entrySet()) {
            List<String> elemList = elem.getValue();
            for(int i=0;i<elemList.size();i++) {
                FacilityResponseDto facilityResponseDto = new FacilityResponseDto(responseMap.get("welfare").get(i));
                welfareRepository.save(facilityResponseDto.toWelfare());
            }
        }
    }
}
