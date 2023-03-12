<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import Icon from "@iconify/svelte"
    import type { DropDown } from "./TextField.ts";

    export let
        placeholder = "",
        initialValue = "",
        dropDown: DropDown[] = [],
        autoComplete = "",
        rtl = false;

    export let data: string = initialValue, loadable = false;
    let input: HTMLInputElement;
    let width = 0, height = 0, x = 0, y = 0;
    let element: HTMLDivElement;
    let positionLoop: any;
    let tempForceHide = false;
    let dropDownToUse: DropDown[] = [];
    let showDropDown = false;

    onMount(() => {
        input.value = initialValue;
        let client = element.getBoundingClientRect();

        x = client.x;
        y = client.y + client.height;

        positionLoop = setInterval(() => {
            let client = element.getBoundingClientRect();

            x = client.x;
            y = client.y + client.height;
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(positionLoop);
    });

    $: {
        if (JSON.stringify(dropDownToUse) != JSON.stringify(dropDown)) {
            tempForceHide = true;
            setTimeout(() => {
                dropDownToUse = dropDown;
                tempForceHide = false;
            }, dropDownToUse.length == 0 ? 0 : 200);
        }
    }
</script>

<div class={"text-field" + (dropDownToUse.length == 0 && data?.length > 0 && loadable ? " busy" : "")}
     bind:clientWidth={width} bind:clientHeight={height} bind:this={element}>
    <input dir={rtl ? "rtl" : "ltr"} bind:this={input} type="text" placeholder={placeholder} on:input={(e) => {
        data = e.target.value;
    }} on:blur={() => {
      showDropDown = false;
    }} on:focus={() => {
      showDropDown = true;
    }} />

    <div class={"loader" + (rtl ? " rtl" : "")}></div>

    <div
        class={"drop-down" + (dropDownToUse.length == 0 || tempForceHide || !showDropDown ? " hide" : "") + (rtl ? " rtl" : "")}
        style={`
            width: ${width}px;
            top: ${y}px;
            left: ${x}px;
            max-height: ${window.innerHeight - y - 10 - 10}px;
        `}
    >
        {#each dropDownToUse as item, index}
            <div class="item" on:mousedown={(e) => {
                e.preventDefault();
            }} on:click={() => {
                tempForceHide = true;

                setTimeout(() => {
                    input.blur();
                    input.value = "";
                    dropDown = [];
                    dropDownToUse = [];
                    data = "";
                    tempForceHide = false;

                    setTimeout(() => {
                        if (item.onClick) item.onClick();
                    }, 200);
                }, 200);
            }}>
                <div class={"icon " + (item.iconColor ? item.iconColor : "neutral") + (item.icon?.length > 0 ? "" : " no-icon")}>
                    {#if item.icon?.startsWith("[icon] ")}
                        <Icon icon={item.icon.replace("[icon] ", "")} />
                    {:else if item.icon?.length > 0}
                        <img src={item.icon} alt="$$" />
                    {/if}
                </div>

                <div class="info">
                    <div class={"best-match " + (item.bestMatch == false || item.bestMatch == undefined || item.bestMatch == null ? "hide" : "")}>
                        <span>Best Match</span>
                    </div>

                    <span class="label">{item.label}</span>

                    {#if item.value?.length > 0}
                        <span class="value">{item.value}</span>
                    {/if}

                    <div class="keywords" style={`max-width: ${width - 100}px`}>
                        {#each item.keywords as keyword}
                            <span>{keyword}</span>
                        {/each}
                    </div>
                </div>
            </div>

            {#if index < dropDownToUse.length - 1}
                <div class="divider"></div>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    @import "../c.scss";

    .text-field {
        width: 100%;
        border-radius: 3px;
        background: $d0;
        display: flex;
        align-items: center;
        border: 1px solid $bdr;
        transition: 200ms;
        overflow: hidden;
        position: relative;
        height: 100%;

        input {
            background: transparent;
            border: none;
            outline: none;
            color: $f1;
            width: 100%;
            height: 100%;
            border-radius: 3px;
            padding: 0 10px;
            border-bottom: 1px solid transparent;
            transition: 200ms;
        }

        &:focus-within {
            border-bottom-color: $c1;

            input {
                border-bottom-color: $c1;
            }
        }

        .loader {
          transition: 200ms;
          width: 50%;
          position: absolute;
          height: 2px;
          background: $c1;
          bottom: 0;
          transform: translate(-100%, 0);
          animation: loader 0.5s infinite;
          opacity: 0;
          pointer-events: none;

          &.rtl {
            animation-direction: reverse;
          }
        }

        @keyframes loader {
          0% {
            transform: translate(-100%, 0);
          }

          100% {
            transform: translate(200%, 0);
          }
        }

        &.busy {
          border-bottom-color: $bdr !important;

          input {
            border-bottom-color: $bdr !important;
          }

          .loader {
            opacity: 1;
          }
        }

        .drop-down {
            position: fixed;
            background: $l1;
            border: 1px solid $bdr;
            top: 0;
            left: 0;
            padding: 5px;
            border-radius: 6px;
            transform: translate(0, 10px);
            transition: 200ms;
            -webkit-app-region: no-drag;
            gap: 5px;
            display: flex;
            flex-direction: column;
            overflow: auto;
            box-shadow: $bxshd;

            &.hide {
                transform: translate(0, -10px);
                opacity: 0;
                pointer-events: none;
            }

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background: $c1;
                border-radius: 3px;
            }

            &::-webkit-scrollbar-track {
                background: $d0;
                border-radius: 3px;
            }

            .divider {
                width: calc(100% - 10px);
                height: 1px;
                background: $bdr;
                margin-left: 5px;
            }

            .item {
                display: flex;
                padding: 5px;
                transition: 200ms;
                cursor: pointer;
                gap: 10px;

                &:hover {
                    background: $d0;
                    border-radius: 3px;
                }

                .icon {
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    border-radius: 3px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    background: $d0;

                    &.no-icon {
                     background: transparent;
                    }

                    &.success {
                        color: $success1;
                    }

                    &.warning {
                        background: $warning1;
                        color: $l1;
                    }

                    &.error {
                        background: $hazard1;
                        color: $l1;
                    }
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    justify-content: center;

                    .best-match {
                        span {
                            padding: 0 5px;
                            background: $success1;
                            color: $l1;
                            border-radius: 3px;
                        }

                        &.hide {
                            display: none;
                        }
                    }

                    .keywords {
                        display: flex;
                        gap: 5px;
                        overflow: auto;
                        margin-top: 5px;

                        span {
                            background: $d0;
                            color: $f1;
                            padding: 0 5px;
                            border-radius: 3px;
                            font-size: 11px;
                            white-space: nowrap;
                        }

                        &::-webkit-scrollbar {
                            height: 3px;
                        }
                    }

                    .label {
                        color: $f0;
                        font-size: 11px;
                    }
                }
            }

          &.rtl {
            direction: rtl;
          }
        }
    }
</style>
