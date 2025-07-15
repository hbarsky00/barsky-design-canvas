import React from "react";

function AppFresh() {
  console.log("🚀 AppFresh component loading - completely new file");
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Direct Render Test
        </h1>
        <p className="text-lg text-gray-600">
          Testing without any providers or components
        </p>
      </div>
    </div>
  );
}

export default AppFresh;
