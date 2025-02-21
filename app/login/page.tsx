import Form from "./form"

import "@/app/globals.css";

export const dynamic = "force-dynamic";

export default async function Login() {

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 py-[120px] px-[20px] gap-4">
    //   <div className="cols-span-1">
    //     <img src="/profile/profile_full.png" />
    //   </div>
    //   <div className="flex justify-center cols-span-1">
    //     <Form></Form>
    //   </div>
    // </div>

    <div className="flex items-center justify-center w-full py-[120px] px-[20px] gap-4">
      <Form></Form>
    </div>
  );
}
