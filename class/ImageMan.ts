/**
 *
 * Image manipulation class
 *
 */

class ImageMan{

    private canvas;

    public image = null;
    public imgWidth;
    public imgHeight;

    constructor(image){

        //decide what type the image is
        switch(typeof(image)){
            //src
            case "string":
                __create();
                break;
            //image
            case "image":
                __create();
                break;
            //blob
            case "blob":
                this.image = new Image();
                this.image.src = window.URL.createObjectURL(image);
                __create();
                break;
            //canvas
            case "canvas":
                //already a canvas so no need to create
                this.imgWidth = image.width;
                this.imgHeight = image.height;
                break;
        }
    }

    /**
     * create canvas with image to begin manipulation
     * @private
     */
    __create(){
        //get dimensions

        //create canvas

        //put image onto canvas

    }

    __render(width, height, offsetX = 0, offsetY = 0){

        //note: offset should be offset relative to imgWidth/imgHeight, not width/height
        this.canvas = document.createElement("canvas");
        var ctx = oc.getContext('2d');

        ctx.drawImage(this.image, offsetX, offsetY, width, height, 0, 0, this.imgWidth, this.imgHeight);

        return this.canvas;
    }


    /**
     * General Resize function
     */
    resize(){}

    /**
     * Resize function that behaves like css background: cover
     */
    cover(containerWidth, containerHeight, overgrowth = true) {
        //TODO: should work like CSS background-size: cover

        //FIXME: bug with horizontal images squashing

        var newWidth, newHeight, scaleRatio, offsetX, offsetY;

        //if image is too small, don't stretch to fit (if stretch is set to false)
        if (!overgrowth) {
            if (this.imgWidth <= containerWidth && this.imgHeight <= containerHeight) {
                return this.__render(this.imgWidth, this.imgHeight);
            }
        }

        //Scale by width
        scaleRatio = (containerWidth / this.imgWidth);

        newWidth  = containerWidth;
        newHeight = this.imgHeight * scaleRatio;

        //check and scale by height if necessary
        if (newHeight < containerHeight) {
            newHeight = containerHeight;
            newWidth = this.imgWidth * scaleRatio;
        }

        // convert offset back to image offset
        // e.g. 100 pixel difference from a 1280x960 canvas should be 50 pixels for the 640x480 image

        offsetX = ((newWidth - containerWidth) / 2) / scaleRatio;
        offsetY = ((newHeight - containerHeight) / 2) / scaleRatio;

        return this.__render(newWidth, newHeight, offsetX, offsetY);
//        return this.__render(newWidth, newHeight, offsetX, 50);
    }


    /**
     * Resize function that behaves like css background: contain
     */
    contain(){}

}