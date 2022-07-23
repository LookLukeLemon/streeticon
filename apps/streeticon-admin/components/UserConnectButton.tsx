import { STORE_ACTION_SIGN_OUT, STORE_ACTION_SIGNIN } from "common/Constants";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Link from "next/link";
import { useRouter } from "next/router";

const UserConnectButton = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await axiosPrivate.get("/api/auth/store/sign-out");
      router.replace("/store/sign-in");
    } catch (err) {
      router.replace("/");
    } finally {
      setAuth(null);
    }
  };

  return auth?.accessToken ? (
    <button
      className="flex items-center btn btn--primary"
      onClick={handleSignOut}
    >
      {STORE_ACTION_SIGN_OUT}
    </button>
  ) : (
    <Link href="/store/sign-in">
      <a className="flex items-center btn btn--primary">
        {STORE_ACTION_SIGNIN}
      </a>
    </Link>
  );
};

export default UserConnectButton;
