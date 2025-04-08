<!--거래내역 추가 버튼-->
<template>
  <button class="add-btn" @click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="white"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<script setup>
// 부모 컴포넌트에서 @click으로 받을 수 있도록 emit만 설정
</script>

<style scoped>
.add-btn {
  /*거래내역 추가 버튼*/
  position: fixed; /* ✅ 고정 위치 */
  bottom: 24px; /* 하단 여백 */
  right: 24px; /* 우측 여백 */
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 28px;
  background-color: #003366;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  z-index: 1000;
}

.add-btn:hover {
  background-color: #002855;
  transform: scale(1.05);
}
</style>
