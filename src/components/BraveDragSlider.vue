<template>
    <div class="dragesidebar">
        <div class="sideToolBarHead" @mousedown="mouseDownBtn" @mouseup="mouseUp">
            <h1>ToolBar</h1>
        </div>
        <div class="toolBarMenu">
           
        </div>
    </div>

</template>
<script>
   export default {
    data(){
        return{
            PrevX:"",
            PrevY:"",
            CurrentElement:"",
        }
    },
    methods:{
        // ======= This is a mousedown function ========
        mouseDownBtn(e){
            console.log(e);
            this.PrevX = e.clientX;
            this.PrevY = e.clientY;
            this.CurrentElement = e.target;
      
            window.addEventListener("mousemove",this.mouseMove);
            window.addEventListener("mouseup",this.mouseUp);
        },
        // ======= This is a mouseMove function ========
        mouseMove(e){
            let newPosX = this.PrevX - e.clientX;
            let newPosY = this.PrevY - e.clientY;
          
            const ElementPos = this.CurrentElement.getBoundingClientRect();
         
            var leftPos = ElementPos.left - newPosX;
            var topPos = ElementPos.top - newPosY;


            var maxLeft = window.innerWidth  - 70 - 10;
            var maxTop = window.innerHeight  - 335 - 5;

            this.CurrentElement.style.left = leftPos +"px";
            this.CurrentElement.style.top = topPos +"px";
        
            this.PrevX = e.clientX;
            this.PrevY = e.clientY;



        },
         // ======= This is a MouseUp function ========
        mouseUp(e){
            window.removeEventListener("mousemove",this.mouseMove);
            window.removeEventListener("mouseup",this.mouseUp)
            console.log("Your Mouse is Up");
        }

    }
 
   }
</script>
<style scoped>
.dragesidebar{
    margin-top: 10px;
    margin-left: 20px;
    width: 70px;
}
.sideToolBarHead{
    cursor: move;
    text-align: center;
    background-color: rgba(130, 126, 126, 0.88);
}
.toolBarMenu{
    background-color: oldlace;
    width: 70px;
    height: 335px;
    text-align: center;
}
</style>