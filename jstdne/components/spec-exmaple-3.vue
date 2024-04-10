<template>
  <div class="spec-example example-3">
    <h5 id="queuing-tasks"><span class="secno">8.1.7.2</span> Queuing tasks<a href="#queuing-tasks" class="self-link"></a></h5>
    <p>To <dfn id="queue-a-task" data-export="">queue a task</dfn> on a <a href="#task-source" id="queuing-tasks:task-source">task source</a> <var>source</var>, which
      performs a series of steps <var>steps</var>, optionally given an event loop <var>event loop</var>
      and a document <var>document</var>:</p>
    <ol>
      <li><p>If <var>event loop</var> was not given, set <var>event loop</var> to the <a
        href="#implied-event-loop" id="queuing-tasks:implied-event-loop"
      >implied
        event loop</a>.</p></li>
      <li><p>If <var>document</var> was not given, set <var>document</var> to the <a
        href="#implied-document" id="queuing-tasks:implied-document"
      >implied
        document</a>.</p></li>
      <li><p>Let <var>task</var> be a new <a href="#concept-task" id="queuing-tasks:concept-task">task</a>.</p></li>
      <li><p>Set <var>task</var>'s <a href="#concept-task-steps" id="queuing-tasks:concept-task-steps">steps</a> to
        <var>steps</var>.</p></li>
      <li><p>Set <var>task</var>'s <a href="#concept-task-source" id="queuing-tasks:concept-task-source">source</a> to
        <var>source</var>.</p></li>
      <li><p>Set <var>task</var>'s <a
        href="#concept-task-document" id="queuing-tasks:concept-task-document"
      >document</a>
        to the
        <var>document</var>.</p></li>
      <li><p>Set <var>task</var>'s <a
        href="#script-evaluation-environment-settings-object-set"
        id="queuing-tasks:script-evaluation-environment-settings-object-set"
      >script evaluation environment settings object set</a> to an
        empty <a id="queuing-tasks:set" href="https://infra.spec.whatwg.org/#ordered-set" data-x-internal="set">set</a>.
      </p></li>
      <li><p>Let <var>queue</var> be the <a href="#task-queue" id="queuing-tasks:task-queue">task queue</a> to which
        <var>source</var>
        is
        associated on <var>event loop</var>.</p></li>
      <li><p><a
        href="https://infra.spec.whatwg.org/#list-append" id="queuing-tasks:list-append" data-x-internal="list-append"
      >Append</a> <var>task</var> to <var>queue</var>.</p></li>
    </ol>
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