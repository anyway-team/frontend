export const Tooltip = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '90%',
        margin: '0 auto',
        marginTop: 20,
        marginBottom: 40,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '10px',
          borderRadius: '12px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        {text}
      </div>
      {/* 아래 세모 꼬리 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '100%',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #fff',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
        }}
      />
    </div>
  );
};
