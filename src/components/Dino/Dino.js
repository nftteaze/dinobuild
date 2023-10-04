import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

function Dino() {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const groundRef = useRef(); // Ref for the ground element

  const [score, setScore] = useState(0);

  const jump = () => {
    if (!!dinoRef.current && !dinoRef.current.classList.contains("jump")) {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top")
      );

      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  useEffect(() => {
    const handleJump = () => {
      jump();
    };

    document.addEventListener("keydown", handleJump);
    document.addEventListener("touchstart", handleJump);

    return () => {
      document.removeEventListener("keydown", handleJump);
      document.removeEventListener("touchstart", handleJump);
    };
  }, []);

  return (
    <div className="game">
      <div id="ground" ref={groundRef}></div>
      Score: {score}
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
    </div>
  );
}

export default Dino;
