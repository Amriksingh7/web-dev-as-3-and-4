import { useState } from "react"
import Header from "./topbar.jsx"
import StudentTable from "./article.jsx"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #0b0f14;
    color: #c9d8e8;
    font-family: 'Share Tech Mono', monospace;
  }

  #root {
    min-height: 100vh;
  }

  .wrapper {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0, 229, 192, 0.07), transparent);
    padding-bottom: 60px;
  }

  .header {
    padding: 40px 60px 28px;
    border-bottom: 1px solid #1e2d3d;
    position: relative;
  }

  .version {
    font-size: 11px;
    letter-spacing: 4px;
    color: #4a6278;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .version::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 2px;
    background: #00e5c0;
  }

  .header h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(34px, 5vw, 58px);
    font-weight: 900;
    letter-spacing: 2px;
    color: #ffffff;
  }

  .header h1 span {
    color: #00e5c0;
  }

  .header-line {
    position: absolute;
    bottom: -1px;
    left: 60px;
    width: 200px;
    height: 2px;
    background: linear-gradient(to right, #00e5c0, transparent);
  }

  .content {
    padding: 36px 60px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .card {
    background: #111820;
    border: 1px solid #1e2d3d;
    border-radius: 4px;
    overflow: hidden;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #1e2d3d;
    font-size: 11px;
    letter-spacing: 3px;
    color: #4a6278;
  }

  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00e5c0;
    box-shadow: 0 0 6px #00e5c0;
    margin-right: 8px;
  }

  .form-inputs {
    display: flex;
    padding: 12px 16px;
  }

  .form-inputs input {
    flex: 1;
    background: transparent;
    border: 1px solid #1e2d3d;
    color: #c9d8e8;
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    padding: 10px 16px;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-inputs input:focus {
    border-color: #00e5c0;
  }

  .form-inputs input:first-child {
    border-right: none;
    border-radius: 3px 0 0 3px;
  }

  .form-inputs input:nth-child(2) {
    border-radius: 0;
  }

  .form-inputs input::placeholder {
    color: #4a6278;
  }

  .btn-add {
    background: transparent;
    border: 1px solid #00e5c0;
    border-left: none;
    color: #00e5c0;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    letter-spacing: 2px;
    padding: 10px 22px;
    cursor: pointer;
    border-radius: 0 3px 3px 0;
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;
  }

  .btn-add:hover {
    background: #00e5c0;
    color: #0b0f14;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .stat {
    padding: 22px 28px;
    border-right: 1px solid #1e2d3d;
  }

  .stat:last-child {
    border-right: none;
  }

  .stat-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: #4a6278;
    margin-bottom: 8px;
  }

  .stat-number {
    font-family: 'Orbitron', sans-serif;
    font-size: 38px;
    font-weight: 700;
    color: #00e5c0;
  }

  .table-scroll {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead tr {
    border-bottom: 1px solid #1e2d3d;
  }

  thead th {
    padding: 10px 20px;
    font-size: 10px;
    letter-spacing: 3px;
    color: #4a6278;
    text-align: left;
    font-weight: normal;
  }

  tbody tr.student-row {
    border-bottom: 1px solid #1e2d3d;
    position: relative;
    transition: background 0.15s;
  }

  tbody tr.student-row:last-child {
    border-bottom: none;
  }

  tbody tr.student-row:hover {
    background: rgba(0, 229, 192, 0.03);
  }

  .side-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
  }

  .side-bar.green { background: #00e090; }
  .side-bar.red   { background: #ff4d6d; }

  td {
    padding: 14px 20px;
    font-size: 13px;
    vertical-align: middle;
  }

  .col-name {
    padding-left: 28px;
    letter-spacing: 1px;
  }

  .col-score {
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  .col-score.yellow { color: #f0c040; }
  .col-score.red    { color: #ff4d6d; }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 4px 10px;
    border-radius: 2px;
  }

  .badge::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .badge.pass {
    background: rgba(0, 224, 144, 0.1);
    color: #00e090;
    border: 1px solid rgba(0, 224, 144, 0.3);
  }

  .badge.pass::before {
    background: #00e090;
    box-shadow: 0 0 5px #00e090;
  }

  .badge.fail {
    background: rgba(255, 77, 109, 0.1);
    color: #ff4d6d;
    border: 1px solid rgba(255, 77, 109, 0.3);
  }

  .badge.fail::before {
    background: #ff4d6d;
  }

  .col-update {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .col-update input {
    width: 72px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #1e2d3d;
    color: #c9d8e8;
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    padding: 6px 10px;
    outline: none;
    border-radius: 3px;
    transition: border-color 0.2s;
  }

  .col-update input:focus {
    border-color: #00e5c0;
  }

  .col-update button {
    background: transparent;
    border: 1px solid #1e2d3d;
    color: #4a6278;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 3px;
    transition: border-color 0.2s, color 0.2s;
  }

  .col-update button:hover {
    border-color: #00e5c0;
    color: #00e5c0;
  }

  .no-data {
    text-align: center;
    padding: 40px;
    color: #4a6278;
    letter-spacing: 2px;
  }

  .site-footer {
    text-align: center;
    margin: 36px 60px 0;
    padding: 24px;
    border-top: 1px solid #1e2d3d;
    font-size: 10px;
    letter-spacing: 4px;
    color: #4a6278;
  }

  .site-footer span {
    margin: 0 10px;
  }
`

const defaultStudents = [
  { id: 1, name: "Aman",  score: 78, inputVal: "78" },
  { id: 2, name: "Riya",  score: 45, inputVal: "45" },
  { id: 3, name: "Karan", score: 90, inputVal: "90" },
  { id: 4, name: "Neha",  score: 32, inputVal: "32" },
]

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("")
  const [score, setScore] = useState("")

  function submit() {
    const n = name.trim()
    const s = Number(score)
    if (!n || score === "" || isNaN(s) || s < 0 || s > 100) return
    onAdd({ id: Date.now(), name: n, score: s, inputVal: String(s) })
    setName("")
    setScore("")
  }

  function onKey(e) {
    if (e.key === "Enter") submit()
  }

  return (
    <div className="card">
      <div className="card-top">
        <span><span className="dot" />REGISTER STUDENT</span>
        <span>NEW ENTRY</span>
      </div>
      <div className="form-inputs">
        <input
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onKey}
        />
        <input
          placeholder="Score (0-100)"
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          onKeyDown={onKey}
        />
        <button className="btn-add" onClick={submit}>+ ADD</button>
      </div>
    </div>
  )
}

function Stats({ students }) {
  const total = students.length
  const passed = students.filter((s) => s.score >= 40).length
  const avg = total ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / total) : 0

  return (
    <div className="card">
      <div className="stats-row">
        <div className="stat">
          <div className="stat-label">TOTAL</div>
          <div className="stat-number">{total}</div>
        </div>
        <div className="stat">
          <div className="stat-label">PASSED</div>
          <div className="stat-number">{passed}</div>
        </div>
        <div className="stat">
          <div className="stat-label">AVG SCORE</div>
          <div className="stat-number">{avg}</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [students, setStudents] = useState(defaultStudents)

  function addStudent(student) {
    setStudents((prev) => [...prev, student])
  }

  function updateStudent(id, action, value) {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        if (action === "input") return { ...s, inputVal: value }
        if (action === "save") {
          const num = Number(s.inputVal)
          if (!isNaN(num) && num >= 0 && num <= 100) return { ...s, score: num }
        }
        return s
      })
    )
  }

  return (
    <>
      <style>{css}</style>
      <div className="wrapper">
        <Header />
        <div className="content">
          <AddStudentForm onAdd={addStudent} />
          <Stats students={students} />
          <StudentTable students={students} onUpdate={updateStudent} />
        </div>
        <footer className="site-footer">
          <span>ACADEMIC TERMINAL</span>·<span>SECURE SESSION</span>
        </footer>
      </div>
    </>
  )
}
