import React from "react";

export default function UserProfile({ email, username }) {
  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-center flex-col cursor-pointer rounded-full">
          <img
            src="https://readymadeui.com/team-1.webp"
            className="w-14 h-14 rounded-full"
          />
          <h4 className="text-base text-[#333] font-bold mt-3">John Doe</h4>
          <p className="text-xs text-gray-500 mt-1">{email}</p>
        </div>
      </div>
    </>
  );
}
