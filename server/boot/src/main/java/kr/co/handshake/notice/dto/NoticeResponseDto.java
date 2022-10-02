package kr.co.handshake.notice.dto;

import kr.co.handshake.notice.domain.Notice;
import kr.co.handshake.notice.domain.NoticeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeResponseDto {
    private String index;
    private String category;
    private String title;
    private String url;
    private String writer;
    private String regDate;
    private String views;
    private NoticeEnum type;

    public NoticeResponseDto(Notice notice) {
        this.index = notice.getIndex();
        this.category = notice.getCategory();
        this.title = notice.getTitle();
        this.url = notice.getUrl();
        this.writer = notice.getWriter();
        this.regDate = notice.getRegDate();
        this.views = notice.getViews();
        this.type = notice.getType();
    }

    public Notice toEntity() {
        return Notice.builder()
                .index(index)
                .category(category)
                .title(title)
                .url(url)
                .writer(writer)
                .regDate(regDate)
                .views(views)
                .type(type)
                .build();
    }
}
