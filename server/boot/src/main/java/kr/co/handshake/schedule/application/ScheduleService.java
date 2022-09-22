package kr.co.handshake.schedule.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.common.exception.RestCommunicationException;
import kr.co.handshake.schedule.domain.Schedule;
import kr.co.handshake.schedule.domain.ScheduleRepository;
import kr.co.handshake.schedule.dto.ScheduleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;

    private static final String ALL_SCHEDULE_URI = "http://localhost:5000/v2/api/schedule/";

    @Transactional(readOnly = true)
    public ListResult<Schedule> findAllSchedule() {
        return responseService.getListResult(scheduleRepository.findAll());
    }

    @Transactional
    public void requestAndSaveSchedule() {
        Map<String, Map<String, String>> responseMap = restFactoryService.request(ALL_SCHEDULE_URI);
        if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
        for(Map.Entry<String, Map<String, String>> elem : responseMap.entrySet()) {
            Map<String, String> scheduleMap = elem.getValue();
            ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto(elem.getKey(), scheduleMap.get("type"), scheduleMap.get("details"));
            scheduleRepository.save(scheduleResponseDto.toEntity());
        }
    }
}
