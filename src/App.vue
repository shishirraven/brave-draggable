<template>
<pre>
    {{config}}
</pre>
<BraveDrag 
    class=""
    :visible="config.visible"
    :position="config.position"
    :placement="config.placement"
    v-slot="{hide, onHandleMouseDown}"
    @placement-change="config.placement = $event,saveState()"
    @position-change="config.position = $event,saveState()"
    >  
    <div class=""></div>
    <div class="rounded-lg inline-block bg-white border-gray-300 border p-1 cursor-move opacity-30 hover:opacity-100"
     @mousedown="onHandleMouseDown">
        <div class="flex self-center items-center gap-1">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
            </svg> </div>
        </div>

    <div class="flex  flex-row justify-center items-end bg-white  left-0 right-0 px-2 bg-opacity-10  m-auto rounded-xl">
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/finder-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/safari-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/messages-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/music-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/mail-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/photos-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/contacts-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/calendar-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/stocks-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/facetime-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/maps-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/note-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/settings-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/reminders-logo.png"></button>
    <button class="w-12 align-bottom dock-item p-2">
    <img alt="dock icon" class="select-none w-full hover:scale-150 transition-all" src="@/assets/images/news-logo.png"></button>
</div>

</BraveDrag>
</template>
<script>
import BraveDrag from './components/BraveDraggable.vue';
    export default {
        data(){
            return{
                config : {
                    visible: true,
                    position: {
                        top: '10px',
                        right: '10px'
                    },
                    placement: 'top-right'
                }
            }
        },
       
        components:{
            BraveDrag,
        }, 
        created(){
            // loading state from local storage
            this.loadState();
        },
        methods : {
            // saving state in local storage. 
            saveState(){
                localStorage.setItem('config', JSON.stringify(this.config));
            },
            // loading state from local storage.
            loadState(){
                const config = localStorage.getItem('config');
                if(config){
                    this.config = JSON.parse(config);
                }
            }
        }
    }
</script>
