import { STORE_DASHBOARD } from "common/Constants";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  useDashboard();
  return (
    <div className="p-4 md:p-8 lg:p-16 flex flex-col gap-8 h-full w-full">
      <div className="flex items-center gap-4 text-xl">
        <span className="flex h-4 w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full left-1 top-1 h-2 w-2 bg-sky-500"></span>
        </span>
        <h2 className="flex-1 truncate">{STORE_DASHBOARD}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
