const posts = [
  {
    slug: "territorial-auction",
    title: "Territorial Auction — 실시간 영토 경매 전략 게임",
    summary:
      "50×50 그리드에서 영토를 경매로 점유하고 건설·공성으로 키우는 실시간 전략 웹앱. Claude Code 다중 에이전트 하네스로 개발·검증.",
    content: `# Territorial Auction

50×50 그리드 맵에서 10×10 픽셀 영토를 **경매로 점유**하고, **건설·생산**으로 키우며 **공성전**으로 빼앗는 실시간 전략 웹 애플리케이션.

**스택** — Spring Boot(Java 17) · React 18 + TypeScript · PostgreSQL · Redis · WebSocket(STOMP)

## 화면 가이드 (실제 캡쳐)
- 📘 [사용자 가이드](/my-blog/guides/user-guide.html) — 맵·경매·건설·공성·알림 등 12개 화면
- 🛡️ [관리자 운영 가이드](/my-blog/guides/admin-guide.html) — 대시보드·경매·시즌·밸런스·사용자·감사

## AI 활용 — 통제 구조로 개발
Claude Code에서 **역할과 쓰기 권한을 분리한 다중 에이전트**(설계 / 구현 / 리뷰 / 테스트)로 운영했다. 구현자의 가정이 검증 코드에 그대로 복제되지 않도록 테스트 작성을 분리한 것이 핵심이다.

## 대표 성과 — 정적 분석이 못 잡은 동시성 결함을 부하 테스트가 규명
100 VU로 경매 200건에 분산 입찰하는 부하 후 정합성 검증에서:

- 음수 locked AP **지갑 40개**(최저 -8,431,179), 총 AP **불일치 56개** 발견
- 원인: 경매별 락은 *동일 경매*만 직렬화 — 한 사용자가 여러 경매에서 동시에 환불·잠금당하는 지갑 행은 무방비
- 사용자 단위 비관적 락으로 수정 후 **음수 40 → 0, 불일치 56 → 0**, SLO 유지
- 이 결함은 **정적 리뷰·단위 테스트를 통과**했고 실제 부하 + 정합성 검증으로만 재현됐다 — AI가 못 잡는 지점을 통제 구조가 드러낸 사례

## 성능
- 맵 전체 응답 **p95 1,115ms → 248ms (77.8% 감소)** — 캐시 stampede 방지 + gzip
- 1시간 Soak **71,665 / 71,665 성공**, 커넥션·힙 누수 0
- 부하 데이터를 근거로 첫 MSA 분리 후보를 **Auction**으로 결정
`,
  },
  { slug: "first-post", title: "첫 번째 글", summary: "블로그를 시작하며 남기는 첫 인사입니다.", content: "# 첫 번째 글\n\n나의 첫 번째 글입니다. Markdown으로 작성한 콘텐츠를 React에서 렌더링합니다." },
  { slug: "second-post", title: "두 번째 글", summary: "다음 기능을 준비하며 정리한 메모입니다.", content: "# 두 번째 글\n\nTodo와 Canvas 실험을 블로그 안에서 함께 소개합니다." },
];

export default posts;
