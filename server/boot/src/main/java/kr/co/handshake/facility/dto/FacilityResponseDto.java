package kr.co.handshake.facility.dto;

import kr.co.handshake.facility.domain.Facility;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityResponseDto {
    private String building;
    private String department;
    private String welfare;

    public FacilityResponseDto (Facility facility) {
        this.building = facility.getBuilding();
        this.department = facility.getDepartment();
        this.welfare = facility.getWelfare();
    }

    public Facility toEntity() {
        return Facility.builder()
                .building(building)
                .department(department)
                .welfare(welfare)
                .build();
    }
}
