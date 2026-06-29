import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string | string[];
  speed?: number; // ms per character
  delay?: number; // initial delay
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
  cursorColor?: 'cyan' | 'red' | 'white';
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 30,
  delay = 0,
  showCursor = true,
  onComplete,
  className = '',
  cursorColor = 'cyan',
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);

  const lines = Array.isArray(text) ? text : [text];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (lineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[lineIndex];

    if (currentIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLine[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Completed a line
      if (lineIndex < lines.length - 1) {
        const lineTimeout = setTimeout(() => {
          setDisplayedText((prev) => prev + '\n');
          setLineIndex((prev) => prev + 1);
          setCurrentIndex(0);
        }, 150); // Pause briefly between lines
        return () => clearTimeout(lineTimeout);
      } else {
        // Fully complete
        if (onComplete) {
          const doneTimeout = setTimeout(onComplete, 200);
          return () => clearTimeout(doneTimeout);
        }
      }
    }
  }, [started, currentIndex, lineIndex, lines, speed, onComplete]);

  const cursorColorStyles = {
    cyan: 'bg-cyber-cyan shadow-[0_0_5px_#00e5ff]',
    red: 'bg-cyber-red shadow-[0_0_5px_#ff1e1e]',
    white: 'bg-cyber-white',
  };

  return (
    <div className={`whitespace-pre-line font-mono ${className}`}>
      {displayedText}
      {showCursor && (
        <span className={`inline-block w-2 h-4 ml-1 animate-pulse align-middle ${cursorColorStyles[cursorColor]}`} />
      )}
    </div>
  );
};
export default TypingText;
