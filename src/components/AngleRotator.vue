<template>
    <div>
        <div class=" centerpointshape bg-green-600 fixed w-5 h-5"  :style="{left:centervalue.x+'px' , top:centervalue.y+'px'}">{{centervalue}}</div>
        
        {{'rotate('+angle+')'}}<!-- /* ======= Check center value in rectangle ======= */ -->
        <div class="rect" :style="{transform:'rotate('+angle+'deg)'} " @click="calculateCenter">
            <div class="testdiv" :style="centervalue"></div>
            <div class="rotater"  @mousedown="mousedown">
             
            </div>
        </div>
    </div>
</template>
<script>
import { provide } from 'vue';

    export default{
        data(){
            return{
                angle:0,
                cssStyle:{
                   
                },
                centervalue:{
                    x:"",
                    y:"",
                },
                Handle:{
                    left:"",
                    top:"",

                },
                value:"",
                elementval: "",
            }

        },
        methods:{

            // ================ this function is basically used for find a center value in div ========
            calculateCenter(e){
            this.elementval = e.target;
            
            // ========= Check total value height and width and other value in div ====
            let rectval =  this.elementval.getBoundingClientRect();

            let widthval =  rectval.width;
            let heightval =  rectval.height;
            let leftval =  rectval.left;

            console.log(rectval);
            //  ======= Total center of screen  ============
            // let anglevalue = widthval +  heightval / 2 + leftval + rectval.top ;

            // ======= Center of Rectangle ===============
            let recwidth = widthval / 2;
            let recheight = heightval / 2;
          
            // ======== Add left and top value in rectangle value  ======
            let centerL = 540 + recwidth;
            let centerT =  121 + recheight;

            // ========= assgin value in data function  centervalue.centerX and centervalue.centerT ====
           let centerXvalue =  this.centervalue.x = centerL;
           let centerYvalue =  this.centervalue.y = centerT;

            console.log(centerXvalue);
            },
            // ================= This function is provide mouse click value =============
            mousedown(e){
                // this.calclateCenter(e)
                // console.log(e)
                // ========= Add old value for  even add in handle in data function ====
                this.Handle.left = e.clientX;
                this.Handle.top = e.clientY;
            

                window.addEventListener("mousemove",this.MouseMove);
                window.addEventListener("mouseup",this.mouseUp);
            },

            // ============== This funtion is provide mouse move new postion ==============
            MouseMove(e){
             var pos = {
                x: e.clientX,
                y: e.clientY,
             }
             
             var currAngle =  this.calAngle(this.centervalue,pos);
             console.log(currAngle);
             this.angle =currAngle + 90;
            
            //  console.log(pos.x);
            },


            // ======= This function is used for mouse up after click mouse up responce ======
            mouseUp(){
                window.removeEventListener("mousemove",this.MouseMove);
                window.removeEventListener("mouseup",this.mouseUp)
            },


            // ====== This funtion is a defina a angle of div ==============
            calAngle(center, eventPoint) {
                    var cx = center.x; 
                    var cy = center.y; 
                    var ex = eventPoint.x;
                    var ey = eventPoint.y;

                    var dy = ey - cy;
                    var dx = ex - cx;
                    var theta = Math.atan2(dy, dx); // range (-PI, PI]
                    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
                    //if (theta < 0) theta = 360 + theta; // range [0, 360)
                    return theta;
                }


          

        }
    }
</script>
<style>
    .rect{
        /* width: 200px; */
        background-color: red;
        /* height: 150px; */
        margin: auto;
        margin-top: 121px;
        width:200px;
        height: 150px;
    }
    .rotater{
        width: 15px;
        height: 15px;
        background-color: black;
        border-radius: 20px;
        cursor: move;
        margin-left: 100px;
    }


    /* ======= Check center value in rectangle ======= */
    .testdiv{
        background-color: green;
        height: 10px;
        width: 10px;
        border-radius: 20px;
        margin-left: 100px;
        margin-top: 75px;
    }
    .centerpointshape{
        z-index: 1000;
        border-radius: 20px;
    }
</style>