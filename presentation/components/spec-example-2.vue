<template>
  <div class="spec-example example-2">
    <emu-production
      name="ForInOfStatement" params="Yield, Await, Return" id="prod-ForInOfStatement" :data-hide="$clicks"
    >
      <emu-nt params="Yield, Await, Return" data-not-hide="1"><a href="#prod-ForInOfStatement">ForInOfStatement</a>
        <emu-mods>
          <emu-params v-mark.green="{at:1, strokeWidth: 3}">[Yield, Await, Return]</emu-params>
        </emu-mods>
      </emu-nt>
      <emu-geq>:</emu-geq>
      <emu-rhs a="w0xbna_a" id="prod-Za8VIr4f" data-not-hide="2">
        <emu-t>for</emu-t>
        <emu-t>(</emu-t>
        <emu-gann>[lookahead ≠
          <emu-t>let</emu-t>
          <emu-t>[</emu-t>
          ]
        </emu-gann>
        <emu-nt params="?Yield, ?Await" id="_ref_19378"><a
          href="#prod-LeftHandSideExpression"
        >LeftHandSideExpression</a>
          <emu-mods>
            <emu-params v-mark.green="{at:2, strokeWidth: 3}">[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>in</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19379"><a href="#prod-Expression">Expression</a>
          <emu-mods>
            <emu-params>[<span v-mark.green="{at:2, strokeWidth: 3}">+In</span>, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19380"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="7ml0tbdi" id="prod-_N8Q-kim">
        <emu-t>for</emu-t>
        <emu-t>(</emu-t>
        <emu-t>var</emu-t>
        <emu-nt params="?Yield, ?Await" id="_ref_19381"><a href="#prod-ForBinding">ForBinding</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>in</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19382"><a href="#prod-Expression">Expression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19383"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="zchtsyje" id="prod-xutvwaXc">
        <emu-t>for</emu-t>
        <emu-t>(</emu-t>
        <emu-nt params="?Yield, ?Await" id="_ref_19384"><a href="#prod-ForDeclaration">ForDeclaration</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>in</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19385"><a href="#prod-Expression">Expression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19386"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="e8xfsfow" id="prod-nLtPS4oB" data-not-hide="3">
        <emu-t>for</emu-t>
        <emu-t>(</emu-t>
        <emu-gann v-mark.green="{at:3, strokeWidth: 3}">[lookahead ∉ {
          <emu-t>let</emu-t>
          ,
          <emu-t>async</emu-t>
          <emu-t>of</emu-t>
          }]
        </emu-gann>
        <emu-nt params="?Yield, ?Await" id="_ref_19387"><a
          href="#prod-LeftHandSideExpression"
        >LeftHandSideExpression</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>of</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19388"><a
          href="#prod-AssignmentExpression"
        >AssignmentExpression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19389"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="58n_2ihn" id="prod-M1zjKbr6">
        <emu-t>for</emu-t>
        <emu-t>(</emu-t>
        <emu-t>var</emu-t>
        <emu-nt params="?Yield, ?Await" id="_ref_19390"><a href="#prod-ForBinding">ForBinding</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>of</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19391"><a
          href="#prod-AssignmentExpression"
        >AssignmentExpression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19392"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="pfvjbka1" id="prod-EoyoF5LI">
        <emu-t>for</emu-t>
        <emu-t>(</emu-t>
        <emu-nt params="?Yield, ?Await" id="_ref_19393"><a href="#prod-ForDeclaration">ForDeclaration</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>of</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19394"><a
          href="#prod-AssignmentExpression"
        >AssignmentExpression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19395"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="oprokwwm" constraints="+Await" id="prod-ReDwT2-b">
        <emu-constraints >[+Await]</emu-constraints>
        <emu-t>for</emu-t>
        <emu-t>await</emu-t>
        <emu-t>(</emu-t>
        <emu-gann >[lookahead ≠
          <emu-t>let</emu-t>
          ]
        </emu-gann>
        <emu-nt params="?Yield, ?Await" id="_ref_19396"><a
          href="#prod-LeftHandSideExpression"
        >LeftHandSideExpression</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>of</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19397"><a
          href="#prod-AssignmentExpression"
        >AssignmentExpression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19398"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="9bsmrb_a" constraints="+Await" id="prod-ut_uoPzp" data-not-hide="4">
        <emu-constraints v-mark.green="{at:4, strokeWidth: 3}">[+Await]</emu-constraints>
        <emu-t>for</emu-t>
        <emu-t>await</emu-t>
        <emu-t>(</emu-t>
        <emu-t>var</emu-t>
        <emu-nt params="?Yield, ?Await" id="_ref_19399"><a href="#prod-ForBinding">ForBinding</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>of</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19400"><a
          href="#prod-AssignmentExpression"
        >AssignmentExpression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19401"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
      <emu-rhs a="fxca1-1x" constraints="+Await" id="prod-jY1gwM9V">
        <emu-constraints>[+Await]</emu-constraints>
        <emu-t>for</emu-t>
        <emu-t>await</emu-t>
        <emu-t>(</emu-t>
        <emu-nt params="?Yield, ?Await" id="_ref_19402"><a href="#prod-ForDeclaration">ForDeclaration</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>of</emu-t>
        <emu-nt params="+In, ?Yield, ?Await" id="_ref_19403"><a
          href="#prod-AssignmentExpression"
        >AssignmentExpression</a>
          <emu-mods>
            <emu-params>[+In, ?Yield, ?Await]</emu-params>
          </emu-mods>
        </emu-nt>
        <emu-t>)</emu-t>
        <emu-nt params="?Yield, ?Await, ?Return" id="_ref_19404"><a href="#prod-Statement">Statement</a>
          <emu-mods>
            <emu-params>[?Yield, ?Await, ?Return]</emu-params>
          </emu-mods>
        </emu-nt>
      </emu-rhs>
    </emu-production>
  </div>
</template>
<style>
.example-2 {
  * {
    transition: opacity 0.2s;
  }
}
</style>