import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './GameScene.css';

const GameScene = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    let ball;
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 400,
      parent: 'phaser-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    function preload() {
      this.load.setBaseURL('https://labs.phaser.io');
      this.load.image('ball', 'assets/sprites/shinyball.png');
      this.load.image('background', 'assets/skies/space3.png'); 
    }

    function create() {
      const background = this.add.image(0, 0, 'background');
      background.setOrigin(0, 0);
      background.setDisplaySize(400, 400); 

      ball = this.physics.add.image(200, 200, 'ball');
      ball.setCollideWorldBounds(true);
      ball.setBounce(1);

      const randomVelocityX = Phaser.Math.Between(-700, 700);
      const randomVelocityY = Phaser.Math.Between(-700, 700);
      ball.setVelocity(randomVelocityX, randomVelocityY);

      ballRef.current = ball;
    }

    function update() {}

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  const buttonCoordinates = {
    button1: { x: 117, y: 3.1999969482421875 },
    button2: { x: 276, y: 4.1999969482421875 },
    button3: { x: 382, y: 118.19999694824219 },
    button4: { x: 386, y: 276.1999969482422 },
    button5: { x: 277, y: 387.1999969482422 },
    button6: { x: 114, y: 384.1999969482422 },
    button7: { x: 8, y: 276.1999969482422 },
    button8: { x: 12, y: 118.19999694824219 },
  };

  const handleButtonClick = (buttonId) => {
    const { x: targetX, y: targetY } = buttonCoordinates[buttonId];

    const currentX = ballRef.current.x;
    const currentY = ballRef.current.y;

    const distanceX = targetX - currentX;
    const distanceY = targetY - currentY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const speed = 700;
    const velocityX = (distanceX / distance) * speed;
    const velocityY = (distanceY / distance) * speed;

    ballRef.current.setVelocity(velocityX, velocityY);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Bouncing Game</h1>
      <div className="game-area">
        <div id="phaser-container" className="phaser-container" />
        <button onClick={() => handleButtonClick('button1')} style={{ position: 'absolute', top: '-20px', left: '30%', transform: 'translate(-50%, -50%)' }}>Button 1</button>
        <button onClick={() => handleButtonClick('button2')} style={{ position: 'absolute', top: '-5%', right: '60px', transform: 'translate(-50%, -50%)' }}>Button 2</button>
        <button onClick={() => handleButtonClick('button3')} style={{ position: 'absolute', top: '30%', right: '-100px', transform: 'translate(-50%, -50%)' }}>Button 3</button>
        <button onClick={() => handleButtonClick('button4')} style={{ position: 'absolute', top: '70%', right: '-100px', transform: 'translate(-50%, -50%)' }}>Button 4</button>
        <button onClick={() => handleButtonClick('button5')} style={{ position: 'absolute', top: '105%', left: '70%', transform: 'translate(-50%, -50%)' }}>Button 5</button>
        <button onClick={() => handleButtonClick('button6')} style={{ position: 'absolute', bottom: '-20px', left: '30%', transform: 'translate(-50%, 50%)' }}>Button 6</button>
        <button onClick={() => handleButtonClick('button7')} style={{ position: 'absolute', top: '70%', left: '-100px', transform: 'translate(50%, -50%)' }}>Button 7</button>
        <button onClick={() => handleButtonClick('button8')} style={{ position: 'absolute', top: '30%', left: '-40px', transform: 'translate(-50%, -50%)' }}>Button 8</button>
      </div>
    </div>
  );
};

export default GameScene;
