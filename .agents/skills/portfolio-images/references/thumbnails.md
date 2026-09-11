# 프로젝트 썸네일

배너(1440 × 288)와 별개로, 목록 카드의 `image`에 연결할 `thumbnail.svg`와 `thumbnail.png`를 만든다. 주된 캔버스는 **1200 × 800 (3:2)**이고 배경은 투명하다. 검은색으로 보이는 미리보기 배경을 검정 배경 사각형으로 복제하지 않는다.

## 사용자 제공 원본

| 원본 | 캔버스 | 화면 배치 | 외부 그림자 |
| --- | --- | --- | --- |
| [Zotero](../assets/references/thumbnail-zotero.svg) | 1200×800 | x77 y73, 1046×653, radius 10 | offset 0, stdDeviation 10, 검정 50%, dilate 2 |
| [매일 메일](../assets/references/thumbnail-maeil-mail.svg) | 1200×800 | x29 y110, 1142×580, 브라우저 프레임 | dy 2, stdDeviation 10, 검정 50% |
| [UnDoc](../assets/references/thumbnail-undoc.svg) | 1200×800 | 폭 685의 세로 화면, 브라우저 프레임 | dy 2, stdDeviation 10, 검정 50% |
| [Profile Counter](../assets/references/thumbnail-profile-counter.svg) | 1113×852 | 중앙 카운터 | offset 0, stdDeviation 10, 검정 50% |

`stdDeviation=10`은 SVG 필터의 값이다. Figma blur 수치와 동일한 숫자라고 간주하지 않는다. 브라우저 장식의 내부 그림자는 화면의 외부 그림자와 구분한다. Profile Counter는 기존 예외로 보존하고 새 기본 규격으로 확대하지 않는다.

## 제작과 확인

1. 실제 공개 가능한 제품 화면을 선택한다. 브라우저 앱이면 기존 브라우저 프레임을 참고하고, Obsidian 같은 데스크톱 앱에는 불필요한 브라우저 장식을 추가하지 않는다.
2. 1200×800 투명 SVG 안에 화면을 비율 유지해 중앙 배치한다. Zotero의 여백·모서리·그림자를 일반 화면의 시작점으로 삼되 화면 비율이 다르면 너비·높이를 조정한다. 억지로 늘이거나 중요한 UI를 잘라내지 않는다.
3. 원본 화면을 data URI로 내장하고 clipPath로 모서리를 처리한다. SVG 필터에는 실제 원본의 Gaussian blur·불투명도·offset을 사용한다. 이미지 자체에 그림자가 이미 있으면 이중으로 적용하지 않는다.
4. SVG를 sharp로 PNG 출력한다. `export-banner.mjs`는 배너 규격 검사 전용이므로 썸네일에 사용하지 않는다. 저장소에 설치된 sharp를 사용해 `sharp(svgPath).png().toFile(pngPath)`로 출력하고 1200×800 및 alpha 채널을 확인한다.
5. 투명 PNG를 사이트 카드 배경 위에서 보고 그림자 잘림·화면 가독성을 확인한다. 카드 자체의 CSS drop-shadow와 이미지 내부 그림자는 다른 요소이므로 결과를 보고 판단한다. 상세 페이지의 배너는 바꾸지 않는다.
