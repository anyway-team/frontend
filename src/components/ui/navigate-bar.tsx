'use client';
interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}
export const NavigateBar = ({ left, right }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        background: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      {left}
      {right}
    </div>
  );
};
