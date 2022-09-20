package kr.co.handshake.notice.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.common.exception.RestCommunicationException;
import kr.co.handshake.notice.domain.Notice;
import kr.co.handshake.notice.domain.NoticeEnum;
import kr.co.handshake.notice.domain.NoticeRepository;
import kr.co.handshake.notice.dto.NoticeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;

    private static final String ALL_NOTICE_URI = "http://localhost:5000/v2/api/notice/";

    @Transactional(readOnly = true)
    public ListResult<Notice> findAllNotice() {
        return responseService.getListResult(noticeRepository.findAll());
    }

    @Transactional
    public void requestAndSaveAllNotice() {
        for(int i=0;i<NoticeEnum.values().length;i++) {
            Map<String, Map<String, String>> responseMap = restFactoryService.request(ALL_NOTICE_URI + NoticeEnum.values()[i].toString().toLowerCase());
            if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
            for(Map.Entry<String, Map<String, String>> elem : responseMap.entrySet()) {
                Map<String, String> noticeMap = elem.getValue();

                NoticeResponseDto noticeResponseDto = NoticeResponseDto.builder()
                        .index(elem.getKey())
                        .category(noticeMap.get("category"))
                        .title(noticeMap.get("title"))
                        .url(noticeMap.get("url"))
                        .writer(noticeMap.get("writer"))
                        .regDate(noticeMap.get("regDate"))
                        .views(noticeMap.get("views"))
                        .type(NoticeEnum.values()[i])
                        .build();
                noticeRepository.save(noticeResponseDto.toEntity());
            }
        }
    }

}
