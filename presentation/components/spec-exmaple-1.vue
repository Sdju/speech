<template>
  <div class="spec-example example-1" :data-hide="$clicks">
    <h1>20.1.3.6 Object.prototype.toString ( )</h1>
    <p>This method performs the following steps when called:</p>
    <ol data-not-hide="*">
      <li data-not-hide="1">If the
        <emu-val>this</emu-val>
        value is
        <emu-val>undefined</emu-val>
        , <span v-mark.green="{at:1, strokeWidth: 3}">return</span>
        <emu-val>"[object Undefined]"</emu-val>
        .
      </li>
      <li>If the
        <emu-val>this</emu-val>
        value is
        <emu-val>null</emu-val>
        , return
        <emu-val>"[object Null]"</emu-val>
        .
      </li>
      <li data-not-hide="2">Let <var>O</var> be <span v-mark.green="{at:2, strokeWidth: 3}">!</span>&nbsp;<emu-xref
        aoid="ToObject" id="_ref_8973"
      ><a href="#sec-toobject">ToObject</a></emu-xref>
        (
        <emu-val>this</emu-val>
        value).
      </li>
      <li data-not-hide="3">Let <var>isArray</var> be <span v-mark.green="{at:3, strokeWidth: 3}">?</span>&nbsp;<emu-xref
        aoid="IsArray" id="_ref_8974"
      ><a href="#sec-isarray">IsArray</a></emu-xref>
        (<var>O</var>).
      </li>
      <li>If <var>isArray</var> is
        <emu-val>true</emu-val>
        , let <var>builtinTag</var> be
        <emu-val>"Array"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a
        [[ParameterMap]] internal slot, let <var>builtinTag</var> be
        <emu-val>"Arguments"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a [[Call]]
        internal method, let <var>builtinTag</var> be
        <emu-val>"Function"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has an
        [[ErrorData]] internal slot, let <var>builtinTag</var> be
        <emu-val>"Error"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a
        [[BooleanData]] internal slot, let <var>builtinTag</var> be
        <emu-val>"Boolean"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a
        [[NumberData]] internal slot, let <var>builtinTag</var> be
        <emu-val>"Number"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a
        [[StringData]] internal slot, let <var>builtinTag</var> be
        <emu-val>"String"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a
        [[DateValue]] internal slot, let <var>builtinTag</var> be
        <emu-val>"Date"</emu-val>
        .
      </li>
      <li>Else if <var>O</var> has a
        [[RegExpMatcher]] internal slot, let <var>builtinTag</var> be
        <emu-val>"RegExp"</emu-val>
        .
      </li>
      <li>Else, let <var>builtinTag</var> be
        <emu-val>"Object"</emu-val>
        .
      </li>
      <li data-not-hide="4">Let <var>tag</var> be ?&nbsp;<emu-xref
        aoid="Get" id="_ref_8975"
      ><a href="#sec-get-o-p" class="e-user-code">Get</a></emu-xref>
        (<var>O</var>,
        <emu-xref href="#sec-well-known-symbols" id="_ref_8976" v-mark.green="{at:4, strokeWidth: 3}"><a href="#sec-well-known-symbols">@@toStringTag</a>
        </emu-xref>
        ).
      </li>
      <li>If <var>tag</var>
        <emu-xref href="#sec-ecmascript-language-types-string-type" id="_ref_8977"><a
          href="#sec-ecmascript-language-types-string-type"
        >is not a String</a></emu-xref>
        , set <var>tag</var> to <var>builtinTag</var>.
      </li>
      <li>Return the
        <emu-xref href="#string-concatenation" id="_ref_8978"><a href="#string-concatenation">string-concatenation</a>
        </emu-xref>
        of
        <emu-val>"[object "</emu-val>
        , <var>tag</var>, and
        <emu-val>"]"</emu-val>
        .
      </li>
    </ol>
  </div>
</template>
<style>
.example-1 {
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