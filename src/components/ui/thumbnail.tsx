import Image from 'next/image';

export const Thumbnail = ({ url }: { url: string }) => {
  return (
    <div style={{ width: '100%', height: 300, position: 'relative' }}>
      <Image src={url} alt="thumbnail" fill style={{ objectFit: 'cover' }} />
    </div>
  );
};
