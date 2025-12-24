import useCountUp from "../hooks/useCountUp";

export default function HealthScoreChart({ score }) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const clampedScore = Math.min(Math.max(score, 0), 100);

  // 🔥 Animated number
  const animatedScore = useCountUp(clampedScore, 900);

  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  const color =
    animatedScore >= 75
      ? "#16A34A"
      : animatedScore >= 50
      ? "#EAB308"
      : "#DC2626";

  return (
    <div className="relative flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Animated progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke 0.4s ease"
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute top-1/2 -translate-y-1/2 text-center">
        <p className="text-3xl font-bold">
          {animatedScore}
        </p>
        <p className="text-xs text-gray-500">
          Health Score
        </p>
      </div>
    </div>
  );
}
