peter_pan_song="";
harry_potter_song="";

status_peter_pan="";
status_harry_potter="";

leftWristx= 0;
leftWristy= 0;

rightWristx= 0;
rightWristy= 0;

scoreLeftWrist=0;
scoreRightWrist=0;



function preload(){
    peter_pan_song= loadSound("peter.mp3");
    harry_potter_song= loadSound("harry_potter.mp3");
}

function setup(){
    canvas=createCanvas(600,530);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}




function modelLoaded(){
    console.log("Model is Loaded");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);

    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);

    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log(scoreLeftWrist);
   
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("rightWristx = "+rightWristx+ "rightWristy = "+rightWristy);

    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("leftWristx = "+leftWristx+ "leftWristy = "+leftWristy);

   
   
}
}

function draw(){
    image(video, 0,0,600,530);

    status_peter_pan=peter_pan_song.isPlaying();
    status_harry_potter=harry_potter_song.isPlaying();

    fill("#ffffff");
    stroke("#000000");

    

    if(scoreLeftWrist>0.2){
        circle(leftWristx,leftWristy,20);
        harry_potter_song.stop()
        if(status_peter_pan==false){
            peter_pan_song.play();
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }

    if(scoreRightWrist>0.2){
        circle(rightWristx,rightWristy,20);
        peter_pan_song.stop();
        if(status_harry_potter==false){
            harry_potter_song.play();
            document.getElementById("song_id").innerHTML="Song Name : Harry Potter Song";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}