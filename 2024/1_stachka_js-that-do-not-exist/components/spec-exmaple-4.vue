<template>
  <div class="w-full grid grid-cols-[1fr_1fr] gap-2">
    <div class="text-[14px] text-left font-serif bg-[#010b1e3f] p-4 rd-1 line-height-normal">
      <strong c-orange>Task queues</strong> are <strong c-orange>sets</strong>, not <strong c-orange>queues</strong>, because the <strong c-orange>event loop</strong> processing model grabs the first <strong c-orange>runnable task</strong> from the chosen queue, instead of dequeuing the first task.
    </div>
    <div class="text-[14px] text-left font-serif bg-[#010b1e3f] p-4 rd-1 line-height-normal">
      <strong c-orange>Очереди задач</strong> это <strong c-orange>наборы</strong>, а не <strong c-orange>очереди</strong>,
      так как модель выполнения <strong c-orange>Event Loop</strong>-а забирает первую <strong c-orange>возможную для запуска задачу</strong> из выбранной очереди, а не снимает первую задачу
    </div>
  </div>

</template>
<style>
.example-3 {
  * {
    transition: opacity 0.2s;
  }

  ol {
    opacity: 1 !important;
  }
}
</style>
<script setup>
</script>