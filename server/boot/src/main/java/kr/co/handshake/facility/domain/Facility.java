package kr.co.handshake.facility.domain;

import kr.co.handshake.common.domain.BaseTimeEntity;
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

    @Column(nullable = false)
    private String building;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String welfare;
}
