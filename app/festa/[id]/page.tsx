"use client";

import { useRouter } from "next/router";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <div>
      <h1>test</h1>
      <h1>{router.query.slug}</h1>
    </div>
  );
}

export default page;
