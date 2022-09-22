package kr.co.handshake.schedule.presentation;

import io.swagger.annotations.ApiOperation;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.schedule.application.ScheduleService;
import kr.co.handshake.schedule.domain.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/schedule/")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    @ApiOperation(value = "전체 학사일정 조회", notes = "Select Schedule All")
    public ResponseEntity<ListResult<Schedule>> findAll() {
        return ResponseEntity.ok().body(scheduleService.findAllSchedule());
    }

    @PostMapping
    @ApiOperation(value = "전체 학사일정 api 요청 후 DB 저장", notes = "Save on DB After Request API Schedule Notice")
    public ResponseEntity save() {
        scheduleService.requestAndSaveSchedule();
        return ResponseEntity.ok().build();
    }
}
