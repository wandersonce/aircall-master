import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

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
            {callDetails.direction === 'outbound' ? (
              // OUTBOUND CALLS
              <div>
                {callDetails.call_type === 'missed' && (
                  <div className="missedCall">
                    Tried to call{' '}
                    <span className="callTo">{callDetails.to}</span> from{' '}
                    <span className="callFrom">{callDetails.from}</span>, but{' '}
                    <span className="missedStatus">
                      {callDetails.call_type}
                    </span>
                    .
                  </div>
                )}

                {callDetails.call_type === 'answered' && (
                  <div className="missedCall">
                    <span className="callTo">{callDetails.to}</span> called to{' '}
                    <span className="callFrom">{callDetails.from}</span>, and
                    was{' '}
                    <span className="answeredStatus">
                      {callDetails.call_type}
                    </span>
                    .
                  </div>
                )}

                {callDetails.call_type === 'voicemail ' && (
                  <div className="missedCall">
                    <span className="callTo">{callDetails.to}</span> called to{' '}
                    <span className="callFrom">{callDetails.from}</span>, but
                    left a{' '}
                    <span className="answeredStatus">
                      {callDetails.call_type}
                    </span>
                    .
                  </div>
                )}
              </div>
            ) : (
              // INBOUND CALLS
              <div>
                {callDetails.call_type === 'missed' && (
                  <div className="missedCall">
                    <span className="callTo">{callDetails.to}</span> received a
                    call from{' '}
                    <span className="callFrom">{callDetails.from}</span>, but{' '}
                    <span className="missedStatus">
                      {callDetails.call_type}
                    </span>
                    .
                  </div>
                )}

                {callDetails.call_type === 'answered' && (
                  <div className="missedCall">
                    <span className="callTo">{callDetails.to}</span> received a
                    call from{' '}
                    <span className="callFrom">{callDetails.from}</span>, and
                    was{' '}
                    <span className="answeredStatus">
                      {callDetails.call_type}
                    </span>
                    .
                  </div>
                )}

                {callDetails.call_type === 'voicemail ' && (
                  <div className="missedCall">
                    <span className="callTo">{callDetails.to}</span> tried to
                    call <span className="callFrom">{callDetails.from}</span>,
                    but left a{' '}
                    <span className="answeredStatus">
                      {callDetails.call_type}
                    </span>
                    .
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
