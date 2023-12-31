import React from "react";
import Auth from "../../utils/auth";
import "./JobItem.css";
import {Link, useNavigate} from "react-router-dom";

import { useMutation } from "@apollo/client";
import { SAVE_JOB, APPLY_JOB } from "../../utils/mutations";
import { useMediaPredicate } from 'react-media-hook';

import EditorRender from '../TextEditor/Editor'


function JobItem({
  _id,
  title,
  company,
  description,
  salary,
  tags,
  category,
  overflow
}) {

  // Global state and reducer import

  // DB mutations and query
  const [saveJob, { error: saveError }] = useMutation(SAVE_JOB);
  const [applyJob, { error: applyError}] = useMutation(APPLY_JOB)

  const navigate = useNavigate()

  const handleMinWidth = useMediaPredicate("(min-width: 60em)")

  const handleOnSave = async ({target}) => {
    const id = target.dataset.id;
    if (!Auth.loggedIn()) {
      return;
    }
    try {
      const {data} = await saveJob({
        variables: {id: id},
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnApply = async ({target}) => {
    // Takes id from the target apply button.
    const applyJobId = target.dataset.id;
    // Checks for them being logged in, returns if not logged in.
    if (!Auth.loggedIn()) {
      return;
    }
    // API request.
    try {
      const {data} = await applyJob({
        variables: {id: applyJobId},
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnClick = (id) => {
    if(handleMinWidth) {
        null
    } else {

        navigate(`/job/${id}`)
    }
}

    return (
        <div className="job-card" onClick={() => handleOnClick(_id)}>
            <div className="job-header">
                <div className="job-title">
                    <h3 style={{height: 'fit-content'}}>{title}</h3>
                    <h4><Link className="job-link" to={`/cmp/${company.companyName}/${company._id}`}>{company.companyName}</Link></h4>
                    <h5>                        
                        {company.location ? (
                        <p>{company.location.city}</p>
                        ) : (
                            <p>London</p>
                        )}
                    </h5>
                </div>
                {!Auth.empLogged() && Auth.loggedIn() && (
                    <div className="buttons">
                    {/* Button container */}
                      <button className="category-button" data-id={_id} data-action="save" onClick={handleOnSave}>
                        Save
                      </button>
                      <button className="category-button" data-id={_id} data-action="apply" onClick={handleOnApply}>
                          Apply
                      </button>
                    </div>
                )}
                {!Auth.loggedIn() && (
                    <>
                        <Link to='/login' className="button link">You must be logged in to Apply!</Link>
                    </>
                )}           
            </div>
            <div className="job-header">
                <div>
                    <p className="job-category">{category.name}</p>
                </div>
                <div className="job-tag-container">
                    <h6>Tags:</h6>
                    <div className="job-tag-div">
                        {tags &&
                            tags.map((tag, index) => {
                                return <p key={index + tag._id} id={tag._id}>{tag.name}</p>;
                        })}
                    </div>
                </div>
            </div>
            {/* Company div, deconstructs the prop */}
            <div className="job-info">
                <div className="job-sal-div">
                    <h6>Salary:</h6>
                    <p>{salary}</p>
                </div>
            </div>
            <div style={{margin: '1rem 0' }} className={overflow ? ('job-description'):('')}>
                <EditorRender>
                    {description}
                </EditorRender>
            </div>
            {!handleMinWidth && <span style={{alignSelf: 'center'}}>Click to view more.</span>}       
        </div>
    )
}

export default JobItem;
