// /api/data-to-bd-p9x9 - same as old shareDataController.dataPage
// (rendered as a page, list of forms that post to desi.p9x9.com backend)
// First 10 only + infinite scroll + search (no full-DB dump)
import { Suspense } from "react";
import AdminListLoader from "@/components/AdminListLoader";
import AdminListSkeleton from "@/components/AdminListSkeleton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Data Forms"
};

export default async function DataToBdP9x9Page() {
  return (
    <div className="all-data-body">
      <h2>Data To Desi.P9X9</h2>
      <Suspense fallback={<AdminListSkeleton />}>
        <AdminListLoader apiUrl="/api/admin/posts" type="desi" />
      </Suspense>
    </div>
  );
}