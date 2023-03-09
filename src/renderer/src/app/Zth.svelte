<script lang="ts">
  let done = false;
</script>

<div class={"zth" + (done ? " hide" : "")}>
  <h1>Forge WX3264</h1>

  <div class="cards">
    <div class="card highlighted">
      <h1>WX3264 [Current]</h1>

      <div class="list">
        <span>- Supported on windows, mac, and linux</span>
        <span>- Basic features for circuit design</span>
      </div>
    </div>

    <div class="card">
      <h1>Forge [Extreme] (Soon)</h1>

      <div class="list">
        <span>- Hardware, software, and firmware development</span>
        <span>- Runs on optimised hardware</span>
        <span>- Advanced features for circuit design</span>
        <span>- Advanced version control system</span>
      </div>
    </div>
  </div>

  <button on:click={() => { done = true; }}>Continue</button>
</div>

<style lang="scss">
  @import "./config.scss";

  .zth {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    background: $l1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid $d0;
    flex-direction: column;
    transition: 200ms;

    button {
      margin-top: 20px;
      width: 180px;
      height: 30px;
      background: $d0;
      color: $f1;
      border: 1px solid transparent;
      justify-self: flex-start;
      margin-right: auto;
      border-radius: 2px;
      transition: 200ms;

      &:hover {
        background: $d1;
        border: 1px solid $d1;
        cursor: pointer;
      }
    }

    &.hide {
      transform: scale(0.9) translate(-55%, -55%);
      opacity: 0;
      pointer-events: none;
    }

    h1 {
      font-weight: normal;
      color: $f0;
    }

    .cards {
      display: flex;
      gap: 10px;

      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 300px;
        border-radius: 2px;

        &.highlighted {
          background: $ct1;
          padding: 10px;

          h1 {
            color: $l1;
          }

          span {
            color: $l0;
          }
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
          width: 100%;
        }
      }
    }
  }
</style>
