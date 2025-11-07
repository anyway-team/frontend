/**
 * @description 상단 네비게이션 바
 */
import Image from 'next/image';
import Link from 'next/link';

export const HomeNav = () => {
  return (
    <>
      <nav
        style={{
          background: '#fff',
          width: '100%',
          paddingTop: 16,
          paddingBottom: 16,
          position: 'fixed',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: 840, paddingRight: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 40,
              alignItems: 'center',
            }}
          >
            <Link href="/">
              <Image
                src="/newbee.png"
                width={60}
                height={40}
                alt="로고"
                style={{ objectFit: 'contain', marginBottom: 10, marginTop: 10 }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
