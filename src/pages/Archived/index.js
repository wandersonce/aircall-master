import React, { useEffect, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import api from '../../services/api';

export default function Archived() {
  const [archivedCalls, setArchivedCalls] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get('activities').then((res) => {
        setArchivedCalls(res.data);
      });
    })();
  }, []);

  function handdleRemoveArchived() {
    (async () => {
      const res = await api.patch('reset').then((res) => {
        window.location.reload(false);
      });
    })();
  }

  return (
    <div>
      <button onClick={() => handdleRemoveArchived()} className="">
        <HiOutlineX />
        Remove All From Archive
      </button>
    </div>
  );
}
