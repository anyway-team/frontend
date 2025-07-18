import { Text } from '@radix-ui/themes/components/callout';
import { Spacing } from '../ui/spacing';
import Image from 'next/image';

export interface ReactionItemProps {
  isPositive: boolean;
  description: string;
  underline?: boolean;
}

interface ReactionSectionProps {
  items: ReactionItemProps[];
}

const ThumbsUp = ({ size = 48 }: { size?: number }) => {
  return (
    <Image
      src="/thumbs-up.svg"
      alt="thumbs up"
      width={size}
      height={size}
      style={{ cursor: 'pointer' }}
    />
  );
};

const ThumbsDown = ({ size = 48 }: { size?: number }) => {
  return (
    <Image
      src="/thumbs-down.svg"
      alt="thumbs down"
      width={size}
      height={size}
      style={{ cursor: 'pointer' }}
    />
  );
};

const ReactionItem = ({ isPositive, description, underline }: ReactionItemProps) => {
  return (
    <section
      style={{
        margin: '16px',
        paddingBottom: '16px',
        borderBottom: underline ? '1px solid #e0e0e0' : 'none',
      }}
    >
      {isPositive ? <ThumbsUp /> : <ThumbsDown />}
      <Spacing size={16} />
      <Text>{description}</Text>
    </section>
  );
};

export const ReactionSection = ({ items }: ReactionSectionProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <ReactionItem key={index} {...item} underline={index !== items.length - 1} />
      ))}
    </div>
  );
};
