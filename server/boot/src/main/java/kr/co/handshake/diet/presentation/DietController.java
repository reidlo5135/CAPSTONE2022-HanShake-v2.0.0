package kr.co.handshake.diet.presentation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.handshake.common.domain.SingleResult;
import kr.co.handshake.diet.application.DietService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Api(tags = {"1. Diet"})
@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/diet")
public class DietController {
    private final DietService dietService;

    @GetMapping
    @ApiOperation(value = "전체 식단 조회", notes = "Select Diet All")
    public ResponseEntity<SingleResult<String>> findAll() {
        return ResponseEntity.ok().body(dietService.testRequest());
    }
}
