import React from 'react';

const KVRow = ({ label, children }) => {
  return (
    <div className="kv-row">
      <div className="kv-label"><strong>{label}</strong></div>
      <div className="kv-value">{children}</div>
    </div>
  );
};

export default KVRow;
