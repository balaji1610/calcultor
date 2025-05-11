"use client";
import style from "./page.module.scss";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store";
import {
  addCalcultion,
  selectedButton,
  backSpace,
  clear,
} from "@/app/slice/calcultorSlice";

export default function Home() {
  const numbers = useSelector(
    (state: RootState) => state.calcultor.displaynumbers
  );
  const result = useSelector((state: RootState) => state.calcultor.result);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const input = ref.current;
    if (input) {
      input.focus();
    }
  }, []);

  useEffect(() => {
    // This effect runs when the result changes
    console.log(result);
  }, [result]);

  const handleOnClick = (value: string) => {
    switch (value) {
      case "B":
        dispatch(backSpace());
        break;
      case "=":
        try {
          dispatch(addCalcultion(eval(result)));
        } catch (e) {
          console.error("Invalid expression", e);
        }
        break;
      case "c":
        dispatch(clear());
        break;
      default:
        dispatch(selectedButton(value));
    }
  };
  return (
    <div>
      <div className={style.parent}>
        <div className={style.calculator}>
          <div className={style.display}>
            <input type="text" className={style.input} defaultValue={result} />
          </div>
          <div className={style.buttons}>
            {numbers.map((item, index) => (
              <button
                key={index}
                className={style.button}
                onClick={() => handleOnClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
