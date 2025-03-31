import React from "react";
import { Skeleton } from "antd";

const LoadingSkeleton: React.FC = () => {
  const skeletonItems = Array(4).fill({});
  
  return (
    <div style={{ height: "40dvh", borderRadius: "10px", padding: "10px" }}>
      {skeletonItems.map((_, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <Skeleton avatar paragraph={{ rows: 1 }} active />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;