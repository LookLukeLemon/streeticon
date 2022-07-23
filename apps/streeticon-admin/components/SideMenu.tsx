import Link from "next/link";

const SideMenu = () => {
  return (
    <aside className="sm:w-64 min-h-screen" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3  rounded bg-[#1E2A3B]">
        <ul className="space-y-2">
          <li>
            <Link href="/store/dashboard">
              <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg text-white  hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>

                <span className="ml-3 hidden flex-1 sm:block">대시보드</span>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/store/gifticon/management">
              <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="hidden sm:block flex-1 ml-3 whitespace-nowrap">
                  기프티콘
                </span>
                {/* <span className="hidden sm:block justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  14
                </span> */}
              </div>
            </Link>
          </li>

          <li>
            <Link href="/store/my-page">
              <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="hidden sm:block flex-1 ml-3 whitespace-nowrap">
                  내 정보
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
