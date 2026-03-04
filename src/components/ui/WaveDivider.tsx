interface WaveDividerProps {
  fill?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ fill = "#FDF8F5", flip = false, className }: WaveDividerProps) {
  return (
    <div className={`w-full leading-none overflow-hidden${className ? ` ${className}` : ""}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        width="100%"
        height="80"
        display="block"
        style={flip ? { transform: "scaleY(-1)", display: "block" } : { display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,80 720,0 1080,60 S1440,20 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
