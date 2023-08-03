import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiArchive, HiOutlineX } from 'react-icons/hi';

import api from '../../services/api';
import './styles.css';
import SummaryGrid from '../../components/SummaryGrid';

export default function CallDetail() {
  const { slug } = useParams();
  const [callDetails, setCallDetails] = useState([]);
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    (async () => {
      const res = api.get('activities/' + slug).then((res) => {
        setIsArchived(res.data.is_archived);
        setCallDetails(res.data);
      });
    })();
  }, []);

  function handdleArchive(callId, flag) {
    (async () => {
      const res = api
        .patch('activities/' + callId, { is_archived: `${flag}` })
        .then((res) => {
          window.location.reload(false);
        });
    })();
  }

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

                {callDetails.call_type === 'voicemail' && (
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
            <SummaryGrid callDetails={callDetails} />

            <div className="archiveBtnWrapper">
              {!isArchived ? (
                <button
                  onClick={() => handdleArchive(callDetails.id, true)}
                  className="archiveBtn"
                >
                  <HiArchive />
                  Archive Call
                </button>
              ) : (
                <button
                  onClick={() => handdleArchive(callDetails.id, false)}
                  className="removeArchiveBtn"
                >
                  <HiOutlineX />
                  Remove from Archive
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
