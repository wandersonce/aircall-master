import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';

import {
  HiOutlineMicrophone,
  HiPhoneIncoming,
  HiPhoneMissedCall,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function FeedCalls(calls) {
  const [allCalls, setAllCalls] = useState([]);
  const [isAllArchived, setIsAllArchived] = useState(false);

  const ElementRef = useRef(null);

  useEffect(() => {
    setAllCalls(calls.calls);

    const checkDivs = setTimeout(function () {
      const Elementcount = ElementRef.current.childNodes.length;
      Elementcount == 0 && setIsAllArchived(true);
    }, 500);
  }, [calls]);

  return (
    <div className="callContainer" ref={ElementRef}>
      {allCalls.map(
        (call) =>
          call.from &&
          !call.is_archived && (
            <Link to={`/call/${call.id}`} key={call.id} className="callWrapper">
              {call.call_type === 'missed' && (
                <div>
                  <div className="iconWrapper">
                    <HiPhoneMissedCall />
                  </div>
                  {call.direction === 'outbound' ? (
                    <div className="numberWrapper">
                      <div className="calledFrom">{call.from}</div>
                      <div>Tried to reach {call.to}</div>
                    </div>
                  ) : (
                    <div className="numberWrapper">
                      <div className="calledFrom">{call.from}</div>
                      <div>Lost a call from {call.to}</div>
                    </div>
                  )}

                  <div className="timeWrapper">
                    {dayjs(call.created_at).format('H:M-A')}
                  </div>
                </div>
              )}

              {call.call_type == 'answered' && (
                <div>
                  <div className="iconWrapper">
                    <HiPhoneIncoming />
                  </div>
                  <div className="numberWrapper">
                    {call.direction === 'outbound' ? (
                      <div className="numberWrapper">
                        <div className="calledFrom">{call.from}</div>
                        <div>Received a call from {call.to}</div>
                      </div>
                    ) : (
                      <div className="numberWrapper">
                        <div className="calledFrom">{call.from}</div>
                        <div>Called {call.to}</div>
                      </div>
                    )}
                  </div>
                  <div className="timeWrapper">
                    {dayjs(call.created_at).format('H:M-A')}
                  </div>
                </div>
              )}

              {call.call_type == 'voicemail' && (
                <div>
                  <div className="iconWrapper">
                    <HiOutlineMicrophone />
                  </div>
                  <div className="numberWrapper">
                    {call.direction === 'outbound' ? (
                      <div className="numberWrapper">
                        <div className="calledFrom">{call.from}</div>
                        <div>Left a voicemail to {call.to}</div>
                      </div>
                    ) : (
                      <div className="numberWrapper">
                        <div className="calledFrom">{call.from}</div>
                        <div>Received a voicemail from {call.to}</div>
                      </div>
                    )}
                  </div>
                  <div className="timeWrapper">
                    {dayjs(call.created_at).format('H:M-A')}
                  </div>
                </div>
              )}
            </Link>
          )
      )}

      {isAllArchived && (
        <div className="allCallsArchived">All Calls Are Archived</div>
      )}
    </div>
  );
}
