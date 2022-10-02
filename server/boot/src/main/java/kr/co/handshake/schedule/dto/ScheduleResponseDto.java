package kr.co.handshake.schedule.dto;

import kr.co.handshake.schedule.domain.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponseDto {
    private String indexDate;
    private String type;
    private String details;

    public ScheduleResponseDto(Schedule schedule) {
        this.indexDate = schedule.getIndexDate();
        this.type = schedule.getType();
        this.details = schedule.getDetails();
    }

    public Schedule toEntity() {
        return Schedule.builder()
                .indexDate(indexDate)
                .type(type)
                .details(details)
                .build();
    }
}
