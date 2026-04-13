import { useState } from "react";
import FaceRegister from "./FaceRegister";
import FaceLogin from "./FaceLogin";

/*
 * ─────────────────────────────────────────────────────────────
 *  UniSupport Face Recognition — Demo Page
 *
 *  This file is for testing ONLY.
 *  Your group will integrate FaceRegister and FaceLogin
 *  into the actual project pages.
 * ─────────────────────────────────────────────────────────────
 */

const DEMO_STUDENT_ID = "STU2024001"; // Change this to test different IDs

const Demo = () => {
  const [screen, setScreen] = useState("home"); // home|register|login|success
  const [loggedInStudent, setLoggedInStudent] = useState(null);

  const handleLoginSuccess = ({ studentId, confidence }) => {
    setLoggedInStudent({ studentId, confidence });
    setScreen("success");
  };

  if (screen === "register") {
    return (
      <FaceRegister
        studentId={DEMO_STUDENT_ID}
        onSuccess={() => setScreen("home")}
        onCancel={() => setScreen("home")}
      />
    );
  }

  if (screen === "login") {
    return (
      <FaceLogin
        onLoginSuccess={handleLoginSuccess}
        onSwitchToPassword={() => setScreen("home")}
      />
    );
  }

  if (screen === "success") {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>🎉</div>
          <div style={styles.badge}>LOGIN SUCCESSFUL</div>
          <h2 style={styles.title}>Welcome Back!</h2>
          <div style={styles.infoBox}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Student ID</span>
              <span style={styles.infoValue}>{loggedInStudent?.studentId}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>AI Confidence</span>
              <span style={{ ...styles.infoValue, color: "#22c55e" }}>
                {loggedInStudent?.confidence}%
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Model Used</span>
              <span style={styles.infoValue}>FaceNet512</span>
            </div>
          </div>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "24px" }}>
            In the real app, your group will generate a JWT token here
            and redirect to the student dashboard.
          </p>
          <button onClick={() => setScreen("home")} style={styles.btnPurple}>
            ← Back to Demo
          </button>
        </div>
      </div>
    );
  }

  // Home screen
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={styles.logoRow}>
            <div style={styles.logo}>🎓</div>
            <div>
              <h1 style={styles.appName}>UniSupport</h1>
              <p style={styles.appTagline}>AI Face Recognition Module</p>
            </div>
          </div>
          <div style={styles.divider} />
        </div>

        {/* Tech info */}
        <div style={styles.techGrid}>
          {[
            { icon: "🧠", label: "Model", value: "FaceNet512" },
            { icon: "🐍", label: "Backend", value: "Flask + DeepFace" },
            { icon: "⚛️", label: "Frontend", value: "React + Webcam" },
            { icon: "🗄️", label: "Database", value: "MongoDB" },
          ].map((item) => (
            <div key={item.label} style={styles.techCard}>
              <div style={{ fontSize: "22px" }}>{item.icon}</div>
              <div style={{ fontSize: "10px", color: "#475569", textTransform: "uppercase", letterSpacing: "1px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "13px", color: "#a78bfa", fontWeight: "700" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "8px", color: "#475569", fontSize: "12px" }}>
          Demo using Student ID:{" "}
          <span style={{ color: "#a78bfa", fontWeight: "700" }}>{DEMO_STUDENT_ID}</span>
        </div>

        {/* Action buttons */}
        <div style={styles.actionGrid}>
          <button onClick={() => setScreen("register")} style={styles.actionBtn}>
            <span style={{ fontSize: "32px" }}>📸</span>
            <span style={styles.actionLabel}>Register Face</span>
            <span style={styles.actionSub}>Capture & store your face</span>
          </button>
          <button onClick={() => setScreen("login")} style={styles.actionBtn}>
            <span style={{ fontSize: "32px" }}>🔍</span>
            <span style={styles.actionLabel}>Face Login</span>
            <span style={styles.actionSub}>Authenticate with AI</span>
          </button>
        </div>

        {/* Integration note */}
        <div style={styles.noteBox}>
          <p style={{ color: "#7c3aed", fontWeight: "700", fontSize: "12px", marginBottom: "6px" }}>
            📌 For Your Group — Integration Points
          </p>
          <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.7" }}>
            • <code style={styles.code}>{"<FaceRegister studentId={...} onSuccess={...} />"}</code><br />
            • <code style={styles.code}>{"<FaceLogin onLoginSuccess={({studentId}) => ...} />"}</code><br />
            • Use <code style={styles.code}>studentId</code> from login to generate JWT token
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Styles ────────────────────────────────────────────────────
const styles = {
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
    maxWidth: "480px",
    boxShadow: "0 0 60px rgba(139,92,246,0.15)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "#22c55e",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    padding: "4px 14px",
    borderRadius: "20px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  title: { fontSize: "28px", fontWeight: "800", color: "#f1f5f9", marginBottom: "8px" },
  logoRow: {
    display: "flex", alignItems: "center",
    gap: "14px", justifyContent: "center", marginBottom: "20px",
  },
  logo: {
    fontSize: "48px",
    background: "rgba(139,92,246,0.15)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: "16px",
    padding: "8px 12px",
  },
  appName: { fontSize: "28px", fontWeight: "800", color: "#f1f5f9", margin: 0 },
  appTagline: { fontSize: "12px", color: "#8b5cf6", margin: 0, fontWeight: "600" },
  divider: { height: "1px", background: "rgba(139,92,246,0.15)", margin: "0 0 24px" },
  techGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "10px", marginBottom: "20px",
  },
  techCard: {
    background: "rgba(139,92,246,0.07)",
    border: "1px solid rgba(139,92,246,0.15)",
    borderRadius: "12px",
    padding: "12px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "4px",
  },
  actionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" },
  actionBtn: {
    background: "rgba(139,92,246,0.1)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: "16px",
    padding: "20px 12px",
    cursor: "pointer",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "6px",
    transition: "all 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  },
  actionLabel: { color: "#f1f5f9", fontWeight: "700", fontSize: "15px" },
  actionSub: { color: "#475569", fontSize: "11px" },
  noteBox: {
    background: "rgba(124,58,237,0.08)",
    border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: "12px",
    padding: "14px 16px",
    marginTop: "16px",
    textAlign: "left",
  },
  code: {
    background: "rgba(139,92,246,0.15)",
    color: "#a78bfa",
    padding: "1px 5px",
    borderRadius: "4px",
    fontSize: "11px",
    fontFamily: "monospace",
  },
  infoBox: {
    background: "rgba(139,92,246,0.07)",
    border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: "14px",
    padding: "16px 20px",
    margin: "20px 0",
    textAlign: "left",
  },
  infoRow: {
    display: "flex", justifyContent: "space-between",
    padding: "8px 0", borderBottom: "1px solid rgba(139,92,246,0.1)",
  },
  infoLabel: { color: "#475569", fontSize: "13px" },
  infoValue: { color: "#f1f5f9", fontWeight: "700", fontSize: "13px" },
  btnPurple: {
    padding: "12px 28px",
    background: "#8b5cf6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
  },
};

export default Demo;
