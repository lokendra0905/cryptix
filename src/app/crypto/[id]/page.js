"use client";
import { Crypto } from "@/pages/cypto";
import { Dashboard } from "@/pages/dashboard";

export default function Page({ params }) {
  return <Crypto id={params.id} />;
}
