 <script setup>
 import BlurredPolyBackground from "./theme/components/backgrounds/BlurredPolyBackground.vue";
 import { useNav } from "@slidev/client";

 const { currentSlideNo } = useNav()
 </script>

 <template>
   <div>
     <BlurredPolyBackground />
     <div class="absolute right-[20px] bottom-[20px] text-lg opacity-50">{{ currentSlideNo }}</div>
   </div>
 </template>