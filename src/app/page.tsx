"use client";
import style from "./page.module.scss";
import React, { useEffect, useRef } from "react";

const number = [
  "c",
  "<-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  " 4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
];

export default function Home() {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const input = ref.current;
    if (input) {
      input.focus();
    }
  }, []);
  return (
    <div>
      <div className={style.parent}>
        <div className={style.calculator}>
          <div className={style.display}>
            <input type="text" className={style.input} />
          </div>
          <div className={style.buttons}>
            {number.map((item, index) => (
              <button key={index} className={style.button}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
