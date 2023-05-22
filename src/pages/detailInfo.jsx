import { Button } from "../components/utilites/button"

export const DetailInfo = () =>{
  return(
    <>
    <Button type="button" text="Back" btnColor="" />
    <div>
    <p>Name: YU</p>
    <p>Email: yu@gmail.com</p>
    <p>Applied Position: Junior Developer</p>
    </div>
    <div>
    <Button type="button" text="Detail Info" btnColor="" />
    <Button type="button" text="Assessment Based on Stages" btnColor="" />
    <Button type="button" text="Remark" btnColor="" />
    </div>
    <div>
      <h1>First Stage</h1>
      <p>Topic:</p>
      <p>Computer Skills</p>
      <p>Rate:</p>
      <p>Well</p>
    </div>
    </>
  )
}