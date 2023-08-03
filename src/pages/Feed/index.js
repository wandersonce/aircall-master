import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { HiArchive } from 'react-icons/hi';

import './style.css';
import FeedCalls from '../../components/FeedCalls';

export default function Feed() {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await api.get('activities').then((res) => {
        setIsLoading(false);
        setCalls(res.data);
      });
    })();
  }, []);

  async function archiveAllCalls(calls) {
    await calls.map((data) => {
      const result = api
        .patch('activities/' + data.id, {
          is_archived: true,
        })
        .then(() => {
          window.location.reload(false);
        });
    });
  }

  return (
    <div>
      <button
        onClick={() => archiveAllCalls(calls)}
        className="archiveCallsBtn"
      >
        <HiArchive />
        Archive all calls
      </button>
      {isLoading ? <div>Loading..</div> : <FeedCalls calls={calls} />}
    </div>
  );
}
