import { motion, useTransform } from "framer-motion";

const N = 8;
export { N };
const S = 0.8;
const SP = 200;

export default function FloatingCard({ index, progress, videoSrc }) {
  const pos = useTransform(progress, (p) => {
    const raw = index - p * S;
    const w = ((raw % N) + N) % N;
    const c = w > N / 2 ? w - N : w;
    return {
      x: c * SP,
      y: c * -150,
      z: c * -150,
      scale: Math.max(0.35, 1.6 - Math.abs(c) * 0.18),
      ry: -18 + c * 2,
      w: 260 + (c + 8) * 8,
      h: 180 + (c + 8) * 6,
    };
  });

  const transform = useTransform(pos, (p) =>
    `translate(-50%, -50%) translate(${p.x}px, ${p.y}px) translateZ(${p.z}px) scale(${p.scale}) rotateY(${p.ry}deg) rotateX(-4deg)`
  );
  const width = useTransform(pos, (p) => `${p.w}px`);
  const height = useTransform(pos, (p) => `${p.h}px`);

  const halfW = useTransform(width, (w) => `${parseFloat(w) * 1.8}px`);
  const halfH = useTransform(height, (h) => `${parseFloat(h) * 1.8}px`);

  const blur = useTransform(pos, (p) => {
    const d = Math.abs(p.z);
    return Math.min(3, d * 0.0004);
  });
  const opacity = useTransform(pos, (p) => {
    const d = Math.abs(p.z);
    return Math.max(0.12, 1 - d * 0.0004);
  });
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const flatX = useTransform(pos, (p) => p.x);
  const flatY = useTransform(pos, (p) => p.y);
  const hitTransform = useTransform([flatX, flatY], ([x, y]) =>
    `translate(-50%, -50%) translate(${x}px, ${y}px)`
  );

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transformStyle: "preserve-3d",
          transform,
          width,
          height,
          opacity,
          filter,
          pointerEvents: "none",
          background: "#000",
          borderRadius: 4,
          overflow: "hidden",
          outline: "2px solid #000",
        }}
      >
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          draggable={false}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: hitTransform,
          width: halfW,
          height: halfH,
          cursor: "pointer",
          zIndex: 100,
        }}
        whileHover={{ y: -16 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      />
    </>
  );
}
