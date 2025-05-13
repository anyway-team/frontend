/** 
 * @description 상단 네비게이션 바
 */
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">뉴비</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
