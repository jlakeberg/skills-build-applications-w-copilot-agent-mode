import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results ? data.results : data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">Activities</h2>
          <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addActivityModal">Add Activity</button>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{activity.name || '-'}</td>
                    <td>{activity.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Example */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="activityName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="activityName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDesc" className="form-label">Description</label>
                  <input type="text" className="form-control" id="activityDesc" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
