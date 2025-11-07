'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const BottomNavigateBar = () => {
  const router = useRouter();

  return (
    <ul
      style={{
        width: '90%',
        height: 74,
        background: 'rgba(255,255,255,0.8)',
        position: 'fixed',
        bottom: 0,
        zIndex: 100,
        marginBottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 36,
        paddingRight: 36,
        border: '1px solid #e5e7eb',
        borderRadius: '36px',
        flexDirection: 'row',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      }}
    >
      <BottomNavigateBarItem icon="/home.png" label="홈" onClick={() => router.push('/home')} />
      <BottomNavigateBarItem
        icon="/premium.png"
        label="프리미엄"
        onClick={() => router.push('/premium')}
      />
      <BottomNavigateBarItem icon="/my.png" label="마이" onClick={() => router.push('/my')} />
    </ul>
  );
};

const BottomNavigateBarItem = ({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <li
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
    >
      <Image src={icon} alt={label} width={20} height={20} />
      <span
        style={{
          paddingTop: 4,
          fontSize: 12,
        }}
      >
        {label}
      </span>
    </li>
  );
};
