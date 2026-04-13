import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { loginFaceAI, checkServerHealth } from "./faceService";

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
  title: { fontSize: "26px", fontWeight: "800", color: "#f1f5f9", marginBottom: "6px" },
  subtitle: { fontSize: "13px", color: "#64748b", marginBottom: "24px" },
  camOuter: { position: "relative", display: "inline-block" },
  svgOverlay: { position: "absolute", top: 0, left: 0, pointerEvents: "none" },
  confSection: { margin: "14px auto 0", width: "300px" },
  confLabel: { fontSize: "11px", color: "#64748b", marginBottom: "6px", textAlign: "left" },
  confTrack: {
    height: "8px", background: "#1e293b",
    borderRadius: "4px", overflow: "hidden",
  },
  btnRow: {
    display: "flex", gap: "10px",
    justifyContent: "center", flexWrap: "wrap", marginTop: "18px",
  },
  switchRow: { marginTop: "20px", fontSize: "13px", color: "#475569" },
  serverStatus: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "6px",
    marginBottom: "16px", fontSize: "12px",
  },
};

const btn = (bg, disabled) => ({
  padding: "11px 22px",
  background: disabled ? "#1e293b" : bg,
  color: disabled ? "#475569" : "white",
  border: "none",
  borderRadius: "10px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontWeight: "700",
  fontSize: "14px",
  transition: "all 0.2s",
  fontFamily: "'DM Sans', sans-serif",
});

// Scan line CSS injected once
const injectScanCSS = () => {
  if (document.getElementById("scan-style")) return;
  const style = document.createElement("style");
  style.id = "scan-style";
  style.textContent = `
    @keyframes scanMove {
      0%   { top: 0%; opacity: 1; }
      50%  { top: 88%; opacity: 1; }
      100% { top: 0%; opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.4; }
    }
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
  `;
  document.head.appendChild(style);
};

// ── Component ─────────────────────────────────────────────────
const FaceLogin = ({ onLoginSuccess, onSwitchToPassword }) => {
  const webcamRef = useRef(null);
  const [scanState, setScanState] = useState("idle"); // idle|scanning|success|failed
  const [message, setMessage] = useState("Position your face and click Scan");
  const [autoMode, setAutoMode] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [serverOk, setServerOk] = useState(null); // null|true|false

  useEffect(() => {
    injectScanCSS();
    // Check server health on mount
    checkServerHealth().then((ok) => setServerOk(ok));
  }, []);

  // Auto scan interval
  useEffect(() => {
    if (!autoMode) return;
    const id = setInterval(handleScan, 3000);
    return () => clearInterval(id);
  }, [autoMode, scanState]);

  const handleScan = useCallback(async () => {
    if (scanState === "scanning") return;

    const shot = webcamRef.current?.getScreenshot();
    if (!shot) {
      setMessage("❌ Camera not ready. Please allow camera access.");
      return;
    }

    setScanState("scanning");
    setMessage("🧠 FaceNet512 is analyzing your face...");
    setConfidence(null);

    try {
      const result = await loginFaceAI(shot);
      setScanState("success");
      setAutoMode(false);
      setConfidence(result.confidence);
      setMessage(`✅ Identity verified! Welcome back.`);
      setTimeout(() => onLoginSuccess({ studentId: result.studentId, confidence: result.confidence }), 1200);
    } catch (err) {
      setScanState("failed");
      setMessage(`❌ ${err.message}`);
      setTimeout(() => {
        setScanState("idle");
        setMessage("Try again with better lighting");
      }, 2200);
    }
  }, [scanState, onLoginSuccess]);

  const borderColor = {
    idle: "#8b5cf6",
    scanning: "#f59e0b",
    success: "#22c55e",
    failed: "#ef4444",
  }[scanState];

  const confColor =
    confidence >= 85 ? "#22c55e" : confidence >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={S.badge}>FaceNet512 · AI Powered</div>
        <h2 style={S.title}>Face ID Login</h2>
        <p style={S.subtitle}>Look at the camera to sign in instantly</p>

        {/* Server status indicator */}
        <div style={S.serverStatus}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: serverOk === null ? "#f59e0b" : serverOk ? "#22c55e" : "#ef4444",
            animation: serverOk === null ? "pulse 1.2s infinite" : "none",
          }} />
          <span style={{ color: serverOk === null ? "#f59e0b" : serverOk ? "#22c55e" : "#ef4444", fontSize: "12px" }}>
            {serverOk === null ? "Connecting to AI server..." : serverOk ? "AI Server Connected" : "AI Server Offline — start app.py"}
          </span>
        </div>

        {/* Camera */}
        <div style={S.camOuter}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={380}
            height={285}
            videoConstraints={{ facingMode: "user" }}
            style={{
              display: "block",
              borderRadius: "16px",
              border: `3px solid ${borderColor}`,
              transition: "border-color 0.35s",
            }}
          />

          {/* Face guide oval */}
          <svg style={S.svgOverlay} width="380" height="285">
            <ellipse
              cx="190" cy="142" rx="95" ry="115"
              fill="none"
              stroke={borderColor}
              strokeWidth="2.5"
              strokeDasharray="10 5"
              opacity="0.8"
            />
          </svg>

          {/* Scanning line */}
          {scanState === "scanning" && (
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              borderRadius: "16px", overflow: "hidden",
              pointerEvents: "none",
            }}>
              <div style={{
                position: "absolute", width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, transparent, #f59e0b, transparent)",
                animation: "scanMove 1.6s ease-in-out infinite",
              }} />
            </div>
          )}

          {/* Success overlay */}
          {scanState === "success" && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              fontSize: "64px",
              filter: "drop-shadow(0 0 20px #22c55e)",
            }}>✅</div>
          )}
        </div>

        {/* Confidence bar */}
        {confidence !== null && (
          <div style={S.confSection}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={S.confLabel}>AI Confidence</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: confColor }}>{confidence}%</span>
            </div>
            <div style={S.confTrack}>
              <div style={{
                height: "100%",
                width: `${confidence}%`,
                background: confColor,
                borderRadius: "4px",
                transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        )}

        {/* Status message */}
        <p style={{
          fontSize: "14px",
          color: { idle: "#94a3b8", scanning: "#f59e0b", success: "#22c55e", failed: "#ef4444" }[scanState],
          margin: "16px 0 0",
          minHeight: "22px",
          fontWeight: "600",
        }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={S.btnRow}>
          <button
            onClick={handleScan}
            disabled={scanState === "scanning" || !serverOk}
            style={btn("#8b5cf6", scanState === "scanning" || !serverOk)}
          >
            {scanState === "scanning" ? "⏳ Scanning..." : "🔍 Scan Face"}
          </button>
          <button
            onClick={() => setAutoMode(!autoMode)}
            disabled={!serverOk}
            style={btn(autoMode ? "#dc2626" : "#0f766e", !serverOk)}
          >
            {autoMode ? "⏹ Stop Auto" : "▶ Auto Scan"}
          </button>
        </div>

        {/* Switch to password */}
        <p style={S.switchRow}>
          Having trouble?{" "}
          <span
            onClick={onSwitchToPassword}
            style={{ color: "#8b5cf6", cursor: "pointer", fontWeight: "700", textDecoration: "underline" }}
          >
            Use password instead
          </span>
        </p>
      </div>
    </div>
  );
};

export default FaceLogin;
