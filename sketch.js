var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost, ghostImage;
var tower, towerImage;

var climber, climberImage;
var door, doorImage;

var door, doorImage;
var spookyWav;

var detector;

var score = 0;

function preload() {
    ghostImage = loadImage("ghost-standing.png");
    towerImage = loadImage("tower.png");

    doorImage = loadImage("door.png");
    climberImage = loadImage("climber.png");

    spookyWav = loadSound("spooky.wav");

}

function setup() {
    createCanvas(600, 600);

    tower = createSprite(300, 200);
    tower.addImage(towerImage);

    doorGroup = createGroup();
    climberGroup = createGroup();
    detectorGroup = createGroup();
    Ghost();
}

function draw() {
    background(255);

    console.log("this is  " + gameState);

    if (gameState === PLAY) {
        tower.visible = true;
        detectorGroup.visible = true;
        climberGroup.visible = true;
        doorGroup.visible = true;
        ghost.visible = true;

        spawnObstacles();

        tower.velocityY = 2;

        if (tower.y > 600) {
            tower.y = tower.y / 2;
        }

        ghost.collide(climberGroup);
        spookyWav.play();

        if (keyDown("space")) {
            ghost.velocityY = -12;

        }

        if (keyDown("right_ARROW")) {
            ghost.x = ghost.x + 4;

        }

        if (keyDown("left_ARROW")) {
            ghost.x = ghost.x - 4;

        }

        if (ghost.y < 600) {
            ghost.velocityY = ghost.velocityY + 0.8;

        }

        if (ghost.y > 600 || detectorGroup.isTouching(ghost)) {
            gameState = END;
        }

    } else if (gameState === END) {
        background(0);

        tower.visible = false;
        ghost.visible = false;
        climberGroup.destroyEach();
        doorGroup.destroyEach();
        detectorGroup.destroyEach();

        spookyWav.stop();

        ghost.x = 300;
        ghost.y = 300;
        ghost.velocityY = 0;

        fill("cyan");
        strokeWeight(10);
        stroke("yellow");
        textSize(70);
        text('GAME OVER!!', 50, 200);

        fill(100, 255, 100);
        strokeWeight(5);
        stroke("white");
        textSize(30);
        text("click on 'enter' key to play again", 100, 350);

    }


    if (keyCode === ENTER) {
        reset();
    }

    drawSprites();
}

function spawnObstacles() {
    if (frameCount % 150 === 0) {
        door = createSprite(random(100, 500), -50, 10, 10);
        door.addImage(doorImage);

        door.velocityY = 3;
        door.lifetime = 300;

        detector = createSprite(door.x, door.y + 60, 50, 10);

        detector.velocityY = 3;
        detector.lifetime = 300;


        detector.setCollider("rectangle", 0, 0, 100, 3);
        detector.debug = true;

        climber = createSprite(door.x, door.y + 50, 10, 10);
        climber.addImage(climberImage);

        climber.velocityY = 3;
        climber.lifetime = 300;

        climberGroup.add(climber);
        doorGroup.add(door);
        detectorGroup.add(detector);

    }

}

function Ghost() {
    ghost = createSprite(300, 280, 5, 5);
    ghost.addImage(ghostImage);
    ghost.scale = 0.3;

}

function reset() {
    gameState = PLAY;

}