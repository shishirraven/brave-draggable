export default
    {
        // Outline of our Drag Functionality. 
        // ----------------------------------
        // INPUT. 
        // =====
        // #1 placement - example - top-center, bottom-left
        // #2 Root Element Container. 
        // #3 Automatic Docking - TRUE/FALSE. 
        // #4 Snapping Distance - To Centers. 
        // #5 Screen Bounds {top,left,bottom, right} // The area in which the window should exist. 

        //  OUTPUT. 
        // a. Update the Postion of the Element. 
        // b. Change the Placement in case of docking 
        // c. Snapping if the element is at the Snapping Distance Range from any Center. 
        // =================================================================================

        // OULTINE OF THE FLOW OF CODE. 
        // 1. BINDING MOUSE DOWN EVENT TO HANDLE ELEMENT. 
        //    - Recording the position of the cursor and saving it as original position. 
        //    a. Register MOUSE MOVE EVENT LISTENER
        //    b. Register Mouse UP Event listener 
        //       - Removing Listners. Both Mouse Down and Mouse Up. 
        //    c. Updating 
        //    - Placement
        //    - Position. 
        //  2. Mouse Move Listener. 
        //     - Getting the Bounding Box. 
        //     - Based on the placement. example (top-left, bottom-right)
        // Updating the postion. 
        //      for TOP we will + Add difference. 
        //      for Bottom we will - Subtract difference. 
        //      for Left we will + Add difference. 
        //      for Right we will - Subtract difference. 
        //      --------------------------------------------
        //      APPLYING SNAPPING FROM CENTER. 
        // ==============================================
        //      // FIND THE CENTER X AND CENTER Y. 
        //      // IF CLIENT X IS between (centerX - SnappingDistance) and (centerX+SnappingDistance)
        // Make LEFT = CenterX and Make Right=CenterX. 
        // Similar we have to do for the Right. 

        // APPLYING Automatic Docking. 
        // if (AutomaticDocking == true)
        // a FINDING THE DIALOG QUARDRAND - TOP-LEFT, BOTTOM-RIGHT .TEC. 
        // b if QUADRANT IS DIFFERENT FROM CURRENT PLACEMENT. 
        // c Updating the placement and position from the current bounding box and width height of the root element. 

        // CALCULATING IF THE MAX LEFT, RIGHT, BOTTOM, TOP POSSIBLE BASED ON THE Placement. 
        // CASE TOP-LEFT 
        // Top should be less than (inner height - RootElement.height - bottom treshold )
        // Top should be Greter than (top threshold)
        // left should be greater than (left threshold)
        // left whold be less than (inner width - root element width - right threshold)

        // CASE TOP-RIGHT
        // Top should be less than (inner height - RootElement.height - bottom treshold )
        // Top should be Greter than (top threshold)
        // RIGHT SHOULD BE GREATER THAN RIGHT THRESHOLD. 
        // RIGHT SHOULD BE LESS THAN (inner width + left threshold + root_element)

        // --------------------------------------
        emits: ['placement-change', 'position-change'],
        // prevent inheritance of the parent's props
        inheritAttrs: false,

        computed: {
            // computing the position based on snapping and docking.
            // --------------------------------------
            computedPosition() {
                this.horizontalCenter = false;
                this.verticalCenter = false;
                if (this.dragged == true) {
                    var position = this.tempPosition;
                
                }
                else {
                    var position = JSON.parse(JSON.stringify(this.cPosition));
                }


                // FINDING THE CENTER X AND CENTER Y. 
                let centerX = window.innerWidth / 2;
                let centerY = window.innerHeight / 2;



                // finding half width and half height.
                if (this.$refs.rootElement != undefined) {

                 

                    var halfWidth = this.$refs.rootElement.offsetWidth / 2;
                    var halfHeight = this.$refs.rootElement.offsetHeight / 2;
                    // current item position 
                    var currentLeft = parseInt(position.left) + halfWidth;
                    var currentTop = parseInt(position.top) + halfHeight;
                    if (currentLeft > centerX - this.snappingDistance && currentLeft < centerX + this.snappingDistance) {
                        this.horizontalCenter = true;
                    }
                    if (currentTop > centerY - this.snappingDistance && currentTop < centerY + this.snappingDistance) {
                        this.verticalCenter = true;
                    }
                }

                // let automaticSnapping = this.automaticSnapping();
                if (this.horizontalCenter == true) {
                    // left: "50%",
                    // transform: "translateX(-50%)",
                    console.log("horizontal center");
                    position.left = centerX - halfWidth +"px";

                }
                
                if (this.verticalCenter  == true) {
                    // top: "50%",
                    // transform: "translateY(-50%)",
                    console.log("vertical center");
                    position.top = centerY - halfHeight+"px";  
                }
                console.log("computed position--", this.horizontalCenter, this.verticalCenter);

                if (this.dragged == true) {
                // checking for bounds. 
                position= this.checkBounds(position)
                }

                return position;
            }
        },
        data: {
            showSnapping: false,
            dragged: false,
            tempPosition: {
                top: 'auto',
                left: 'auto',
                bottom: 'auto',
                right: 'auto',
                transform: 'unset',
            },
            verticalCenter: false,
            horizontalCenter: false,
            offset: { x: 0, y: 0 },
            lastPosition: {
                x: null,
                y: null,
            }
        },

        methods: {

            checkBounds(position) {
                // CHEKCkING FOR LEFT. 
                console.log("checking bounds", position);

                if (parseInt(position.left) < this.bounds.left) {
                    position.left = this.bounds.left + "px";
                }
                // CHECKING FOR RIGHT.
                if (window.innerWidth-(parseInt(position.left)+this.$refs.rootElement.offsetWidth) < this.bounds.right) {
                    position.left = window.innerWidth - this.bounds.right - this.$refs.rootElement.offsetWidth + "px";
                }
                // CHECKING FOR TOP.
                if(parseInt(position.top) < this.bounds.top){
                    position.top = this.bounds.top + "px";
                }
                // CHECKING FOR BOTTOM.
                if(window.innerHeight-(parseInt(position.top)+this.$refs.rootElement.offsetHeight) < this.bounds.bottom){
                    position.top = window.innerHeight - this.bounds.bottom - this.$refs.rootElement.offsetHeight + "px";
                }
                return position;
            },
            getQuadrant() {
                let boundingBox = this.$refs.rootElement.getBoundingClientRect();
                let centerX = boundingBox.left + (this.$refs.rootElement.offsetWidth / 2);
                let centerY = boundingBox.top + (this.$refs.rootElement.offsetHeight / 2);
                let screenBounds = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    top :0, 
                    left:0,
                };

                // Screen Centers
                let screenCenterX = window.innerWidth / 2;
                let screenCenterY = window.innerHeight / 2;

                if(centerY>screenCenterY-this.snappingDistance && centerY<screenCenterY+this.snappingDistance && centerX>screenCenterX-this.snappingDistance && centerX<screenCenterX+this.snappingDistance)
                {
                    return "center";
                }
                
                // SNAPPING TO CENTER IF CLOSE ENOUGH.
                console.log(centerX+">"+screenCenterX+"-"+this.snappingDistance+" &&  "+centerX+"<"+screenCenterX+"+"+this.snappingDistance);
                if(centerX>screenCenterX-this.snappingDistance &&  centerX<screenCenterX+this.snappingDistance){
                    if (centerY < screenBounds.top + (screenBounds.height / 2)) {
                        return "top-center";
                    } else {
                        return "bottom-center";
                    }
                }

                if(centerY>screenCenterY-this.snappingDistance && centerY<screenCenterY+this.snappingDistance){
                    if (centerX < screenBounds.left + (screenBounds.width / 2)) {
                        return "left-center";
                    } else {
                        return "right-center";
                    }
                }
               // alert("not center");
                if (centerX < screenBounds.left + (screenBounds.width / 2)) {
                    if (centerY < screenBounds.top + (screenBounds.height / 2)) {
                        return "top-left";
                    } else {
                        return "bottom-left";
                    }
                } else {
                    if (centerY < screenBounds.top + (screenBounds.height / 2)) {
                        return "top-right";
                    } else {
                        return "bottom-right";
                    }
                }
            },


            // 1. BINDING MOUSE DOWN EVENT TO HANDLE ELEMENT. 
            //    - Recording the position of the cursor and saving it as original position. 
            //    a. Register MOUSE MOVE EVENT LISTENER
            //    b. Register Mouse UP Event listener 
            //       - Removing Listners. Both Mouse Down and Mouse Up. 
            //    c. Updating 
            //    - Placement
            //    - position. 
            onHandleMouseDown(e) {

                e.preventDefault();
                var boundingBox = this.$refs.rootElement.getBoundingClientRect();
                this.tempPosition.top = boundingBox.top + "px";
                this.tempPosition.left = boundingBox.left+ "px";
                // Snapped and Drag is turned on. 
                this.showSnapping = true,
                this.dragged = true;
                // offset between the mouse and the root element.
                this.offset = {
                    left: e.clientX - this.$refs.rootElement.getBoundingClientRect().left,
                    top: e.clientY - this.$refs.rootElement.getBoundingClientRect().top,
                    bottom: e.clientY - this.$refs.rootElement.getBoundingClientRect().bottom,
                    right: e.clientX - this.$refs.rootElement.getBoundingClientRect().right,
                }
                if (this.cPlacement == "top-right") {
                    this.offset.x = (window.innerWidth - this.$refs.rootElement.getBoundingClientRect().right) - e.clientX ;
                    this.offset.y = e.clientY - this.$refs.rootElement.getBoundingClientRect().top;
                }
                if (this.cPlacement == "bottom-left") {
                    this.offset.x = e.clientX - this.$refs.rootElement.getBoundingClientRect().left;
                    this.offset.y = (window.innerHeight - this.$refs.rootElement.getBoundingClientRect().bottom) - e.clientY;
                }
                if (this.cPlacement == "bottom-right") {
                    this.offset.x = (window.innerWidth - this.$refs.rootElement.getBoundingClientRect().right) - e.clientX;
                    this.offset.y = (window.innerHeight - this.$refs.rootElement.getBoundingClientRect().bottom) - e.clientY;
                }




                // UPDATING THE LAST POSTION
                this.lastPosition.x = e.clientX;
                this.lastPosition.y = e.clientY;

                // ADDING MOUSE EVENTS. 
                window.addEventListener("mouseup", this.mouseUp)
                window.addEventListener("mousemove", this.mouseMove);
            },
            mouseUp(e) {

                this.showSnapping = false,
                    this.dragged = false;
                window.removeEventListener("mousemove", this.mouseMove);
                window.removeEventListener("mouseup", this.mouseUp);
                // Emitting the placement and position change to the PARENT COMPONENT. 

                if(this.automaticDocking == true) 
                {
                    this.cPlacement =  this.getQuadrant()
                }
                this.cPosition = this.dockingBasedonPlacement(this.cPlacement);

                // TODO - cPlacement in data needs to be added. 
                // emitting the placement and position change to the parent component.
                this.$emit("placement-change", this.cPlacement);
                this.$emit("position-change", this.cPosition);
            },

            //  2. Mouse Move Listener. 
            //     - Getting the Bounding Box. 
            //     - Based on the placement. example (top-left, bottom-right)
            // Updating the postion. 
            //      for TOP we will + Add difference. 
            //      for Bottom we will - Subtract difference. 
            //      for Left we will + Add difference. 
            //      for Right we will - Subtract difference. 

            mouseMove(e) {
                e.preventDefault();

                this.tempPosition.left = e.clientX - this.offset.left + "px";
                this.tempPosition.top = e.clientY + this.offset.top + "px";

            },

            dockingBasedonPlacement(placement) 
                {
                    var boundingBox = this.$refs.rootElement.getBoundingClientRect();
                    let position = {
                        top: 'auto',
                        left: 'auto',
                        bottom: 'auto',
                        right: 'auto', 
                    }
                    if(placement == "center")
                    {
                        position.top = "50%";
                        position.left = "50%";
                        position.transform = "translate(-50%, -50%)";
                    }
                    if (placement == "top-left") {
                        position.top = boundingBox.top + "px";
                        position.left = boundingBox.left + "px";
                    }
                    else if (this.cPlacement == 'top-center') 
                    {
                        position.top = boundingBox.top + "px";
                        position.left = "50%";
                        position.transform = " translateX(-50%)"
                    }
                    else if (this.cPlacement == 'top-right') {
                        position.top = boundingBox.top + "px";
                        position.right = window.innerWidth - boundingBox.right +"px";
                    }
                    else if (this.cPlacement == 'right-center') {
                        
                        position.right = window.innerWidth - boundingBox.right +"px";
                        position.top = "50%";
                        position.transform = " translateY(-50%)"
                    }
                    else if (this.cPlacement == 'bottom-right') {
                        position.bottom = window.innerHeight - boundingBox.bottom +"px";
                        position.right = window.innerWidth - boundingBox.right +"px";
                    }
                    else if (this.cPlacement == 'bottom-center') {
                        position.bottom = window.innerHeight - boundingBox.bottom +"px";
                        position.left = "50%";
                        position.transform = " translateX(-50%)"
                    }
                    else if (this.cPlacement == 'bottom-left') {
                        position.bottom = window.innerHeight - boundingBox.bottom +"px";
                        position.left = boundingBox.left + "px";
                    }
                    else if (this.cPlacement == 'left-center') {
                        position.left = boundingBox.left + "px";
                        position.top = "50%";
                        position.transform = " translateY(-50%)"
                    }   
                return position;
            },

            mouseMove2(e) {
                e.preventDefault();
                // if placement is top-left
                // position= current cursor position+ this.offset
                var boundingBox = this.$refs.rootElement.getBoundingClientRect();
                if (this.cPlacement == "top-left") {
                    this.cPosition.left = e.clientX - this.offset.left + "px";
                    this.cPosition.top = e.clientY - this.offset.top + "px";
                }
                else if (this.cPlacement == 'top-center') {
                    this.cPosition.top = e.clientY - this.offset.top + "px";
                    this.cPosition.left = "50%";
                    this.cPosition.transform = "translateX(-50%)";
                }
                else if (this.cPlacement == 'top-right') {
                    this.cPosition.top = e.clientY - this.offset.y + "px";
                    this.cPosition.right = ((e.clientX - window.innerWidth) * -1) + this.offset.right + "px";
                }
                else if (this.cPlacement == 'right-center') {
                    this.cPosition.right = ((e.clientX - window.innerWidth) * -1) + this.offset.right + "px";
                }
                else if (this.cPlacement == 'bottom-right') {
                    this.cPosition.bottom = ((e.clientY - window.innerHeight) * -1) + this.offset.bottom + "px";
                    this.cPosition.right = ((e.clientX - window.innerWidth) * -1) + this.offset.right + "px";
                }
                else if (this.cPlacement == 'bottom-center') {
                    this.cPosition.bottom = ((e.clientY - window.innerHeight) * -1) + this.offset.bottom + "px";
                }
                else if (this.cPlacement == 'bottom-left') {
                    this.cPosition.left = e.clientX - this.offset.left + "px";
                    this.cPosition.bottom = ((e.clientY - window.innerHeight) * -1) + this.offset.bottom + "px";
                }
                else if (this.cPlacement == 'left-center') {
                    this.cPosition.left = e.clientX - this.offset.left + "px";
                }
            },

        }



    }