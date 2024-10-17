import React, { Suspense } from "react";
import BodyDoublingApp from "@/components/BodyDoubling";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BodyDoublingApp />
    </Suspense>
  );
}
