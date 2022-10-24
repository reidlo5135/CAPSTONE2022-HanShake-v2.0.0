package kr.co.handshake.diet.dto;

import kr.co.handshake.diet.DayEnum;
import kr.co.handshake.diet.domain.Diet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author reidlo
 * 2022-09-13
 * @version 2.0.0
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DietResponseDto {
    private String corner;
    private String menu;
    private DayEnum day;

    public DietResponseDto(Diet diet) {
        this.corner = diet.getCorner();
        this.menu = diet.getMenu();
        this.day = diet.getDay();
    }

    public Diet toEntity() {
        return Diet.builder()
                .corner(corner)
                .menu(menu)
                .day(day)
                .build();
    }
}
