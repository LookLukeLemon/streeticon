import PersistLogin from "components/PersistLogin";
import GifticonManagement from "components/store/gifticon/management/GifticonManagement";

const GifticonManagementPage = () => {
  return (
    <PersistLogin>
      <GifticonManagement />
    </PersistLogin>
  );
};

export default GifticonManagementPage;
