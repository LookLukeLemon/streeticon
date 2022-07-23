import {
  STORE_ACTION_SIGNIN,
  STORE_NAME,
  STORE_PASSWORD,
  STORE_SIGNIN,
} from "common/Constants";
import useSignIn from "./useSignIn";
import useSignInApi from "./useSignInApi";

const SignIn = () => {
  const { name, password, onChange } = useSignIn();
  const { onSubmit } = useSignInApi();

  return (
    <div className="p-4 md:p-8 lg:p-16 flex flex-col gap-8 h-full w-full">
      <h2 className="flex items-center gap-4 text-xl">
        <span className="flex h-4 w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full left-1 top-1 h-2 w-2 bg-sky-500"></span>
        </span>
        {STORE_SIGNIN}
      </h2>

      <div className="flex w-full h-fit">
        <form
          className="flex flex-col w-full rounded-xl text-white bg-[#1E2A3B] divide-y divide-slate-700/90"
          method="post"
          encType="multipart/form-data"
          onSubmit={(e) => onSubmit({ e, name, password })}
        >
          <div className="flex gap-8 h-full">
            <h5 className="h-full hidden sm:block w-32 p-4 px-8">
              {STORE_NAME}
            </h5>
            <input
              className="bg-transparent flex-1 truncate  p-4 h-full outline-none placeholder:text-gray-600"
              placeholder={STORE_NAME}
              onChange={(e) => onChange(e, "name")}
            />
          </div>
          <div className="flex gap-8 h-full">
            <h5 className="h-full hidden sm:block w-32 p-4 px-8">
              {STORE_PASSWORD}
            </h5>
            <input
              className="bg-transparent flex-1 p-4 h-full outline-none placeholder:text-gray-600"
              type="password"
              placeholder="비밀번호"
              onChange={(e) => onChange(e, "password")}
            />
          </div>

          <div className="flex justify-end">
            <button className="btn--primary btn m-8">
              {STORE_ACTION_SIGNIN}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
