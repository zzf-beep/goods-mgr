<template>
  <div class="jc-component__range">
    <div class="jc-range" :class="rangeStatus?'success':''" >
        <div class="backbg"></div>
        <i @mousedown="rangeMove">
          {{rangeStatus?successIcon:startIcon}}
        </i>
        <div>{{rangeStatus?successText:startText}}</div>
    </div>
  </div>
</template>

<script src='./index.js'>
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
