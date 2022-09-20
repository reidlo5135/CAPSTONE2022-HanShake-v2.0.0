package kr.co.handshake.notice.domain;

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
@Table(name = "notice")
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "notice_index", nullable = false)
    private String index;

    @Column(name = "notice_category", nullable = true)
    private String category;

    @Column(name = "notice_title", nullable = false)
    private String title;

    @Column(name = "notice_url", nullable = false)
    private String url;

    @Column(name = "notice_writer", nullable = false)
    private String writer;

    @Column(name = "notice_regDate", nullable = false)
    private String regDate;

    @Column(name = "notice_views", nullable = false)
    private String views;

    @Enumerated(EnumType.STRING)
    @Column(name = "notice_type", nullable = false)
    private NoticeEnum type;
}
