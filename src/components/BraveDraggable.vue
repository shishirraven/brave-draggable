<template>
    <div ref="rootElement" class="draggable"
        :style="{width:width , height:height,top:computedPosition.top,left:computedPosition.left,bottom:computedPosition.bottom,right:computedPosition.right,transform:computedPosition.transform}"
        v-if="this.cvisible">
        <slot :hide="hide" :onHandleMouseDown="onHandleMouseDown"></slot>
    </div>
    <div v-if="horizontalCenter && showSnapping" style="position: fixed; left:50%; top:0px; bottom:0px; border-left: 1px solid red;opacity:.3; width: 1px;z-index: -1;"></div>
    <div v-if="verticalCenter && showSnapping" style="position: fixed; top:50%; left:0px; right:0px; border-top: 1px solid red;opacity:.3; height: 1px;z-index: -1"></div>
</template>
<script>
import dragFunctionality from '../mixins/drag_functionality.js'
export default {
    name: 'BraveDrag',
    mixins: [dragFunctionality],
    data() {
        return {
            cvisible: this.visible,
            cPlacement: this.placement,
            cPosition: {
                top: 'auto',
                left: 'auto',
                bottom: 'auto',
                right: 'auto',
            },            
        }
    },
    props: {
        // ====== Apply default props ======

        bounds : {
            type: Object,
            default: {
                 
                    top: 20,
                    left: 20,
                    bottom: 20,
                    right: 20,
                }
        },
        automaticDocking: {
            type: Boolean,
            default: true
        },
        visible: {
            type: Boolean,
            default: true
        },
        width: {
            type: String,
            default: 'auto'
        },
        height: {
            type: String,
            default: 'auto'
        },
        placement: {
            type: String,
            default: 'top-left' //  top-left, top-center, top-right, right-center, bottom-right, bottom-center, bottom-left, left-center 
        },
        position: {
            type: Object,
            default: {
                top: '10px',
                left: '10px',
                bottom: 'auto',
                right: 'auto',
                transform: 'auto',
            }
        },
        snappingDistance: {
            type: Number,
            default: 20
        },
    },
    methods: {
        show() {
            this.cvisible = true
        },
        hide() {
            this.cvisible = false
        },
    },
    created() {
        this.cPosition = {
            top: 'auto',
            left: 'auto',
            bottom: 'auto',
            right: 'auto',
            transform: 'auto',
        }
        if (this.cPlacement == 'center') {
            this.cPosition = {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        }
        if (this.cPlacement == 'top-left') {
            this.cPosition = {
                top: this.position.top,
                left: this.position.left,

            }
        }
        else if (this.cPlacement == 'top-center') {
            this.cPosition = {
                top: this.position.top,
                left: "50%",
                transform: "translateX(-50%)",

            }
        }
        else if (this.cPlacement == 'top-right') {
            this.cPosition = {
                top: this.position.top,
                right: this.position.right,
            }
        }
        else if (this.cPlacement == 'right-center') {
            this.cPosition = {
                right: this.position.right,
                top: "50%",
                transform: " translateY(-50%)"
            }
        }
        else if (this.cPlacement == 'bottom-right') {
            this.cPosition = {
                bottom: this.position.bottom,
                right: this.position.right,
            }
        }
        else if (this.cPlacement == 'bottom-center') {
            this.cPosition = {
                bottom: this.position.bottom,
                transform: "translateX(-50%)",
                left: "50%",
            }
        }
        else if (this.cPlacement == 'bottom-left') {
            this.cPosition = {
                left: this.position.left,
                bottom: this.position.bottom,
            }
        }
        else if (this.cPlacement == 'left-center') {
            this.cPosition = {
                left: this.position.left,
                top: "50%",
                transform: " translateY(-50%)"
            }
        }
    }
}
</script>
<style scoped>
.draggable {
    position: fixed;
}
</style>