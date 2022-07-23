import Dashboard from "components/store/dashboard/Dashboard";
import PersistLogin from "components/PersistLogin";
import LoadingSpinner from "components/common/LoadingSpinner";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <PersistLogin>
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full">
            <LoadingSpinner />
          </div>
        }
      >
        <Dashboard />
      </Suspense>
    </PersistLogin>
  );
};

export default DashboardPage;
