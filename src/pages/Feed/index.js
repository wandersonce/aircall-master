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
      const res = api.get('activities').then((res) => {
        setIsLoading(false);
        setCalls(res.data);
      });
    })();
  }, []);

  return (
    <div>
      <button className="archiveCallsBtn">
        <HiArchive />
        Archive all calls
      </button>
      {isLoading ? <div>Loading..</div> : <FeedCalls calls={calls} />}
    </div>
  );
}
