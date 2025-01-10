import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import Card from "./components/card/card";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./App.css";
import SignIn from "./components/signIn/signIn";

const data = [
  { id: 1, name: "Alice", image: "https://via.placeholder.com/300x400?text=Alice" },
  { id: 2, name: "Bob", image: "https://via.placeholder.com/300x400?text=Bob" },
  { id: 3, name: "Charlie", image: "https://via.placeholder.com/300x400?text=Charlie" },
  { id: 4, name: "David", image: "https://via.placeholder.com/300x400?text=David" },
  { id: 5, name: "Eva", image: "https://via.placeholder.com/300x400?text=Eva" },
  { id: 6, name: "Fay", image: "https://via.placeholder.com/300x400?text=Fay" },
  { id: 7, name: "George", image: "https://via.placeholder.com/300x400?text=George" },
  { id: 8, name: "Hannah", image: "https://via.placeholder.com/300x400?text=Hannah" },
  { id: 9, name: "Ivy", image: "https://via.placeholder.com/300x400?text=Ivy" },
  { id: 10, name: "Jack", image: "https://via.placeholder.com/300x400?text=Jack" },
];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: 0,
  delay: i * 100,
});

const from = () => ({
  x: 0,
  rot: 0,
  scale: 1.5,
  y: 1000,
});

const trans = (r, s) => `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const App = () => {
  const [gone] = useState(() => new Set());
  const [cards, setCards] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [springs, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const swipe = (index, direction) => {
    gone.add(index);
    api.start((i) => {
      if (index !== i) return;
      return {
        x: direction === "right" ? 1000 : -1000,
        rot: direction === "right" ? 20 : -20,
        scale: 1,
      };
    });

    setTimeout(() => {
      setCards((prev) => prev.filter((_, i) => i !== index));
    }, 300);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      {springs.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={cards[i]?.id}
          style={{
            transform: interpolate(
              [x, y, rot, scale],
              (x, y, r, s) => `translate3d(${x}px,${y}px,0) ${trans(r, s)}`
            ),
          }}
          className="card-container"
        >
          <Card {...cards[i]} />
        </animated.div>
      ))}

      <div className="buttons">
        <button onClick={() => swipe(cards.length - 1, "left")} className="swipe-left">
          <FaTimes size={30} />
        </button>
        <button onClick={() => swipe(cards.length - 1, "right")} className="swipe-right">
          <FaCheck size={30} />
        </button>
        
      </div>

      {/* Use ModalForm component */}
      <SignIn isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default App;
