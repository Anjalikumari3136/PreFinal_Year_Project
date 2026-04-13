import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { registerFaceAI } from "./faceService";

// ── Styles ───────────────────────────────────────────────────
const S = {
  wrapper: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#0f0f1a",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "linear-gradient(145deg, #1a1a2e, #16213e)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: "24px",
    padding: "36px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 0 60px rgba(139,92,246,0.15)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(139,92,246,0.15)",
    border: "1px solid rgba(139,92,246,0.4)",
    color: "#a78bfa",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "24px",
  },
  camWrapper: {
    position: "relative",
    display: "inline-block",
    borderRadius: "16px",
    overflow: "hidden",
  },
  cam: {
    display: "block",
    borderRadius: "16px",
  },
  svgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  dotsRow: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    margin: "18px 0 10px",
  },
  statusMsg: {
    fontSize: "14px",
    color: "#94a3b8",
    minHeight: "22px",
    marginBottom: "18px",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tips: {
    background: "rgba(139,92,246,0.07)",
    border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: "12px",
    padding: "14px 18px",
    marginTop: "20px",
    textAlign: "left",
  },
  tipTitle: { color: "#a78bfa", fontWeight: "700", fontSize: "13px", marginBottom: "8px" },
  tipItem: { color: "#64748b", fontSize: "12px", lineHeight: "1.8" },
};

const btn = (bg, disabled) => ({
  padding: "11px 22px",
  background: disabled ? "#334155" : bg,
  color: disabled ? "#64748b" : "white",
  border: "none",
  borderRadius: "10px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontWeight: "700",
  fontSize: "14px",
  transition: "all 0.2s",
  fontFamily: "'DM Sans', sans-serif",
});

// ── Component ─────────────────────────────────────────────────
const FaceRegister = ({ studentId, onSuccess, onCancel }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [phase, setPhase] = useState("capture"); // capture | processing | done | error
  const [message, setMessage] = useState("Capture 5 photos from slightly different angles");
  const [isCapturing, setIsCapturing] = useState(false);

  const capturePhoto = useCallback(async () => {
    if (isCapturing || images.length >= 5) return;
    setIsCapturing(true);

    // Flash effect delay
    await new Promise((r) => setTimeout(r, 100));

    const shot = webcamRef.current?.getScreenshot();
    if (shot) {
      setImages((prev) => {
        const updated = [...prev, shot];
        const remaining = 5 - updated.length;
        if (remaining > 0) {
          setMessage(`📸 Photo ${updated.length}/5 captured — ${remaining} more to go`);
        } else {
          setMessage("✅ All 5 photos captured — ready to register!");
        }
        return updated;
      });
    }
    setIsCapturing(false);
  }, [isCapturing, images.length]);

  const handleRegister = async () => {
    if (images.length < 3) {
      setMessage("⚠️ Please capture at least 3 photos first");
      return;
    }
    setPhase("processing");
    setMessage("🧠 FaceNet512 AI is processing your face embeddings...");

    try {
      const result = await registerFaceAI(studentId, images);
      setPhase("done");
      setMessage(`✅ ${result.message}`);
      setTimeout(() => onSuccess?.(), 1800);
    } catch (err) {
      setPhase("error");
      setMessage(`❌ ${err.message}`);
      setTimeout(() => setPhase("capture"), 3000);
    }
  };

  const reset = () => {
    setImages([]);
    setPhase("capture");
    setMessage("Capture 5 photos from slightly different angles");
  };

  const dotColor = (i) => {
    if (images.length >= i) {
      if (phase === "done") return "#22c55e";
      if (phase === "error") return "#ef4444";
      return "#8b5cf6";
    }
    return "#1e293b";
  };

  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={S.badge}>FaceNet512 · Deep Learning</div>
        <h2 style={S.title}>Register Your Face</h2>
        <p style={S.subtitle}>
          Student ID: <span style={{ color: "#a78bfa", fontWeight: "700" }}>{studentId}</span>
        </p>

        {/* Camera */}
        <div style={S.camWrapper}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={380}
            height={285}
            videoConstraints={{ facingMode: "user" }}
            style={S.cam}
          />
          {/* Face guide oval */}
          <svg style={S.svgOverlay} width="380" height="285">
            <ellipse
              cx="190" cy="142" rx="95" ry="115"
              fill="none"
              stroke={phase === "done" ? "#22c55e" : phase === "error" ? "#ef4444" : "#8b5cf6"}
              strokeWidth="2"
              strokeDasharray="10 5"
              opacity="0.7"
            />
            <text x="190" y="272" textAnchor="middle" fill="#475569" fontSize="11">
              Keep face inside this guide
            </text>
          </svg>
        </div>

        {/* Progress dots */}
        <div style={S.dotsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: dotColor(i),
                border: `2px solid ${images.length >= i ? "transparent" : "#334155"}`,
                transition: "all 0.3s",
                transform: images.length >= i ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <p style={S.statusMsg}>{message}</p>

        {/* Action buttons */}
        <div style={S.btnRow}>
          {phase === "capture" && images.length < 5 && (
            <button
              onClick={capturePhoto}
              disabled={isCapturing}
              style={btn("#8b5cf6", isCapturing)}
            >
              {isCapturing ? "⏳ Capturing..." : `📸 Capture (${images.length}/5)`}
            </button>
          )}
          {phase !== "processing" && phase !== "done" && images.length >= 3 && (
            <button onClick={handleRegister} style={btn("#16a34a", false)}>
              🧠 Register with AI
            </button>
          )}
          {phase === "processing" && (
            <div style={{ color: "#f59e0b", fontWeight: "700", fontSize: "14px", padding: "11px" }}>
              ⏳ AI Processing...
            </div>
          )}
          {images.length > 0 && phase === "capture" && (
            <button onClick={reset} style={btn("#475569", false)}>
              🔄 Reset
            </button>
          )}
          {onCancel && (
            <button onClick={onCancel} style={btn("#1e293b", false)}>
              Cancel
            </button>
          )}
        </div>

        {/* Tips */}
        <div style={S.tips}>
          <p style={S.tipTitle}>💡 Tips for best accuracy</p>
          <p style={S.tipItem}>• Face the camera directly in good lighting</p>
          <p style={S.tipItem}>• Slightly tilt your head between captures</p>
          <p style={S.tipItem}>• Avoid shadows on your face</p>
          <p style={S.tipItem}>• Remove glasses for first registration</p>
        </div>
      </div>
    </div>
  );
};

export default FaceRegister;
