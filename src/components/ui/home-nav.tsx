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

          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          padding: '16px 24px',
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
