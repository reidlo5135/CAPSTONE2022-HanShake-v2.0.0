package kr.co.handshake.facility.dto;

import kr.co.handshake.facility.domain.building.Building;
import kr.co.handshake.facility.domain.department.Department;
import kr.co.handshake.facility.domain.welfare.Welfare;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityResponseDto {
    private String name;

    public Building toBuilding() {
        return Building.builder()
                .name(name)
                .build();
    }

    public Department toDepartment() {
        return Department.builder()
                .name(name)
                .build();
    }

    public Welfare toWelfare() {
        return Welfare.builder()
                .name(name)
                .build();
    }
}
