package kr.co.handshake.facility.domain;

import kr.co.handshake.common.domain.BaseTimeEntity;
import kr.co.handshake.facility.domain.building.Building;
import kr.co.handshake.facility.domain.department.Department;
import kr.co.handshake.facility.domain.welfare.Welfare;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Facility extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Building.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "building_id")
    private Building building;

    @ManyToOne(targetEntity = Department.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(targetEntity = Welfare.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "welfare_id")
    private Welfare welfare;
}
