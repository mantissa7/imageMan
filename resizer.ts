//resize images using canvas
//TODO: create image queue to delay uploading for large images or poor performing PCs
//TODO: force resize into requestanimationframe


class Resizer{

    private canvas;
    private context;
    private image;
    private src;
    private width;
    private height;
    

    constructor(src:string, width:number, height:number){

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("2d");
        this.image = new Image();
        this.src = src;
        this.width = width;
        this.height = height;

        this.canvas.width = width;
        this.canvas.height = height;
    }

    private __stepDown(sourceWidth, sourceHeight, targetWidth, targetHeight){
        //reduce size in increments to improve quality (this is more intensive and should maybe be disabled on certain devices/for certain clients)
        // console.log(sourceWidth, sourceHeight);
        // var image = this.image;

        //create off-screen canvas
        var oc = document.createElement("canvas");
        var ctx = oc.getContext('2d');
        var ratio = sourceHeight / sourceWidth;

        oc.width = sourceWidth * 0.5;
        oc.height = sourceHeight * 0.5;

        ctx.drawImage(this.image, 0, 0, oc.width, oc.height);

        /*for(let i = oc.width; i > targetWidth; i *= 0.5){

            console.log("resize");
            ctx.drawImage(oc, 0, 0, i, i * ratio);
            console.log(i, i*ratio);
        }*/
        //
        var newWidth = oc.width * 0.5;
        var newHeight = oc.height * 0.5;

        ctx.drawImage(oc, 0, 0, newWidth, newHeight);



        // newWidth *= 0.5;
        // newHeight *= 0.5;
        // ctx.drawImage(oc, 0, 0, newWidth, newHeight);


        // oc.width *= 0.5;
        // oc.height *= 0.5;
        //
        // ctx.drawImage(oc, 0, 0, oc.width, oc.height);


        // ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width,   canvas.height);
        this.context.drawImage(oc, 0, 0, newWidth * 0.5, newHeight * 0.5, 0, 0, this.canvas.width, this.canvas.height);

        // return [];


        // ctx.drawImage(oc, 0, 0, sourceWidth, sourceHeight);


        // return oc;

    }

    private __resize(sourceWidth:number, sourceHeight:number, stepdown:boolean){
        //targetWidth is this.width
        //TODO: this doesn't currently perform any image fitting. Any image ratio that isn't the same as the passed ratio will be stretched. i.e. 640x480 = 4:3, so if the uploaded image is not 4:3 then it will stretch the image.

        // console.log("__resize");

        var image;

        if(stepdown){
            //call stepDown until within a close enough range to begin resizing
            image = this.__stepDown(sourceWidth, sourceHeight, this.width, this.height);
            // console.log("__stepDown: "+image);
        } else {
            image = this.image;
            this.context.drawImage(image, 0, 0, this.width, this.height);
        }

        // console.log("stepdown: "+stepdown);
        // console.log(image);

        // this.context.drawImage(image, 0, 0, this.width, this.height);

    }
    

    render(smoothing:boolean = true, stepdown:boolean = true){
        //render canvas off-screen for performance.

        // if(typeof(smoothing) === "undefined") smoothing = true;
        // if(typeof(stepdown) === "undefined") stepdown = true;

        var that = this;

        this.image.onload = function(){
            console.log("image element loaded");
            // console.log(this.naturalWidth, this.naturalHeight);
            that.context.imageSmoothingEnabled = smoothing;
            that.__resize(this.naturalWidth, this.naturalHeight, stepdown);
            // console.log(this);
            // that.context.drawImage(that.image, 0, 0, that.width, that.height);
        };

        //set image src and then action the onload event above
        this.image.src = this.src;

    }

    insert(element){
        if(typeof(element) !== "undefined"){
            if(Object.prototype.toString.call( element ) === '[object HTMLLIElement]'){
                element.innerHTML = "";
                element.appendChild(this.canvas);
            } else {
                document.querySelector(element).appendChild(this.canvas);
            }
        } else {
            return this.canvas;
        }

    }

}

// new Resizer();