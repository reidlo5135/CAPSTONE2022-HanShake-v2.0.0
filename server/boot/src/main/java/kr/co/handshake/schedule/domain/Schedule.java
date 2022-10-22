package kr.co.handshake.schedule.domain;

import kr.co.handshake.common.domain.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "schedule")
public class Schedule extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "schedule_index_date", nullable = false)
    private String indexDate;

    @Column(name = "schedule_type", nullable = false)
    private String type;

    @Column(name = "schedule_details", nullable = false)
    private String details;
}
