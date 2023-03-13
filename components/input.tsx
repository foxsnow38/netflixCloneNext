import React from "react";

type inputProps = {
  id: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type?: string;
};

export const Input: React.FC<inputProps> = ({
  id,
  onchange,
  value,
  label,
  type = "text",
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-base text-white bg-neutral-500 appearance-none focus:outline-none
      focus:ring-0 peer"
        onChange={onchange}
        value={value}
        placeholder=" "
        type={type}
      />

      <label
        className="absolute text-base
        top-4
         text-zinc-50
          duration-150
           transform
         -translate-y-3
          scale-75
           z-10
            origin-[0]
             left-6
              peer-placeholder-shown:scale-100 
         peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
            peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
