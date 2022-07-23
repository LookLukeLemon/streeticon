import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-8 bg-[#1E2A3B]">
      <div className="flex justify-end">
        <Link href="/store/sign-up">
          <a className="btn btn--secondary flex items-center">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            신규 등록
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
