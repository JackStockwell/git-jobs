import React, {useEffect, useState }from 'react'

import { useMediaPredicate } from 'react-media-hook';
import EditorRender from '../TextEditor/Editor'
import JobApplicants from '../JobItem/Applicant'

import { useNavigate } from 'react-router-dom';
import '../LoggedProfiles/EmpProfList.css'
import '../LoggedProfiles/emp.css'

const JobApplyList = ({data}) => {

    const navigate = useNavigate()

    const [selectedJob, setSelectedJob] = useState({})

    const handleMinWidth = useMediaPredicate("(min-width: 70em)")

    const handleOnClick = (applicant) => {
        if(handleMinWidth) {
            setSelectedJob(applicant)
        } else {
            navigate(`/view/${applicant._id}`)
        }
    }

    return (
        <>
            <div className='emp-wrapper'>
                    <div className='emp-job-list'>
                        {data?.map((job) => {
                            return (
                                <div 
                                key={job._id} 
                                className='job-card job-card-widget' 
                                data-value={job._id}
                                onClick={() => handleOnClick(job.applicants)}>
                                    <h4>{job.title}</h4>
                                    <h5>{job.company.companyName}</h5>
                                    <h5>{job.category.name}</h5>
                                    <div>
                                        <EditorRender>
                                            {job.description}
                                        </EditorRender>
                                    </div>
                                    <span style={{alignSelf: 'center'}}>Click to view more.</span>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        {selectedJob?.length ? (
                            <>  
                                <JobApplicants data={selectedJob}/>
                            </>
                        ):(
                            <p style={{textAlign: 'center', fontSize: '2em'}}>No applicants</p>
                        )}
                    </div>
                <div>
                    {/* ON CLICK DISPLAY AN ARRAY OF PEOPLE WHO HAVE APPLIED FOR THE JOB */}
                </div>
            </div>
        </>
    )
}

export default JobApplyList
