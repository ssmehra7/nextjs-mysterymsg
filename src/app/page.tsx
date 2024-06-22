'use client'

import { NEXT_AUTH } from "@/lib/nextauth";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const [toggle, settoggle] = useState(false);
  const [bgColor, setbgColor] = useState('bg-black');

  const handleToggle = async () => {
    const newToggle = !toggle;
    settoggle(newToggle);

    try {
      await axios.put('/api/verified', {
        toggle: newToggle
      });

      if (newToggle) {
        setbgColor('bg-green-500');
      } else {
        setbgColor('bg-black');
      }
    } catch (error) {
      console.error('Error updating toggle state', error);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <button onClick={() => signOut()} className="bg-black text-white rounded-xl w-fit px-4">
        Sign Out
      </button>
      <div className="w-fit h-1/2 rounded-lg bg-slate-400 p-4">
        {JSON.stringify(session?.user)}
      </div>
      <button className={`${bgColor} text-white`} onClick={handleToggle}>
        Toggle
      </button>
    </div>
  );
}
