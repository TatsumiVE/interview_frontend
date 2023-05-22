import React from 'react'; 
import { Input,Button } from '../../components';

export const InterviewAssessment = () => {
    return (
        <div className="card">
            <div className="card__header">
                <h2>Interview Assessment Form</h2>
            </div>
            <div className="card__body">
                <div className="card__txt">
                    <div>
                        <h3 className="txt-default">
                            Candidate Name
                        </h3>
                        <h3>
                            John Doe
                        </h3>
                    </div>
                    <div>
                        <h3 className="txt-default">
                            Applied Position
                        </h3>
                        <h3>
                            Web Developer
                        </h3>
                    </div>
                    <div>
                        <h3 className="txt-default">
                            Date
                        </h3>
                        <div>
                            <input type="date" />
                        </div>
                    </div>
                </div>
                <div className="card__txt">
                    <div>First Interview </div>
                    <div>
                        <Input type="radio" labelName="In Person" />
                        <Input type="radio" labelName="Online" />
                    </div>
                    <div>
                        <input type="text" className="" placeholder='Enter record_path' />
                    </div>
                </div>
                <div className="card__card-question">
                    <div className='question-title'>
                        <h3 className='topic'>Topic</h3>
                        <h3 className='rate'>Rate</h3>
                    </div>
                    <div className='question-body'>
                        <div className="question-topic">
                            <p>Computer Application</p>
                        </div>
                        <div className='question-rate'>
                            <label>
                                Well
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Good
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Acceptable
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Unacceptable
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Nill
                                <input type="checkbox"></input>
                            </label>
                        </div>
                    </div>
                    <div className='question-body'>
                        <div className="question-topic">
                            <p>Computer Application</p>
                        </div>
                        <div className='question-rate'>
                            <label>
                                Well
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Good
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Acceptable
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Unacceptable
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Nill
                                <input type="checkbox"></input>
                            </label>
                        </div>
                    </div>
                    <div className='question-body'>
                        <div className="question-topic">
                            <p>Computer Application</p>
                        </div>
                        <div className='question-rate'>
                            <label>
                                Well
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Good
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Acceptable
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Unacceptable
                                <input type="checkbox"></input>
                            </label>
                            <label>
                                Nill
                                <input type="checkbox"></input>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="card__txt">
                    <div>
                        <h3 className="txt-default">
                            Interviewer Name
                        </h3>
                        <h3>
                            Ma Ma
                        </h3>
                    </div>
                    <div>
                        <h3 className="txt-default">
                            Department
                        </h3>
                        <h3>
                            HVC
                        </h3>
                    </div>
                    <div>
                        <h3 className="txt-default">
                            Position
                        </h3>
                        <h3>
                            B2B
                        </h3>
                    </div>
                </div>
                <div className="box">
                    <textarea name="comment" className='commentBox' placeholder='Comment'></textarea>
                </div>
                <div className="btn-group">
                    <Button type="button" className='txt-light btn-primary' text="Submit" />
                    <Button type="button" className='txt-light btn-default' text="Cancel" />
                </div>
            </div>

        </div>

    )
}
