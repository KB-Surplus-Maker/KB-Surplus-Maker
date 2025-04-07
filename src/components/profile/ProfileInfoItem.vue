<!-- <script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import EditProfileItem from "./EditProfileItem.vue";

const props = defineProps({
  label: String,
  field: String,
});

const showModal = ref(false);
const userStore = useUserStore();

const displayValue = computed(() => {
  const value = userStore.currentUser?.[props.field];
  if (props.field === "password") return "●●●●";
  return value || "-";
});
</script>

<template>
  <div
    class="d-flex justify-content-between align-items-center py-2 border-bottom"
    @click="showModal = true"
    style="cursor: pointer"
  >
    <span>{{ label }}</span>
    <span class="text-muted">{{ displayValue }}</span>

    <EditProfileItem
      v-if="showModal"
      :label="label"
      :field="field"
      :current-value="userStore.currentUser[field]"
      @close="showModal = false"
    />
  </div>
</template> -->
<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import EditProfileItem from "./EditProfileItem.vue";

const props = defineProps({
  label: String,
  field: String,
});

const showModal = ref(false);
const userStore = useUserStore();

const displayValue = computed(() => {
  const value = userStore.currentUser?.[props.field];
  if (props.field === "password") return "●●●●";
  return value || "-";
});
</script>

<template>
  <!-- 카드 항목 -->
  <div
    class="d-flex justify-content-between align-items-center py-2 border-bottom"
    @click="showModal = true"
    style="cursor: pointer"
  >
    <span>{{ label }}</span>
    <span class="text-muted">{{ displayValue }}</span>
  </div>

  <!-- 모달은 카드 바깥에 렌더링 -->
  <EditProfileItem
    v-if="showModal"
    :label="label"
    :field="field"
    :current-value="userStore.currentUser[field]"
    @close="showModal = false"
  />
</template>
