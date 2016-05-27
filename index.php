<html>
<head>
    <meta charset="UTF-8">
    <title>Uploader</title>

    <style>
        *{box-sizing: border-box}

        html, body{
            width:100%;
            height:100%;
            margin:0;
            padding: 0;
        }

        #images{
            width:70vw;
        }
        #images ul{
            list-style: none;
            margin:0;
            padding:0;
        }
        #images ul li{
            padding:15px;
            max-width: 300px;
        }
        #images ul li img{
            max-width: 100%;
            height:auto;
            display: block;
        }



        .loader {
            font-size: 10px;
            margin: 50px auto;
            text-indent: -9999em;
            width: 11em;
            height: 11em;
            border-radius: 50%;
            background: #0DC5C1;
            background: -moz-linear-gradient(left, #0DC5C1 10%, rgba(255, 255, 255, 0) 42%);
            background: -webkit-linear-gradient(left, #0DC5C1 10%, rgba(255, 255, 255, 0) 42%);
            background: -o-linear-gradient(left, #0DC5C1 10%, rgba(255, 255, 255, 0) 42%);
            background: -ms-linear-gradient(left, #0DC5C1 10%, rgba(255, 255, 255, 0) 42%);
            background: linear-gradient(to right, #0DC5C1 10%, rgba(255, 255, 255, 0) 42%);
            position: relative;
            -webkit-animation: load3 1.4s infinite linear;
            animation: load3 1.4s infinite linear;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
        }
        .loader:before {
            width: 50%;
            height: 50%;
            background: #0DC5C1;
            border-radius: 100% 0 0 0;
            position: absolute;
            top: 0;
            left: 0;
            content: '';
        }
        .loader:after {
            background: #fff;
            width: 75%;
            height: 75%;
            border-radius: 50%;
            content: '';
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
        @-webkit-keyframes load3 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        @keyframes load3 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <form>
        <input type="file" name="vehicleImages" value="Choose Image">

        <input type="submit" value="Upload">
    </form>

    <canvas id="canvas" width="400" height="400"></canvas>

    <div id="images">
        <ul>
            <li></li>
            <li id="two"></li>
            <li></li>
        </ul>
    </div>
</body>

<script src="resizer.js"></script>
<script src="uploader.js"></script>
<script>


    document.forms[0].addEventListener("submit", function(e){
        e.preventDefault();
        var files = e.target.children.vehicleImages.files;

        var imageDiv = document.getElementById('images');
        var imageList = imageDiv.children[0];

        imageList.innerHTML += '<li><div class="loader">Loading...</div></li>';


//        console.log(window.URL.createObjectURL(files[0]));


/*
        var canvas = document.getElementById('canvas');

        var ctx = canvas.getContext("2d");
        var image = new Image();

        image.onload = function(){
//            image.src = window.URL.createObjectURL(files[0]);

            ctx.drawImage(image, 0, 0, 200, 200);
        };
        image.src = "http://cdn.boldride.com/bmw/2015/bmw-m3.2000x1333.Dec-11-2013_09.39.00.779498.jpg";



*/



        var image = window.URL.createObjectURL(files[0]);

        var resize = new Resizer(image, 640, 480);
//        resize.dimensions(400,400);
        resize.render();
        resize.insert(imageList.children[imageList.children.length-1]);
        
        var noStepDown = new Resizer(image, 640, 480);
        noStepDown.render(false, false);
        noStepDown.insert('#two');

        return false;
/*

        var resizedImages = [];
        var reader = new FileReader();
        var imageDiv = document.getElementById('images');
        var imageList = imageDiv.children[0];

        imageList.innerHTML += '<li><div class="loader">Loading...</div></li>';


        reader.onload = function(event){
            imageList.children[imageList.children.length-1].innerHTML = '<li><img src="'+event.target.result+'"></li>';
        };

        reader.readAsDataURL(files[0]);
*/


        return false;
    });

</script>
</html>