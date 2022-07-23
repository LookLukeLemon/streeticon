import useProfile from "hooks/useProfile";

const useDashboard = () => {
  const { data: profile } = useProfile();
};

export default useDashboard;
