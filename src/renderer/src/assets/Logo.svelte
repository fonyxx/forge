<script lang="ts">
  export let opacity = 1;
</script>

<div class="logo" style={`
  opacity: ${opacity};
`}>
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 80H0L30 50L15 35H35L50 50L80 20H100L70 50L85 65H65L50 50L20 80Z" fill="currentcolor"/>
  </svg>
</div>

<style lang="scss">
  .logo {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    width: 100%;
    height: 100%;
    transition: 200ms;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
