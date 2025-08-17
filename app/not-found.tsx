import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-2">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="text-muted-foreground font-semibold text-2xl ">
        Page Not Found
      </p>
      <Link
        className="underline text-teal-500 hover:text-teal-600 text-xl transition ease-in-out duration-100 "
        href={"/"}
      >
        Go back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
