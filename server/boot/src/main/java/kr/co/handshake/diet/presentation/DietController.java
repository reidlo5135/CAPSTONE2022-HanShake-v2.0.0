package kr.co.handshake.diet.presentation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.diet.application.DietService;
import kr.co.handshake.diet.dto.DietResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author reidlo
 * 2022-09-13
 * @version 2.0.0
 */
@Api(tags = {"1. Diet"})
@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/diet")
public class DietController {
    private final DietService dietService;

    @GetMapping
    @ApiOperation(value = "전체 식단 조회", notes = "Select Diet All")
    public ResponseEntity<ListResult<DietResponseDto>> findAll() {
        return ResponseEntity.ok().body(dietService.findDietAll());
    }

    @PostMapping
    @ApiOperation(value = "전체 식단 api 요청 후 DB 저장", notes = "Save on DB After Request API Entire Diet")
    public ResponseEntity save() {
        dietService.requestAndSaveAllDiet();
        return ResponseEntity.ok().build();
    }
}
