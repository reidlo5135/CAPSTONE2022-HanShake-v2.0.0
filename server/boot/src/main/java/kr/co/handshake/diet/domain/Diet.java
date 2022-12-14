package kr.co.handshake.diet.domain;

import kr.co.handshake.common.domain.BaseTimeEntity;
import kr.co.handshake.diet.DayEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author reidlo
 * 2022-09-13
 * @version 2.0.0
 */
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diet")
public class Diet extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "diet_corner", nullable = false)
    private String corner;

    @Column(name = "diet_menu", nullable = false)
    private String menu;

    @Enumerated(EnumType.STRING)
    @Column(name = "diet_day", nullable = false)
    private DayEnum day;
}
