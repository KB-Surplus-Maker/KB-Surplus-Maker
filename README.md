# 💰 흑자메이커 - Vue3 기반 개인 가계부 웹앱

> 수입과 지출을 쉽게 기록하고 확인할 수 있는 직관적이고 깔끔한 가계부 웹 서비스

---

## 📌 프로젝트 소개

**흑자메이커**는 Vue3, Pinia, JSON Server를 기반으로  
사용자가 수입과 지출을 간편하게 관리할 수 있도록 설계된 웹 가계부입니다.  
달력 기반 시각화와 기간별 상세 조회 기능으로,  
**자신의 소비 패턴을 분석하고 계획적인 지출을 도와줍니다.**

---

## 🖥️ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 로그인/회원가입 | 사용자 인증 및 상태 관리  
| 👤 프로필 관리 | 이름, 생년월일, 전화번호, 이메일, 비밀번호, 이미지 수정  
| ➕ 거래 등록 | 수입/지출 거래를 직접 입력  
| 📋 거래 내역 | 월별 거래내역 리스트 확인  
| 🗓️ 달력 보기 | 날짜별 수입/지출 시각화  
| 📊 대시보드 | 도넛/라인 차트로 통계 시각화  
| 🔍 기간별 조회 | 원하는 기간 동안의 거래내역을 정렬 및 필터링  
| 🧾 거래 상세보기 | 거래 항목 클릭 시 수정/삭제 가능  
| 📱 반응형 UI | 모바일/데스크탑 환경 모두 대응

---

## 🛠️ 사용 기술

| 구분 | 기술 스택 |
|------|-----------|
| Frontend | Vue 3, Pinia, Vue Router, Bootstrap 5  
| Backend | JSON Server (Mock API)  
| Chart | Chart.js  
| 기타 | Axios, Composition API

---

## ⚙️ 설치 및 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/your-username/surplus-maker.git
cd surplus-maker

# 2. 의존성 설치
npm install

# 3. JSON Server 실행 (포트: 3000)
npx json-server --watch db.json --port 3000

# 4. 개발 서버 실행
npm run dev

