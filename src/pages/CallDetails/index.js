import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

export default function CallDetail() {
  const { slug } = useParams();
  const [callDetails, setCallDetails] = useState([]);

  useEffect(() => {
    (async () => {
      const res = api.get('activities/' + slug).then((res) => {
        setCallDetails(res.data);
      });
    })();
  }, []);

  return (
    <div className="callDetailContainer">
      <h2>Call Details</h2>
      <div className="callDetailWrapper">
        {callDetails && (
          <div className="detailsWrapper">
            <div>
              <div>{callDetails.direction}</div>
              <div>{callDetails.call_type}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
