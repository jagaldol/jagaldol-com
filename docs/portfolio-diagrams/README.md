# 업무 프로젝트 구성도

`ibk-agent-flow.drawio`, `ibk-chunk-validator.drawio`, `ews-components.drawio`가 편집 원본이다. SVG는 Draw.io Desktop CLI에서 light theme, page bounds로 내보냈으며 웹에서는 내용 해시 파일명을 사용한다.

- IBK: 최종 인턴 발표자료의 의도 분류와 Function Call 흐름을 축약했다. 일반 응답과 도구 실행 경로만 표현하며 RAG 전체 시스템을 그린 것은 아니다.
- Chunk Validator: 검색된 청크와 질문을 함께 평가해 유효 근거만 생성 단계에 전달하는 흐름이다. 검색 모듈 구현이나 전체 RAG 소유를 의미하지 않는다.
- EWS: 같은 자료의 시스템 구성에서 Agent Layer, Data Ingestion, 대화 메모리, RAG 저장소 관계를 추렸다. 서비스는 상위 애플리케이션을 묶어 표현한다. 녹색은 담당 구현 컴포넌트다.

서버 주소, API 경로, 실제 업무 문서와 화면은 포함하지 않는다. 현재 로컬 포트폴리오 검토용이며 회사의 대외 공유 승인은 확인되지 않았다.

EWS 상세 페이지는 `ews-data-ingestion-portfolio.drawio`와 `ews-agent-layer-portfolio.drawio`의 SVG를 사용한다. 사용자가 작성한 최종 인턴 발표자료 26장(Data Ingestion)·29장(Agent Layer)의 구조와 보존된 구현 코드를 바탕으로 포트폴리오용으로 다시 그렸다. 녹색 계열, 직교 연결선과 충분한 간격을 사용하며 클릭하면 크게 볼 수 있다.

- Data Ingestion: Job Manager의 작업 접수·상태 조회와 비동기 파싱·청킹·임베딩·PostgreSQL 적재 흐름. Data Governance는 코드에 placeholder만 있어 구현 흐름에서 제외했다.
- Agent Layer: Context Builder, 병렬 분류, Router, RAG 또는 일반 대화, 도구 호출 반복과 SSE 응답, 응답 후 대화 메모리 갱신 흐름. 전후처리와 개별 스트리밍 이벤트는 단순화했다. 메모리는 스레드별 프로세스 내 상태이며 영속 저장을 뜻하지 않는다. 원본의 TOBE Chunk Validator는 구현되지 않아 제외했다.

이전 요약도(`ews-data-ingestion.drawio`, `ews-agent-layer.drawio`, `ews-components.drawio`)와 발표자료 PNG는 참고용으로 유지하며 현재 슬라이드에서 참조하지 않는다.

포트폴리오 페이지 순서는 Agent Layer → Data Ingestion이다. 응답에서 메모리로 이어지는 바깥쪽 화살표는 다음 턴에서 사용할 대화 상태의 갱신을 나타내며 SSE 전송 자체가 저장 작업을 수행한다는 뜻은 아니다.
