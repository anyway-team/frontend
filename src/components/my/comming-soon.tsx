import { Text } from '@radix-ui/themes';

export const CommingSoon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        backgroundColor: '#f6f6f6',
        borderRadius: '10px',
        padding: '20px',
        marginTop: '20px',
        color: '#898989',
      }}
    >
      <Text>회원만을 위한 다양한 서비스를 준비중이에요!</Text>
    </div>
  );
};
