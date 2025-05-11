"use client";
import style from "./page.module.scss";
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store";
import { evaluate } from "mathjs";
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

  // useEffect(() => {
  //   // This effect runs when the result changes
  //   console.log(result);
  // }, [result]);
  const handleOnClick = useCallback(
    (value: string) => {
      switch (value) {
        case "B":
          dispatch(backSpace());
          break;
        case "=":
          try {
            dispatch(addCalcultion(evaluate(result))); // safer than eval
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
    },
    [dispatch, result]
  );
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;

      if (key.toLowerCase() === "c") handleOnClick("c");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [numbers, result, handleOnClick]);

  //   To get the updated result after each dispatch, you need to understand that:

  // ✅ State updates in Redux are asynchronous, so the result from useSelector won't update immediately after a dispatch.
  // Instead, the component will re-render with the new result once the state updates.
  return (
    <div>
      <div className={style.parent}>
        <div className={style.calculator}>
          <div className={style.display}>
            <form>
              <input
                type="text"
                className={style.input}
                value={result}
                readOnly
              />
            </form>
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
