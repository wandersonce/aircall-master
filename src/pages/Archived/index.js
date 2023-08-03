import React, { useEffect, useState } from 'react';
import {
  HiOutlineX,
  HiOutlineMicrophone,
  HiPhoneIncoming,
  HiPhoneMissedCall,
} from 'react-icons/hi';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Archived() {
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [anyArchived, setAnyArchived] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.get('activities').then((res) => {
        setArchivedCalls(res.data);
        checkArchivedQty(res.data);
      });
    })();
  }, []);

  function checkArchivedQty(data) {
    data.map((archive) => {
      archive.is_archived == true && setAnyArchived(true);
    });
  }

  function handdleRemoveArchived() {
    (async () => {
      const res = await api.patch('reset').then((res) => {
        window.location.reload(false);
      });
    })();
  }

  return (
    <div>
      {anyArchived ? (
        <button
          onClick={() => handdleRemoveArchived()}
          className="removeArchiveCallsBtn"
        >
          <HiOutlineX />
          Remove All From Archive
        </button>
      ) : (
        <div className="noArchivedCalls">
          <h3>No Calls Archived</h3>
        </div>
      )}

      <div className="archivedCallsContainer">
        {archivedCalls.map(
          (archivedCall) =>
            archivedCall.is_archived && (
              <Link
                to={`/call/${archivedCall.id}`}
                key={archivedCall.id}
                className="callWrapper"
              >
                {archivedCall.call_type === 'missed' && (
                  <div>
                    <div className="iconWrapper">
                      <HiPhoneMissedCall />
                    </div>
                    {archivedCall.direction === 'outbound' ? (
                      <div className="numberWrapper">
                        <div className="calledFrom">{archivedCall.from}</div>
                        <div>Tried to reach {archivedCall.to}</div>
                      </div>
                    ) : (
                      <div className="numberWrapper">
                        <div className="calledFrom">{archivedCall.from}</div>
                        <div>Lost a call from {archivedCall.to}</div>
                      </div>
                    )}

                    <div className="timeWrapper">
                      {dayjs(archivedCall.created_at).format('H:M-A')}
                    </div>
                  </div>
                )}

                {archivedCall.call_type == 'answered' && (
                  <div>
                    <div className="iconWrapper">
                      <HiPhoneIncoming />
                    </div>
                    <div className="numberWrapper">
                      {archivedCall.direction === 'outbound' ? (
                        <div className="numberWrapper">
                          <div className="calledFrom">{archivedCall.from}</div>
                          <div>Received a call from {archivedCall.to}</div>
                        </div>
                      ) : (
                        <div className="numberWrapper">
                          <div className="calledFrom">{archivedCall.from}</div>
                          <div>Called {archivedCall.to}</div>
                        </div>
                      )}
                    </div>
                    <div className="timeWrapper">
                      {dayjs(archivedCall.created_at).format('H:M-A')}
                    </div>
                  </div>
                )}

                {archivedCall.call_type == 'voicemail' && (
                  <div>
                    <div className="iconWrapper">
                      <HiOutlineMicrophone />
                    </div>
                    <div className="numberWrapper">
                      {archivedCall.direction === 'outbound' ? (
                        <div className="numberWrapper">
                          <div className="calledFrom">{archivedCall.from}</div>
                          <div>Left a voicemail to {archivedCall.to}</div>
                        </div>
                      ) : (
                        <div className="numberWrapper">
                          <div className="calledFrom">{archivedCall.from}</div>
                          <div>Received a voicemail from {archivedCall.to}</div>
                        </div>
                      )}
                    </div>
                    <div className="timeWrapper">
                      {dayjs(archivedCall.created_at).format('H:M-A')}
                    </div>
                  </div>
                )}
              </Link>
            )
        )}
      </div>
    </div>
  );
}
