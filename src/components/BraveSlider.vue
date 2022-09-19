<template>
    <div class="main" :style="cssStyle">
      <div class="header" @mousedown="hdrMosDn" @mouseup="mdrMosUp" id="mainheader">
        <div><h1>ToolBar</h1></div>
        <h1>tool box</h1>
      </div>
      <slot></slot>
    </div>
    </template>
    <script>
      export default {
        data(){
          return {
            cssStyle:{
              left  : '10px',
              top : '10px',
            },
            PrevX:"",
            PrevY:"",
            currentEl:null,
          }
        },
        methods:{
          hdrMosDn(e){
            this.PrevX = e.clientX;
            this.PrevY = e.clientY;
            this.currentEl = e.target;
            console.log(this.PrevY  +  "testing first");
            console.log(this.PrevX);
            // console.log(this.currentEl);
            console.log(e);
    
            window.addEventListener("mousemove", this.mouseMove);
            window.addEventListener("mouseup" , this.mdrMosUp);
          },
    
            mouseMove(e){
              let newPosX = this.PrevX - e.clientX;
              let newPosY = this.PrevY - e.clientY;
              // console.log(newPosX  +   "testing 2nd");
              // console.log(newPosY  +   "testing 2nd");
    
              const elBoundingRect = this.currentEl.getBoundingClientRect();
               
              // console.log(this.elBoundingRect);
              var leftPos = elBoundingRect.left - newPosX;
              var topPos = elBoundingRect.top - newPosY;
              if(leftPos < 10){
                leftPos = 10;
              }
              if(topPos < 10){
                topPos = 10;
              }
              
              var maxLeft = window.innerWidth  - 66 - 10;
              var maxTop = window.innerHeight - 450 - 5;
              console.log(maxTop);
    
              if(leftPos > maxLeft){
                leftPos = maxLeft;
              }
              if(topPos > maxTop){
                topPos = maxTop;
              }
    
              this.cssStyle.left = leftPos +"px";
              this.cssStyle.top = topPos +"px";
            
    
              this.PrevX = e.clientX;
              this.PrevY = e.clientY;
              
    
            },
      
          mdrMosUp(e){
            window.removeEventListener("mousemove", this.mouseMove);
            window.removeEventListener("mouseup" , this.mdrMosUp);
          }
    
        }
    
      }
    </script>
    <style scoped>
      .header{
       
        height: 24px;
        background-color: rgba(99, 94, 94, 0.844);
        cursor: move;
      }
      .main {
        width: 66px;
        height: 450px;
        position: absolute;
        border-radius: 42px;
        background-color: bisque;
      }
      h1{
        color: white;
        text-align: center;
      }
    </style>