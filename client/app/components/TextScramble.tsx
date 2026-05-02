import { useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
}

export function TextScramble({ text, className }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let rafId: number;

    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const queue = text.split("").map((char, i) => ({
      from: randomChar(),
      to: char,
      start: Math.floor(Math.random() * 10),
      end: Math.floor(Math.random() * 10) + 10 + i * 2,
      char: randomChar(),
    }));

    const update = () => {
      let output = "";
      let complete = 0;
      queue.forEach((item) => {
        if (frame >= item.end) {
          complete++;
          output += item.to;
        } else if (frame >= item.start) {
          output += `<span style="color:rgba(232,0,26,0.6)">${randomChar()}</span>`;
        } else {
          output += item.from;
        }
      });
      el.innerHTML = output;
      if (complete < queue.length) {
        frame++;
        rafId = requestAnimationFrame(update);
      }
    };

    const timer = setTimeout(() => {
      frame = 0;
      rafId = requestAnimationFrame(update);
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [text]);

  return <span ref={ref} className={className} />;
}
