import { useState } from "react";

export const InterviewCreate = () => {

  const departments = ['HR', 'Management', 'TAT', 'B2B']
  const interviewers = {
    'HR' : ['Jon Marry'],
    'Management' : ['Mgmg','MAma'],
    'TAT':['HlaHla','MyaMya'],
    'B2B':['Aungaung','MyoMyo'],
  }
  const interviewStages =['first','second','third']

   const[selectedDepartment, setSelectedDepartment] = useState("")
   console.log(selectedDepartment)
   const [selectedInterviewStage, setSelectedInterviewStage] = useState("")
   console.log(selectedInterviewStage)

  return (
    <div>
      InterviewCreate:
      <br/>
      Departments:
      <select onChange={(e) => {setSelectedDepartment(e.target.value)}}>
        {
          departments.map(department => {
            return <option>{department }</option>
          })
        }
      </select>
      { selectedDepartment && <select>
        {
           interviewers[selectedDepartment].map(interviewer => {
            return <option>{interviewer}</option>
           }
            )
        }
      </select> }
      <br />
      Interview Stages:
      <select onChange={(e) => {setSelectedInterviewStage(e.target.value)}}>
        {
          interviewStages.map(interviewstage => {
            return <option>{interviewstage }</option>
          })
        }
      </select>
      <br />
      <button type="submit">Create</button>
    </div>
  )
 

};

