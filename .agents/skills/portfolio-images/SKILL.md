---
name: portfolio-images
description: Create or update jagaldol.com project banners and screenshot thumbnails using SVG sources and PNG exports. Use for portfolio title strips and project cards, not general illustrations.
---

# Portfolio images

배너 작업은 아래 절차를, 썸네일 작업은 [썸네일 규격](references/thumbnails.md)을 따른다.

## 원본과 규격

- 이 저장소의 배너는 **1440 × 288 (5:1)** 제목 띠다. 기본 구성은 아이콘·로고와 프로젝트명이며, 프로젝트에 따라 짧은 부제를 사용할 수 있다.
- 사용자가 제공한 Figma SVG 4개를 [참고 원본 목록](references/figma-banners.md)에 보관한다. 가장 가까운 구성을 골라 렌더링해서 보고 시작한다. 공통값은 캔버스 규격이며 글자 크기·배치·색상을 하나로 고정하지 않는다.
- Figma 연결 없이 SVG를 직접 편집한다. 제목·로고를 생성형 이미지로 그리지 않는다. 기존에 승인된 로고가 있으면 재사용하고, 없으면 단순한 벡터 상징을 만든다. 서비스 공식 로고라고 표시하지 않는다.
- 편집 원본은 `public/projects/<category>/<slug>/banner.svg`, 사이트용 산출물은 같은 폴더의 `banner.png`다. 새 SVG에는 수정 가능한 텍스트와 벡터를 유지한다. 제공받은 원본의 윤곽선 텍스트와 내장 PNG는 그대로 보존한다. 외부 이미지·폰트 URL, 스크립트, `foreignObject`를 넣지 않는다.
- 목록 썸네일은 별도 `thumbnail.png`다. 배너 변경으로 썸네일을 덮어쓰지 않는다. 스크린샷·기능 설명·기술 배지는 제목 배너에 넣지 않는다.

## 제작

1. 해당 `src/content/<category>/<slug>.mdx`와 기존 자산을 읽는다. 새 배너는 [assets/banner.svg](assets/banner.svg)를 복사해서 시작한다. 기존 SVG가 있으면 직접 수정한다.
2. 캔버스 크기는 고정한다. 기본 템플릿의 흰 배경·144px 아이콘·48px 간격·76px Gmarket Sans 제목은 새 배너용 시작값일 뿐 Figma에서 추출한 수치가 아니다. 사용자가 기존 폰트는 Gmarket Sans라고 확인했다. 정확한 크기·굵기는 윤곽선 원본에서 복원했다고 단정하지 않는다.
3. 프로젝트명·색상·아이콘을 교체한다. 참고 배너에 맞춰 아이콘과 제목 묶음을 시각적으로 중앙 정렬한다. 아이콘이 없는 제목·부제 구성도 허용한다. 여백은 고정 숫자로 강제하지 않고 가장자리 잘림 없이 확보한다. 긴 제목은 글자 크기를 조정하되 가로로 강제 압축하지 않는다. 실제 렌더링을 보고 간격과 폭을 맞춘다.
4. 저장소 루트에서 내보낸다. 스크립트는 프로젝트에 설치된 `sharp`를 사용한다. 없으면 기존 lockfile에 따라 `npm ci`로 설치하며 새 의존성을 추가하지 않는다.

   ```sh
   node .agents/skills/portfolio-images/scripts/export-banner.mjs public/projects/sub/day-planner-enhanced/banner.svg
   ```

   기본 출력은 입력 파일과 같은 위치의 PNG다. 테스트용 출력 경로는 두 번째 인수로 지정할 수 있다. 배너 글꼴은 Gmarket Sans다. 내보내기 전 실제 폰트가 설치·로드되어 있는지 확인한다. 없으면 Arial 등의 자동 대체 결과를 완성본으로 사용하지 않는다. 기존 사이트 CSS의 웹폰트 선언은 sharp의 로컬 폰트 설치를 뜻하지 않는다. PNG는 확정된 글자 모양을 보존한다.

   `fc-match`가 맞더라도 sharp의 SVG 렌더러에서 다른 글꼴로 대체될 수 있다. 이 경우 실제 폰트 파일을 data URI `@font-face`로 로드한 임시 HTML에 SVG를 인라인으로 넣고, 브라우저의 `document.fonts.ready`와 텍스트 폭을 확인한 뒤 SVG 요소를 정확한 캔버스 크기로 캡처한다. 임시 HTML은 작업 후 제거한다. Gmarket Sans 공식 TTF의 family는 `Gmarket Sans TTF`다.

5. MDX의 `banner`는 PNG 경로, `image`는 별도 썸네일 경로로 연결한다. `deploy_link`는 배너 클릭 대상이 필요한 경우에만 둔다.

## 검증과 반영

- PNG를 직접 보고 글자 잘림·불필요한 여백·아이콘 변형을 확인한다. 내보내기 성공만으로 시각 검증을 대신하지 않는다.
- 상세 페이지에서 데스크톱·모바일의 5:1 비율과 기술 배지 간격을 확인한다. 목록 썸네일도 별도로 확인한다.
- MDX나 페이지 코드가 바뀌면 `npm run build`, 코드가 바뀌면 `npm run lint`, 마지막에 `git diff --check`를 실행한다.
- `next start` 미리보기는 새 빌드 후 기존 프로세스를 재시작한다. 같은 경로의 PNG를 교체했으면 이미지 캐시로 구버전이 보이지 않는지도 확인한다.
- SVG와 PNG를 함께 보존한다. 다른 프로젝트 자산을 일괄 변경하지 않으며, 커밋·push·배포는 현재 요청의 범위를 따른다.
