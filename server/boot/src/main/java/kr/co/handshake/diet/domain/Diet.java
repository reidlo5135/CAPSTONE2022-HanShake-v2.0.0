package kr.co.handshake.diet.domain;

import kr.co.handshake.common.domain.BaseEntity;
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
public class Diet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String corner;

    @Column(nullable = false)
    private String menu;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayEnum day;
}
