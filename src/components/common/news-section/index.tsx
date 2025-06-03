import { Tabs, useTab } from '@/components/today-news-detail/tabs';
import { Thumbnail } from '@/components/ui/thumbnail';
import { Avatar, Flex, Text } from '@radix-ui/themes';

interface Props {
  title: string;
  source: string;
  time: string;
  content: React.ReactNode;
}

export const NewsSection = ({ title, source, time, content }: Props) => {
  const { tab, setTab } = useTab();
  return (
    <>
      <Thumbnail url="/sample2.webp" />
      <div style={{ padding: '12px 24px' }}>
        <Text size="5" weight="bold" style={{ marginTop: 16 }}>
          {title}
        </Text>
      </div>
      <Flex gap="4" align="center" justify="between" style={{ margin: '12px 24px' }}>
        <Flex gap="2" align="center">
          <Avatar radius="full" fallback="중" />
          <Text size="2" weight="bold">
            {source}
          </Text>
        </Flex>
        <Text size="2" color="gray">
          {time}
        </Text>
      </Flex>
      <Tabs value={tab} onChange={setTab} />
      {content}
    </>
  );
};
