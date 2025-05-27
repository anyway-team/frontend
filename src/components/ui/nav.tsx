/**
 * @description 상단 네비게이션 바
 */
import Image from 'next/image';
import Link from 'next/link';

export const Nav = () => {
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
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingRight: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 64,
              alignItems: 'center',
            }}
          >
            <Link href="/">
              <Image
                src="/newbee.png"
                width={100}
                height={100}
                alt="로고"
                style={{ objectFit: 'contain', marginBottom: 24, marginTop: 24 }}
              />
            </Link>
          </div>
        </div>
      </nav>
      <div style={{ height: 76 }} />
    </>
  );
};
