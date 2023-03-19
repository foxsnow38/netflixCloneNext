import React from "react";
import { signOut } from "next-auth/react";
interface AccountMenuProps {
  visible?: boolean;
}

export default function AccountMenu({ visible = false }: AccountMenuProps) {
  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 border-2 border-gray-800 flex-col ">
      <div className="flex flex-col gap-3">
        <div className=" px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src="/images/default-blue.png"
            className="w-8 h-8 rounded-md"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline">
            UserName
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />

        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline "
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
}
