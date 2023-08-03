import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function SummaryGrid(resCallDetails) {
  const [callDetails, setCallDetails] = useState([]);

  useEffect(() => {
    setCallDetails(resCallDetails.callDetails);
  }, [resCallDetails]);

  return (
    <div className="summaryWrapper">
      <h3>Summary</h3>
      <div className="summaryGrid">
        <div>Call Direction:</div>
        <div>{callDetails.direction}</div>

        <div>From:</div>
        <div>{callDetails.from}</div>

        <div>To:</div>
        <div>{callDetails.to}</div>

        <div>Via:</div>
        <div>{callDetails.via}</div>

        <div>Call Type:</div>
        <div>{callDetails.call_type}</div>

        <div>Duration:</div>
        <div>{callDetails.duration}</div>

        <div>Call Date:</div>
        <div>{dayjs(callDetails.created_at).format('YYYY-MM-DD')}</div>

        <div>Call Time:</div>
        <div>{dayjs(callDetails.created_at).format('H:M A')}</div>
      </div>
    </div>
  );
}
