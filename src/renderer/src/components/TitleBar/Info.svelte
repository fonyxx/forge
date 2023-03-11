<script lang="ts">
  import IconLogo from "../../assets/icons.svg";
  import type { DropDown } from "../TextField/TextField.ts";

  export let query = "", title = "Windows", rtl = false, dropDown: DropDown[] = [];
</script>

<div class="info">
  {#if !rtl}
    <div class="icon ltr">
      <div class={"loader" + (query.length > 0 && dropDown.length == 0 ? " show" : "")}></div>
      <img alt="" src={IconLogo} class={query.length > 0 && dropDown.length == 0 ? "hide" : ""} />
    </div>
  {:else}
    <span class="title">{title}</span>
  {/if}

  {#if rtl}
    <div class="icon rtl">
      <div class={"loader rtl" + (query.length > 0 && dropDown.length == 0 ? " show" : "")}></div>
      <img alt="" src={IconLogo} class={query.length > 0 && dropDown.length == 0 ? "hide" : ""} />
    </div>
  {:else}
    <span class="title">{title}</span>
  {/if}
</div>

<style lang="scss">
  @import "../c.scss";

  .info {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    .icon {
      width: 25px;
      height: 25px;
      min-width: 25px;
      max-width: 25px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;

      &.rtl {
        margin-right: 10px;
      }

      &.ltr {
        margin-left: 10px;
      }

      .loader {
        width: 100%;
        height: 100%;
        border: 3px solid $c1;
        border-top-color: $bdr;
        border-radius: 100%;
        animation: spin 0.25s linear infinite;
        position: absolute;
        opacity: 0;
        transition: 200ms;

        &.rtl {
          animation-direction: reverse;
        }

        &.show {
          opacity: 1;
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: 200ms;

        &.hide {
          opacity: 0;
        }
      }
    }
  }
</style>
