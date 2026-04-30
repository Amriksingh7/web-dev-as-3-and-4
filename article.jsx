function StudentRow({ student, onUpdate }) {
  const passed = student.score >= 40

  return (
    <tr className="student-row">
      <div className={passed ? "side-bar green" : "side-bar red"}></div>
      <td className="col-name">{student.name}</td>
      <td className={passed ? "col-score yellow" : "col-score red"}>{student.score}</td>
      <td className="col-status">
        <span className={passed ? "badge pass" : "badge fail"}>
          {passed ? "PASS" : "FAIL"}
        </span>
      </td>
      <td className="col-update">
        <input
          type="number"
          min="0"
          max="100"
          value={student.inputVal}
          onChange={(e) => onUpdate(student.id, "input", e.target.value)}
        />
        <button onClick={() => onUpdate(student.id, "save")}>SAVE</button>
      </td>
    </tr>
  )
}

function StudentTable({ students, onUpdate }) {
  return (
    <div className="card">
      <div className="card-top">
        <span>STUDENT RECORDS</span>
        <span>{students.length} entries</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>SCORE</th>
              <th>STATUS</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">NO RECORDS FOUND</td>
              </tr>
            )}
            {students.map((s) => (
              <StudentRow key={s.id} student={s} onUpdate={onUpdate} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
