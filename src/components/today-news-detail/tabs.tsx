import { Tabs as RadixTabs } from '@radix-ui/themes';
import { atom, useAtom } from 'jotai';

interface Props {
  value: TabsValue;
  onChange: (value: TabsValue) => void;
}

export const Tabs = ({ value, onChange }: Props) => {
  return (
    <RadixTabs.Root
      defaultValue={value}
      onValueChange={(value) => onChange(value as TabsValue)}
      value={value}
    >
      <RadixTabs.List size="2" color="gray" style={{ margin: '0 24px', display: 'flex' }}>
        {Object.entries(TabsValue).map(([key, value]) => (
          <RadixTabs.Trigger
            key={key}
            value={key}
            style={{
              flex: 1,
              cursor: 'pointer',
            }}
          >
            {value}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};

const tabAtom = atom<TabsValue>('ai-summary');
export const useTab = () => {
  const [tab, setTab] = useAtom(tabAtom);
  return { tab, setTab };
};

export const TabsValue = {
  political: '정치성향',
  'ai-summary': 'AI 요약',
  reaction: '반응',
} as const;

export type TabsValue = keyof typeof TabsValue;
