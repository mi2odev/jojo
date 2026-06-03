interface Props {
  size?: number;
  color?: string;
  stroke?: string;
  className?: string;
}

/** The iconic Joestar five-pointed star birthmark. */
export function JoestarStar({ size = 24, color = '#FFD700', stroke = '#050505', className }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M12 1.6l2.9 6.05 6.65.83-4.9 4.52 1.28 6.59L12 17.9l-5.92 3.49 1.28-6.59-4.9-4.52 6.65-.83z"
        fill={color}
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default JoestarStar;
