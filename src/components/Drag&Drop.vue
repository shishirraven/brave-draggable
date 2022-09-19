<template>ypositoin
<div class="main">
    <div class="DragSidebar border bg-neutral-400 mt-5 ml-3">
        <div class="bg-zinc-300 hover:bg-green-600" @mousedown="mouseDown" @mouseup="mouseUp">
            <h1 class="ml-2 pt-1 ">Calculater</h1>
        </div>

    </div>
</div>
</template>
<script>
export default {
    name:'DragDrop',
    data(){
        return {
            PrevX:"",
            PrevY:"",
            currentElementArea: "",

        }        
    },
    methods:{
        mouseDown(e){
            // console.log('Hey!! your mouse is button is Down');

            //   1. ========  e means event jis bhi dev me hamre function 
            //  laga hai uska puri value nikal ke de deta hai uske puri value nikal ke de 
            //  deta h ex(height, width, xpostion,  any other details) ==========

            // console.log(e);
            // console.log(e.x);
            // console.log(e.y);
             this.PrevX = e.x;
             this.prevY = e.y;
        
         

            // 2.====== e.target hame  jis div me funtion ka use huwa hai 
            // us div ke andar jiten element hai uska
            // html  console me print kar ke deta hai
            // aur e.target ke value hamne this.currentElementArea name ke variable ke 
            // assign kar di hai jo ki data function me return karwa hai ===========

            this.currentElementArea =  e.target;
            // console.log(this.currentElementArea);

            // 3. ===== addEventListener ek tarha se suna ne ka kam karta ha ki jase hi
            // mousedown function call ho wase hi ye done function sun ne  aur turant work kare ====
            window.addEventListener('mousemove', this.mouseMove);
            window.addEventListener('mouseup', this.mouseUp);
        },

         mouseMove(e){

            let NewValX =  this.PrevX - e.x;
            let NewValY = this.PrevY - e.y;

            const ElementVal = this.currentElementArea.getBoundingClientRect();
            // console.log(ElementVal);

//  =======================Test without know this is not understand i will again worked on this lines =====
           
            // let NewLeftVAl = ElementVal.x -  NewValX;
            // let NewTopVal = ElementVal.y - NewValY;

            // console.log(NewLeftVAl + 'NewleftVal');
            // console.log(NewTopVal + 'NewTopVal');


            // console.log(NewValX + 'this is a new value of prevx and element ki x');
            // console.log(NewValY + 'this is a new value of prevx and element ki x');


         },

         mouseUp(){
            console.log('Hey!! you mose in up and you moveing position is stop');
            window.removeEventListener('mousemove', this.mouseMove);
            window.removeEventListener('mouseup', this.mouseUp);
         }


    }
}
</script>
<style>
.main{
    margin: 0;
    padding: 0;
    left: 0;
    top:0;
}
h1{
    cursor: move;
}
.DragSidebar{
    height: 320px;
    width: 18%;
}
</style>