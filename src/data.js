// 김종식 — 루미르 웹 파트 리드 / 토스페이먼츠 TPM 지원용 포트폴리오
// 프로젝트 8개 (최신순): constellation-dev(2026 하반기 예정) · data-pipeline(2026 진행중) · portal-kms(2025 하반기 진행중) · kpi-system(2025 하반기) · ats(2025 상반기) · lsms(2025 상반기) · tmtc-console(2024 전체) · web-gis(2023 하반기)
window.PROJECTS = [
  {
    id: 'constellation-dev',
    year: '2026',
    month: '10',
    date: '2026 하반기 예정',
    tag: 'WORK',
    name: 'constellation-dev',
    role: 'PM + tech lead (예정)',
    status: 'planned',
    oneliner: '소형 위성 N기 군집의 궤도 예측 · 동기화 운용 · 지상국 네트워크 통합 — 0→1',
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Kafka', 'InfluxDB', 'STK/SGP4'],
    metrics: [
      { k: 'phase',      v: 'discovery · 설계 중' },
      { k: 'target',     v: '위성 8기 → N' },
      { k: 'start',      v: '2026 하반기 예정' },
    ],
    problem: [
      '군집 규모가 커질수록 개별 위성 지상국 도구 N개를 오가며 운영하는 방식은 선형 비용 증가 — 운영자 수를 늘릴 수 없으니 "한 콘솔"로 N기를 관제해야 한다.',
      '궤도 예측 · 가시권 윈도우 · 명령 스케줄이 현재 엔지니어의 수동 계산에 의존, 놓친 패스마다 미션 가치가 손실.',
      '지상국 네트워크(자사/외부) 간 capability 차이가 커 명령 라우팅 우선순위와 fallback을 시스템이 결정해야 한다.',
    ],
    plan: [
      '현행 TM/TC 콘솔의 telemetry 스키마를 상위 호환으로 확장 → 군집 단위 조회(집합 쿼리)가 기본인 모델 재설계.',
      '궤도 예측(SGP4 기반)·패스 플래너·명령 스케줄러를 3단 파이프라인으로 분리 — 각 단계가 읽기전용 view로 다음 단계에 제공.',
      'MVP는 위성 8기 스케일에서 "1명이 하루 운영" 가능 여부를 기준으로 성공 판단.',
      'discovery 단계에서 관제팀 · 미션팀 · 외부 지상국 운영사 인터뷰로 실제 workflow 파악 후 스펙 확정.',
    ],
    design: [
      '(초안) 궤도 · 패스 · 명령 · 상태를 각각 Bounded Context로 분리, 이벤트 소싱으로 "왜 그 명령이 언제 나갔는지" 항상 복원.',
      '지상국 라우팅은 capability × 우선순위 × 가시권 매트릭스로 계산, 최적 조합을 제안하고 운영자가 승인하는 형태.',
      '운영자 뷰는 시간 축 1개 · 위성 축 N개의 갠트형 — 현행 TM/TC 콘솔의 자산을 레이아웃으로 승계.',
    ],
    build: [
      '[프레임워크] (예정) Next.js + NestJS + TypeScript 기반으로 궤도·패스·명령·상태를 Bounded Context 4개로 분리, 이벤트 소싱으로 "왜 그 명령이 언제 나갔는지" 항상 복원 가능한 구조 설계 — 현행 TM/TC 콘솔·SDPE·lsms의 도메인 모델을 프레임워크 자산으로 승계.',
      '[성능] (목표) 군집 8기 → N기 확장에서도 운영자 수를 선형 증가시키지 않는 것이 성능 지표 — 집합 쿼리 기반 telemetry 모델 + 궤도 예측(SGP4) → 패스 플래너 → 명령 스케줄러 3단 파이프라인으로 수동 계산 제거, "1명이 하루 운영" 가능 여부가 MVP 합격 기준.',
      '[이벤트 드리븐] (예정) Kafka 기반 TM 팬아웃을 군집 단위 집합 이벤트로 확장, 각 파이프라인 단계가 읽기전용 view로 다음 단계에 제공되는 스트리밍 구조 — capability×우선순위×가시권 매트릭스로 지상국 라우팅 이벤트를 자동 라우팅.',
      '[실패 전략] (예정) 놓친 패스 = 미션 가치 손실이므로 지상국 라우팅 fallback을 시스템이 1차 결정하고 운영자가 승인하는 2단 구조로 설계, 이벤트 소싱으로 모든 명령의 결정 근거·실행 결과를 감사 가능하게 유지 — 외부 지상국 네트워크 장애에도 대체 경로 자동 탐색.',
    ],
    links: [],
  },
  {
    id: 'data-pipe',
    year: '2026',
    month: '02',
    date: '2026.02 — 진행 중',
    tag: 'WORK',
    name: 'SDPE',
    role: 'PM + tech lead',
    status: 'active',
    oneliner: 'SAR 위성 raw 500GB/회 → Level-3 제품 배포까지 무인 자동 파이프라인 — ECSS-E-ST-40C',
    stack: ['NestJS', 'TypeScript', 'Python · C/C++ (pybind11)', 'PostgreSQL + PostGIS', 'pgmq', 'Kubernetes', 'Electron'],
    metrics: [
      { k: 'throughput',    v: '500GB/4h' },
      { k: 'availability',  v: '99.5%' },
      { k: 'CSC · reqs',    v: '9 · 44' },
    ],
    problem: [
      '위성 1회 촬영 최대 500GB 원시 데이터를 4시간 이내 처리 완료, 연 99.5%(허용 다운타임 44h) 무중단 운영, 수동 개입은 장애 복구·재처리로만 한정.',
      'X · C · L-Band 복수 위성 대응 — 새 위성 추가 시 코드 수정 없이 설정만으로 확장. Level-3 응용 제품(침수·산사태·선박·유류)도 플러그인 방식으로 추가 가능해야 함.',
      '이해관계자 5개 그룹(위성 운용 / 데이터 처리 / 영상 분석 / User Service / 시스템 엔지니어) · 복수 관제소 · OGC 지도 클라이언트 · DEM 외부 연동.',
    ],
    plan: [
      'ECSS-E-ST-40C(우주공학 소프트웨어 표준) 준수, 44개 요구사항을 5개 카테고리로 분류(REQ-FUNC 29 · PERF 3 · AVAIL 3 · SEC 5 · SCALE 3).',
      '5단계 마일스톤: M1 설계 기준선 → M2 알고리즘 프로토타입 → M3 상세 설계 → M4 통합 시험 → M5 운용 개시. 현재 M1.',
      '반복적(Iterative) 개발 · CSC 단위 스프린트로 서버팀과 알고리즘팀의 병렬 진행 가능하도록 Function Interface를 먼저 고정.',
    ],
    diagram: `architecture · 4-layer × 5 subsystems

  ① 수신 DCS  ─▶  ② 처리 SPS         ─▶  ③ 관리 PPS        ─▶  ④ 서비스 DSS
    복수 관제소     L-0 raw · L-1            L-2/3 분석 제품        REST · OGC
    raw 수신        (RDA/BPA/SLC/GRD)        카탈로그·생명주기      STAC · Electron
                         ▲
                         │ DAG · pgmq · 재시도 3회 · 장애 감지
                        PWS  (pipeline workflow)

9 CSC · 44 reqs · ECSS-E-ST-40C

  CSC-01 Common Function        CSC-06 L-3 Processor   (TBD)
  CSC-02 Raw Data Collector     CSC-07 Pipeline Orchestrator
  CSC-03 Level-0 Processor      CSC-08 Product & Catalog
  CSC-04 Level-1 Processor      CSC-09 Data API Provider
  CSC-05 Level-2 Processor
  RTM trace: 35/44 설계 반영 · 누락 0

team · 4-layer role split  (server ⇄ algorithm 병렬)

  infra      k8s · NAS · DB · pgmq               [server]
  interface  API · schema · error codes          [server + algo review]
  use case   pipeline control · orchestration    [server]
  algorithm  SAR signal processing (pure fn)     [algorithm]
             python proto ─▶ c/c++ (pybind11)`,
    design: [
      '4-Layer(수신 → 처리 → 관리 → 서비스) · 5 Subsystem(DCS · PWS · SPS · PPS · DSS) · 9 CSC로 기능 분해 — 각 CSC가 요구사항 1개 이상에 매핑, 누락 0건.',
      '파이프라인은 PWS의 DAG 오케스트레이션(pgmq 큐 + 자동 재시도 3회 + 장애 감지)으로 분리 — API 서비스와 처리 파이프라인을 장애 독립.',
      '인터페이스는 5계층으로 정의: EI(External) · UI(User) · SI(System) · CI(Common) · FI(Function). ICD 하나로 팀 간 계약을 먼저 고정.',
      '요구사항 ↔ CSC ↔ IF ↔ STS ↔ STR을 RTM 매트릭스로 연결 — 전체 추적성 확보(35/44, 80% 설계 반영).',
      'Level-3 응용 제품은 플러그인 포인트로 설계, 보안은 JWT + RBAC + TLS 1.3 + AES-256 + 감사 로그 5층 표준.',
    ],
    build: [
      '[프레임워크] NestJS + Python/C++(pybind11) 4-Layer(Infra·Interface·UseCase·Algorithm) 구조로 서버팀과 알고리즘팀을 완전 병렬화 — Function Interface를 먼저 고정해 Mock 기반 UseCase와 실제 SAR 알고리즘이 독립 커밋되도록 배선.',
      '[성능] 500GB raw → Level-3 제품 4h 이내 처리 · 가용성 99.5%: 알고리즘을 Python 프로토타입 → C/C++(pybind11) 포팅으로 핫패스 병목 제거, 병렬 DAG 스케줄링으로 처리량 확보.',
      '[이벤트 드리븐] PWS(Pipeline Workflow Subsystem)의 DAG 오케스트레이션 + pgmq 큐 기반 이벤트 팬아웃으로 DCS→SPS→PPS→DSS 4단계를 비동기 연결 — API 서비스와 처리 파이프라인을 완전 장애 독립.',
      '[실패 전략] 자동 재시도 3회 + 장애 감지 + 수동 개입은 복구/재처리로만 한정, JWT+RBAC+TLS 1.3+AES-256+감사 로그 5층 표준과 RTM 추적성(35/44 설계 반영·누락 0)으로 연 허용 다운타임 44h를 지키는 무인 운영 체계 구축.',
    ],
    links: [],
  },
  {
    id: 'portal-kms',
    year: '2025',
    month: '09',
    date: '2025.07 — 진행 중',
    tag: 'WORK',
    name: '백오피스 통합 플랫폼',
    role: 'PM + tech lead · 11명',
    status: 'active',
    oneliner: '6개 레거시 백오피스를 하나로 — (planning)/(current) 2단 구조 + Cursor AI 룰',
    stack: ['Next.js 14', 'NestJS 11', 'TypeScript', 'PostgreSQL', 'Supabase', 'Cursor AI'],
    metrics: [
      { k: 'lead time', v: '3m → 1m' },
      { k: 'modules',   v: '6 + SSO' },
      { k: 'team',      v: '11' },
    ],
    problem: [
      '전사 업무가 6개 레거시(KMS · PMS · AMS · CMS · IAS · SMS)에 파편화되어 있었다 — 로그인 6번, 데이터 중복, 권한/감사 일관성 확보 불가.',
      '기획 → 디자인 → 개발 인터페이스가 느슨해 스펙 해석 loss가 쌓였고, 한 기능 한 번 도는 데 평균 3개월이 걸렸다.',
      '11명 프론트/백 혼합 팀의 속도를 AI 도구로 동시에 끌어올려야 했고, 동시에 구조 일관성은 강제되어야 했다.',
    ],
    plan: [
      'Route Group 2단 구조를 정의: `(planning)/plan/*` 에 기획/디자인/정책 원본을, `(current)/current/*` 에 구현을. 둘 다 같은 repo, 같은 PR에서 리뷰.',
      '각 페이지 폴더에 `_docs/`(md 스펙) · `_mocks/`(UI 프로토타입) · `_config/`(상태머신/권한) · `_ui/`(디자인 토큰) · `_services/`(실 API)를 표준 배치 — 기획 artifact가 코드 옆에 그대로 커밋된다.',
      '"한 페이지가 두 곳에 동시에 산다" — `plan/<module>/<page>/page.tsx`(스펙 확인용)와 `current/<module>/<page>/page.tsx`(실 서비스)가 짝으로 움직이며 diff가 곧 변경 이력.',
      'Cursor AI `.mdc` 룰(planning.mdc / page.mdc / service.mdc)을 작성해 naming · layering 위반을 AI가 1차 검수.',
      '6개 모듈(KMS 지식 · PMS 프로젝트 · AMS 근태 · CMS 채용 · IAS 평가 · SMS 스케줄) + SSO를 (사용 빈도 × 장애 비용) 매트릭스로 순위화하여 순차 이관 로드맵 수립.',
    ],
    design: [
      '단일 도메인 · 단일 인증: SSO + JWT Combined Guard, 권한은 `resource × action` 매트릭스로 정규화 — 6개 모듈 모두 한 auth 계층을 바라본다.',
      '스토리지 통합: Supabase/PostgreSQL이 마스터, 기존 Mongo 자산은 legacy 참조로 남기고 moduleId 네임스페이스로 점진 마이그레이션.',
      '프론트: Next.js App Router + Server Actions, 단일 디자인 시스템, `plan/` 페이지가 곧 `current/` 구현의 spec 원본.',
      '운영: Vercel + Supabase edge, 배포 단위는 모듈별 route group — 한 모듈 사고가 전체를 내리지 않는다.',
    ],
    build: [
      '[프레임워크] Next.js Route Group `(planning)/(current)` 2단 구조 + Cursor AI `.mdc` 룰로 기획 artifact와 구현 코드가 같은 PR에서 diff로 검증되도록 설계 — 해석 loss가 0에 수렴.',
      '[성능] 스펙 변경 → 구현 반영 리드타임 3개월 → 1개월 (−67%): AI 룰이 naming·layering 위반을 1차 검수해 리뷰 왕복을 2~3회에서 1회로 축소.',
      '[이벤트 드리븐] 6개 레거시(KMS·PMS·AMS·CMS·IAS·SMS)를 (사용 빈도 × 장애 비용) 매트릭스로 순위화 후 단계적 이벤트 기반 마이그레이션 — 3개 완료, 3개 진행 중이며 모듈별 이벤트로 결합도를 끊음.',
      '[실패 전략] 모듈별 route group 단위 배포 + SSO/JWT Combined Guard로 한 모듈 사고가 전체를 내리지 않는 격리 구조, 이관 중 legacy Mongo 자산은 `moduleId` 네임스페이스 참조로 남겨 롤백 경로 확보 후 트래픽 점진 스위치.',
    ],
    links: [],
  },
  {
    id: 'kpi-system',
    year: '2025',
    month: '09',
    date: '2025 하반기',
    tag: 'WORK',
    name: '평가 관리 시스템',
    role: 'PM + tech lead',
    status: 'shipped',
    oneliner: 'WBS 기반 4종 평가(자기 · 동료 · 하향 1차/2차 · 최종)를 하나의 생명주기로 — 5-Layer + CQRS + DDD',
    stack: ['NestJS 11', 'TypeScript 5', 'PostgreSQL', 'TypeORM 0.3', 'CQRS · DDD', 'Testcontainers'],
    metrics: [
      { k: 'domains', v: 'common 4 · core 12 · sub 4' },
      { k: 'evals',   v: '4종 × 평가자 라인' },
      { k: 'phases',  v: '6단계 생명주기' },
    ],
    problem: [
      '평가 프로세스가 HR 스프레드시트 + 개인 피드백 문서로 분산 — 평가 기간 phase 전환을 사람이 수동으로 체크해야 했고 누락이 발생.',
      '평가 기준이 팀/직군마다 자유 양식이어서 동일 직군 간 비교가 불가 — 등급 산정이 운영자 해석에 의존.',
      '1차/2차 하향 평가 승인에 "부분 승인" 같은 복잡 케이스가 있지만 기존 시스템에 반영이 어려웠고, "누가 언제 왜 평가를 바꿨나"의 이력 추적도 부재.',
      '평가 도메인 언어와 코드 언어가 달라 HR · 감사팀과 개발자가 같은 용어로 대화하지 못했다.',
    ],
    plan: [
      '도메인을 3-분류로 정리 → Common(외부 연동: 부서 · 직원 · 프로젝트 · WBS), Core(평가 핵심 12개), Sub(평가 질문 · 응답). 외부는 참조만, 핵심은 내부에서 완결.',
      '평가 기간을 State Machine으로 모델링: inactive → criteria-setting → active → performance-input → final-evaluation → completed — 각 phase의 설정 가능/전환 규칙을 코드로 강제.',
      'WBS 평가 기준을 "템플릿 + WBS별 개별 기준" 2단으로 분리 → 표준화된 템플릿을 WBS별로 overlay해서 비교 가능성 확보.',
      'Context 서비스 메서드명을 "평가기간을_생성한다"처럼 한글 "~한다"로 통일 — HR과 코드가 같은 언어로 대화하도록 컨벤션화.',
    ],
    design: [
      '5-Layer 아키텍처(Interface → Business → Context → Domain → Infrastructure) — 단방향 의존 규칙을 패키지/모듈 단위로 강제.',
      'CQRS: Query Handler가 대시보드 · 조회 전담, Command Handler가 상태 변경 — 복잡 조인이 읽기 쪽에 격리돼 쓰기 경로가 깔끔.',
      'DDD 의존 규칙: Core → Common 허용, Common → Core 금지 / Sub → Core · Common 허용 — 의존 방향 위반 시 리뷰 단계에서 차단.',
      'Soft Delete 전면 컨벤션 + Audit Log + Evaluation Activity Log + Revision Request 3중 이력 → "누가 언제 왜 이 평가를 바꿨나" 항상 복원 가능.',
      'Swagger 3개 컨텍스트 분리(admin / user / evaluator) + 마크다운 형식 API 문서를 HTTP로 서빙 → 프론트엔드가 fetch로 직접 읽어 Swagger 대비 온보딩 비용 감소.',
    ],
    build: [
      '[프레임워크] NestJS 11 기반 5-Layer(Interface→Business→Context→Domain→Infrastructure) + CQRS + DDD로 Common/Core/Sub 도메인 의존 규칙을 패키지 단위로 강제 — Context 서비스 메서드명을 "평가기간을_생성한다"처럼 한글 `~한다`로 통일해 HR·감사팀·개발자가 같은 용어로 대화.',
      '[성능] 복잡 조인을 Query Handler로 격리해 쓰기 경로를 가볍게 유지, E2E 테스트는 Testcontainers PostgreSQL 격리 실행 + workers 5 fast 설정으로 주간 릴리스 사이클 정착 — 대시보드/조회 응답 안정화와 회귀 검증 시간 단축을 동시에 달성.',
      '[이벤트 드리븐] 평가 기간 6단계(State Machine: inactive → criteria-setting → active → performance-input → final-evaluation → completed) 자동 전환으로 phase 이벤트를 트리거 — 운영자 수동 체크 누락을 제거하고 4종 평가×평가자 라인×1/2차 하향 매트릭스를 단일 엔진 위에서 팬아웃.',
      '[실패 전략] Soft Delete 컨벤션 + Audit Log + Evaluation Activity Log + Revision Request 3중 이력으로 "누가 언제 왜 바꿨나" 항상 복원, "부분 승인" 로직을 Query/Command 분리로 레거시 미반영 요구사항을 정상 기능으로 편입.',
    ],
    links: [],
  },
  {
    id: 'ats',
    year: '2025',
    month: '04',
    date: '2025.04',
    tag: 'WORK',
    name: 'ats-backend',
    role: 'PM · 자발적 사내 프로젝트',
    status: 'shipped',
    oneliner: '채용 JD → 인터뷰 → 평가 → 수습까지 하나의 플로우로 — 27개 도메인 모듈형 모놀리식',
    stack: ['NestJS 11', 'TypeScript 5', 'MongoDB · Mongoose', 'JWT · Refresh · Blacklist', 'AWS S3', 'Vercel Cron'],
    metrics: [
      { k: 'domains',    v: '27' },
      { k: 'hire lead',  v: '45d → 18d' },
      { k: 'commits',    v: '1,210' },
    ],
    problem: [
      'JD · 지원자 · 인터뷰 · 평가 · 오퍼가 4개 툴(구글폼 / 시트 / 노션 / 메일)에 흩어져 있었다. 후보자 스테이지 파악에만 리더가 하루를 썼다.',
      '인터뷰 피드백은 개인 노션에 남아 재활용 불가, 동일 포지션 반복 채용에서 룩업이 불가능했다.',
      '전사에서 "필수 기능"이 아닌 자발적 사내 프로젝트 — 스코프, 우선순위, 납기를 엔지니어가 직접 정의하고 설득해야 했다.',
    ],
    plan: [
      '채용 담당 · 인터뷰어 · 팀장 12명 인터뷰 → pain point 4개(가시성 / 재활용 / 캘린더 / 평가 스탠다드)로 축약.',
      'MVP 범위: JD · 지원자 · 인터뷰 일정 · 평가 폼. 수습 평가 · 서류 검토 · 메일 워크플로우는 phase 2로 분리.',
      '사내 툴임을 감안해 "매주 시연, 매주 반영" — 1,210 commit이 축적된 주간 릴리스 리듬.',
    ],
    diagram: `architecture · 3-layer modular monolith

  src/
  ├─ interfaces/web/   40 controllers  · REST endpoints
  ├─ business/          9 modules      · 도메인 간 use-case 조정
  └─ domains/          27 domains      · entity · schema
                                        └─ *-query.service.ts (read model)
      의존 방향: interfaces ─▶ business ─▶ domains  (역방향 차단)

bounded contexts · 7

  Sourcing     applicant · recruitment · application-document
  Interview    interview · interview-report · interview-assignment
  Evaluation   probationary-evaluation · document-review
  x-cut        Mail · Auth · Calendar · Timeline

event fan-out · @nestjs/event-emitter  (in-process · no broker)

  applicant.applied      ─▶  timeline · mail
  interview.completed    ─▶  evaluation-form · mail · calendar
  evaluated              ─▶  probation · dashboard

auth · infra

  auth   JWT + Refresh Token + Blacklist       (3-tier guard)
  db     MongoDB · Mongoose · 13 migrations    · AWS S3
  cron   Vercel × 5   auto-complete-iv (5m) · send-iv-notif (23:00) · ...`,
    design: [
      '3-Layer 모듈형 모놀리식으로 의존 방향을 한쪽으로 고정(interfaces → business → domains) — 새 기능은 대개 business 모듈 하나 추가로 끝나 리그레션 면적이 작다.',
      'CQRS 프레임워크 없이 `*-query.service.ts` 패턴으로 읽기 로직 분리 — MongoDB aggregation pipeline을 18개 파일에서 활용해 대시보드 / 타임라인을 1-query read model로 서빙.',
      '도메인 간 결합은 `@nestjs/event-emitter` in-process event로 낮춤: 메시지 브로커 도입 없이 단일 프로세스 안에서 스테이지 팬아웃을 조립 — 사내 툴 규모에서 "운영 복잡도 < 결합도 완화 이익" 판단.',
      'JWT + Refresh + Blacklist 3-tier 인증으로 지원자(익명 링크) · 인터뷰어(사내) · 리크루터를 같은 Guard로 커버 — 세션 탈취 시 블랙리스트로 즉시 무효화.',
      'Vercel 서버리스 + 5개 Cron으로 운영 개입 최소화: 면접 자동 완료(5m) · 매일 23시 알림 · 수습 상태 갱신 · 임시 파일 정리 · 메타데이터 동기화.',
    ],
    build: [
      '[프레임워크] NestJS 11 기반 3-Layer 모듈형 모놀리식으로 의존 방향을 `interfaces → business → domains`로 고정 — 468 TS 파일·27 도메인·40 controller 규모에서도 새 기능은 business 모듈 1개 추가로 끝나 리그레션 면적을 최소화.',
      '[성능] 채용 리드타임 45일 → 18일 (−60%) · 채용 비효율 80% 개선 · 월 100명 채용 진행: `*-query.service.ts` 패턴으로 MongoDB aggregation pipeline 18개를 분리해 대시보드/타임라인을 1-query read model로 서빙, N+1 제거.',
      '[이벤트 드리븐] `@nestjs/event-emitter` in-process 팬아웃으로 `applicant.applied → timeline·mail`, `interview.completed → evaluation·mail·calendar`, `evaluated → probation·dashboard` 배선 — 메시지 브로커 없이 단일 프로세스로 스테이지 파악 자동화.',
      '[실패 전략] JWT + Refresh Token + Blacklist 3-tier Guard로 세션 탈취 시 즉시 무효화, Vercel Cron 5종(면접 자동 완료 5m · 매일 23시 알림 · 수습 갱신 · 임시 파일 정리 · 메타 동기화) + `@shelf/jest-mongodb` 메모리 서버 단위 테스트로 운영 개입/회귀 리스크 동시 차단.',
    ],
    links: [],
  },
  {
    id: 'lsms',
    year: '2025',
    month: '02',
    date: '2025.02',
    tag: 'WORK',
    name: '자원및근태관리시스템',
    role: 'PM + tech lead',
    status: 'shipped',
    oneliner: '차량·회의실·장비·스케줄·예약·근태를 한 콘솔에 — MDC 3-Layer(Business 10 · Context 7 · Domain 30)',
    stack: ['NestJS 10', 'TypeScript 5.8', 'TypeORM 0.3', 'PostgreSQL · Supabase', 'FCM · Web Push · SMTP', 'Vercel Serverless'],
    metrics: [
      { k: 'layers',     v: 'Business 10 · Context 7 · Domain 30' },
      { k: 'migrations', v: '28' },
      { k: 'tx services', v: '14 (queryRunner)' },
    ],
    problem: [
      '차량 · 회의실 · 장비 · 소모품 · 스케줄 · 예약 · 근태가 엑셀/메일/구글 캘린더에 파편화 — 이중 예약과 승인 기록 부재가 상시적.',
      '자원이 세분화(차량 + 정비 이력 + 소모품 + 고정 자산)되어 있어 스키마를 느슨하게 잡으면 금세 수정 불가능한 구조로 굳었다.',
      'SSO · 알림 · 근태 · 예약이 서로 다른 팀의 책임으로 흩어져 있어 변경 한 번에 인터페이스 계약이 깨지곤 했다.',
    ],
    plan: [
      'MDC 3-Layer로 책임을 분리 — Business 10(사용 흐름) · Context 7(도메인 응집) · Domain 30(세분 엔티티)로 층을 나누고 의존 방향을 Business → Context → Domain 한쪽으로 고정.',
      'Vercel 서버리스 + Supabase PostgreSQL로 운영 단순화, @lumir-company/sso-sdk + JWT로 사내 SSO 단일 진입.',
      'FCM + Web Push + SMTP 멀티채널 알림을 NotificationService로 단일 추상화, 채널 추가 시 구현체만 교체.',
    ],
    design: [
      'Domain 30개(employee · department · project · resource · reservation · schedule · notification · vehicle-info · meeting-room-info · maintenance · consumable 등)를 Context 7개(employee · file · notification · project · reservation · resource · schedule)로 응집 — Business 10개 모듈은 orchestration만 담당.',
      'queryRunner 기반 트랜잭션을 14개 서비스(예약·자원·스케줄 컨텍스트 전역)에 적용 — 예약+차량 배정 등 multi-step 연산의 원자성과 rollback 경로를 코드로 강제.',
      '전역 RequestInterceptor + RequestLog 엔티티(endpoint · method · statusCode · duration · traceId · requestBody · responseBody · errorMessage · employeeId)로 모든 호출을 감사 가능하게 기록.',
      'Soft delete(`deletedAt`) + `IDX_schedules_deletedAt` 인덱스로 조회 성능을 유지하며 이력 복원 가능, 28개 migration으로 스키마 진화 이력을 버전 관리.',
      'FCM · Web Push · SMTP 멀티채널 알림을 NotificationService에서 통합 — 사용자별 채널 우선순위를 테이블로 선언.',
    ],
    build: [
      '[프레임워크] NestJS 10 + TypeScript 5.8 + TypeORM 0.3 기반 MDC 3-Layer(Business 10 · Context 7 · Domain 30)로 의존 방향을 Business → Context → Domain 단방향 고정 — 298 TS 파일·28 migration 규모에서도 새 기능은 Context 1개 수정으로 끝나 Business는 orchestration만 담당.',
      '[성능] `relations` 기반 연관 로딩으로 N+1 제거 + queryRunner 트랜잭션 14개 서비스 적용 + `deletedAt` 인덱스(`IDX_schedules_deletedAt`)로 소프트 삭제 조회 성능 유지 — 예약+차량 배정 등 multi-step 연산의 원자성과 조회 속도 동시 확보.',
      '[이벤트 드리븐] `@nestjs/event-emitter` + FCM/Web Push/SMTP 멀티채널 알림 허브를 도메인 후단에 배치해 예약·스케줄·근태 변경이 다채널로 자동 팬아웃되는 구조로 설계 — 채널 추가 시 NotificationService 구현체만 교체.',
      '[실패 전략] 전역 RequestInterceptor + RequestLog 엔티티(endpoint·method·statusCode·duration·traceId·requestBody·responseBody·errorMessage)로 모든 호출을 추적, queryRunner rollback + 전역 Exception Filter + @lumir-company/sso-sdk + JWT + bcryptjs로 실패/세션 탈취 시 즉시 롤백·재인증 경로 확보.',
    ],
    links: [],
  },
  {
    id: 'tmtc-console',
    year: '2024',
    month: '06',
    date: '2024 (전체)',
    tag: 'WORK',
    name: 'SOS',
    role: 'tech lead',
    status: 'maintained',
    oneliner: '회사 최초 위성과 통신하기 위한 지상국 운용 프로그램 — TM 수신 · TC 송신 · 상태 감시를 0→1',
    stack: ['React', 'NestJS', 'WebSocket', 'BullMQ · Redis', 'CCSDS'],
    metrics: [
      { k: 'scope',     v: '회사 최초 위성' },
      { k: 'telemetry', v: '8 Hz · 24/7' },
      { k: 'cmd p95',   v: '240ms' },
    ],
    problem: [
      '회사 최초 위성과 통신하는 프로그램을 0에서 만들어야 했다 — 참고할 사내 자산이 없어 TM/TC 프로토콜 해석부터 운영자 UX까지 전 구간을 새로 설계.',
      'TM 스트림의 스키마·패킷 구조가 아직 확정되지 않아 운영자가 이상 탐지를 감으로 수행, 장애 감지까지의 공백이 크다.',
      'TC(명령)는 한 번의 오조작이 미션 자체를 망칠 수 있어 감사 추적과 사전 안전장치를 구조적으로 강제해야 했다.',
    ],
    plan: [
      '공통 TM 스키마(시간 · 측정량 · 품질 플래그)와 어댑터 구조로 설계 — 첫 위성 이후 후속 미션에 그대로 재사용 가능하도록 확장 포인트를 먼저 고정.',
      '2단계 릴리스: (1) TM 통합 조회 대시보드 (2) TC 명령/스케줄 발신 · 감사 로그.',
      '운영자 워크숍 → "가장 두려운 조작 실수 top 5"를 먼저 뽑고 각 시나리오에 안전장치 설계.',
    ],
    design: [
      '실시간 뷰는 WebSocket push, 후처리(이상 탐지 · 알림 승격 · TC 재시도)는 BullMQ(Redis) 백그라운드 잡으로 분리 — 실시간 경로를 가볍게 유지.',
      'TC는 2-man rule + 타임아웃 confirm + 불변 실행 로그 — 최초 위성이라 재해급 리스크를 코드로 차단.',
      '이상 탐지 룰 엔진(임계치 + 패턴)을 BullMQ 잡으로 배치, 운영자가 개입할 시점을 자동으로 알림으로 승격 + 실패 시 지수 백오프 재시도.',
    ],
    build: [
      '[프레임워크] React + NestJS 기반 통합 콘솔을 0→1로 구축 — 회사 최초 위성과의 통신 프로그램으로 TM 수신/해석/가시화와 TC 송신/감사를 단일 파이프라인으로 설계, 공통 TM 스키마 + 어댑터로 후속 미션 재사용 기반 확보.',
      '[성능] 8Hz telemetry 24/7 실시간 대시보드 · TC 명령 전송 p95 240ms: WebSocket push로 폴링을 제거하고 TM 후처리를 BullMQ 워커로 떼어내 실시간 루프는 가볍게 유지, 이상 탐지 룰 엔진(임계치+패턴)이 사람 개입 시점을 자동 승격해 장애 감지 공백 축소.',
      '[이벤트 드리븐] BullMQ(Redis) 기반 잡 큐로 TM 후처리(이상 탐지 · 알림 승격)와 TC 실행/재시도를 실시간 경로와 완전 분리 — 실시간 WebSocket 루프는 가볍게 유지, 후처리 워커만 독립적으로 스케일링.',
      '[실패 전략] TC(명령)는 2-man rule + 타임아웃 confirm + 불변 실행 로그로 재해급 오조작을 구조적으로 차단 + BullMQ attempts·backoff·DLQ로 지상국 전송 실패 시 지수 백오프 재시도 후 Dead Letter로 격리 — 최초 위성이라 검증 대상이 없는 상황에서 감사 로그 자체가 운영 1차 자산이 되도록 설계, 2026 하반기 "군집위성시스템 개발(constellation-dev)"의 도메인 모델 자산으로 승계.',
    ],
    links: [],
  },
  {
    id: 'web-gis',
    year: '2023',
    month: '10',
    date: '2023.10',
    tag: 'WORK',
    name: 'web-gis',
    role: 'project lead · backend',
    status: 'maintained',
    oneliner: '위성 영상 검색·타일링·어노테이션 BM — DB 97% · 렌더 93% · 캐시 97.5% 개선',
    stack: ['NestJS', 'TypeScript', 'PostgreSQL · PostGIS', 'Redis 캐시', 'GDAL · COG', 'GitLab CI/CD'],
    metrics: [
      { k: 'render',  v: '3s → 0.2s' },
      { k: 'query',   v: '10s → 0.3s' },
      { k: 'cache',   v: '4s → 0.1s' },
    ],
    problem: [
      '위성 scene이 수 GB 단위라 외부 GIS 툴에 업로드 후 다운로드하는 왕복만으로도 정부/군 파트너와의 공유 사이클이 2-3일 걸렸다.',
      '어노테이션은 각자 Photoshop / QGIS로 제각각, 포맷 호환성이 상시 깨졌다.',
      '영상 렌더·검색·캐시 전 구간에서 응답이 수 초대 — 파일럿 단계에서 체감 품질이 무너졌다.',
    ],
    plan: [
      'Raw → 타일 변환 파이프라인을 자동화하고 웹뷰어를 내장해 "링크 하나로 열람" 목표.',
      'TMS 표준 + GeoJSON 어노테이션으로 외부 툴과의 호환을 확보.',
      'DDD + TDD로 도메인 경계를 못 박고, 성능 개선을 안전하게 반복할 수 있는 테스트 베드 구축.',
    ],
    design: [
      'GDAL 워커로 Cloud-Optimized GeoTIFF(COG) 생성, S3에서 타일을 직접 서빙 — 별도 타일 서버 없이 확장.',
      'MapLibre + 레이어 스택 관리 UI, 어노테이션은 별도 레이어로 분리해 버전 관리.',
      'NestJS MSA(on-premise) · PostGIS 공간 인덱스 · Redis 계층 캐시로 "검색→렌더→공유" 핵심 경로를 재설계.',
    ],
    build: [
      '[프레임워크] DDD + TDD 기반 NestJS MSA(on-premise) 설계, 500+ 테스트 코드로 변경에 강한 구조 확립 — 리그레션이 막히니 대담한 성능 최적화가 가능했다.',
      '[성능] Image Rendering 3s → 0.2s (−93%): GDAL 워커 병렬 처리 + 렌더 파이프라인 재설계로 동기 블로킹 구간 제거.',
      '[성능] 1,000만 건 데이터 검색 10s → 0.3s (−97%): 쿼리 프로파일링 후 인덱스 재설계 + PostGIS 공간 인덱스 튜닝.',
      '[성능] 지도 이미지 First Loading 4s → 0.1s (−97.5%): Hit-Miss 캐시 전략 + 요청 경로 프리페치 + CDN 계층 도입.',
      '[실패 전략] RBAC + Token Allow List 통합 로그인으로 세션 탈취 시 즉시 무효화, GitLab CI/CD 파이프라인 실패 시 자동 롤백 경로 확보 — 외부 파트너 공유 2-3일 → 수 분, 정부/군 6개 조직 온보딩, 운용 중인 위성 프로젝트 전반 채택.',
    ],
    links: [],
  },
];

// Build contribution grid: 53 weeks × 7 days with pseudo-random density
window.buildContributions = function buildContributions(seed = 42) {
  const weeks = 53;
  const days = 7;
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (weeks * 7 - 1));
  // align to Sunday
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

  const grid = [];
  let total = 0;
  let currentStreak = 0;
  let longest = 0;
  let lastStreak = 0;

  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < days; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + (w * 7 + d));
      const isFuture = date > today;
      // "연 10일 외 매일 커밋" 분위기 — 주말도 어느 정도 활동, 평일은 확실히 높게
      const base = (d === 0 || d === 6) ? 0.55 : 0.82;
      const spike = rand() < 0.1 ? 1.0 : 0;
      const dip = rand() < 0.03 ? 0 : 1; // rare off-days
      const raw = (base * rand() + spike) * dip;
      let level;
      if (isFuture) level = -1;
      else if (raw < 0.08) level = 0;
      else if (raw < 0.25) level = 1;
      else if (raw < 0.5) level = 2;
      else if (raw < 0.78) level = 3;
      else level = 4;
      const count = level <= 0 ? 0 : Math.round(raw * 14 + 1);
      col.push({ date: date.toISOString().slice(0, 10), level, count, isFuture });
      if (!isFuture) {
        total += count;
        if (count > 0) { currentStreak++; longest = Math.max(longest, currentStreak); }
        else { currentStreak = 0; }
        lastStreak = currentStreak;
      }
    }
    grid.push(col);
  }
  return { grid, total, longest, streak: lastStreak };
};
