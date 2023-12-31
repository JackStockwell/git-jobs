/* eslint-disable */
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useJobContext} from "../../utils/GlobalState";
import {QUERY_JOBS} from "../../utils/queries";
import {UPDATE_JOBS} from "../../utils/actions";
import {useQuery} from "@apollo/client";
import "./JobList.css";

import JobItem from "../JobItem";

const PAGE_SIZE = 3;

const JobList = () => {
  // State import
  const [state, dispatch] = useJobContext();

  // Get the current category from state.
  const {currentCategory} = state;

  // Sets the page to 0, increments change the rendered data.
  const [page, setPage] = useState(0);

  // Data query, parses a hard set limit of 6 per page render and the offset is the current page * size.
  // Category can be inserted if selected
  const {data, loading, error} = useQuery(QUERY_JOBS, {
    variables: {
      limit: 6,
      offset: page * PAGE_SIZE,
      category: currentCategory,
    },
  });

  function filterJobs() {
    if (!currentCategory) {
      return state.jobs;
    }

    return state.jobs.filter(
      (job) => job.category._id === currentCategory
    )
  }

  //Runs when data or currentCategory is updated.
  useEffect(() => {
      if(data) {
          dispatch({
            type: UPDATE_JOBS,
            jobs: data.jobs
          })
      }
  }, [data, loading, dispatch]);

  //Runs when data or currentCategory is updated.
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_JOBS,
        jobs: data.jobs,
      });
    }
    window.scrollTo({top: 100, left:100, behavior: 'instant' })
  }, [data, loading, dispatch, currentCategory]);
  
  return (
    <div>
      {state.jobs?.length ? (
        <div className="job-wrapper">
            {state.jobs?.length ? (
              <div className="job-item-container">
                  {filterJobs().map((job, index) => {
                    return <JobItem {...job} key={index} />
                  })}
              </div>
            ) : (
                <div><p>No Jobs</p></div>
            )}
            <div className="button-container">
              <button
                disabled={!page}
                onClick={() => setPage((prev) => prev - 1)}
                className={`nav-button ${!page ? "disabled" : ""}`}
              >
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
              </button>
              <button
                disabled={state.jobs?.length < 5}
                onClick={() => setPage((prev) => prev + 1)}
                className={`nav-button ${state.jobs?.length < 6 ? "disabled" : ""}`}
              >
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </button>
            </div>
            {loading ? <span>Loading...</span> : null}
        </div>
      ) : (
        <div className="no-jobs-message">
          <p>No Jobs</p>
        </div>
      )}
    </div>
  );
};

export default JobList;
