package kr.co.handshake.notice.presentation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.notice.application.NoticeService;
import kr.co.handshake.notice.dto.NoticeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"2. Notice"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/notice/")
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping
    @ApiOperation(value = "전체 공지사항 조회", notes = "Select Notice All")
    public ResponseEntity<ListResult<NoticeResponseDto>> findAll() {
        return ResponseEntity.ok().body(noticeService.findAllNotice());
    }

    @PostMapping
    @ApiOperation(value = "전체 공지사항 api 요청 후 DB 저장", notes = "Save on DB After Request API Entire Notice")
    public ResponseEntity save() {
        noticeService.requestAndSaveAllNotice();
        return ResponseEntity.ok().build();
    }
}
