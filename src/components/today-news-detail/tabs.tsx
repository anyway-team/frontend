import { Tabs as RadixTabs } from '@radix-ui/themes';

export const Tabs = () => {
  return (
    <RadixTabs.Root defaultValue="Political">
      <RadixTabs.List size="2" color="gray" style={{ margin: '0 24px', display: 'flex' }}>
        <RadixTabs.Trigger
          value="Political"
          style={{
            flex: 1,
          }}
        >
          정치성향
        </RadixTabs.Trigger>
        <RadixTabs.Trigger
          value="AI Summary"
          style={{
            flex: 1,
          }}
        >
          AI 요약
        </RadixTabs.Trigger>
        <RadixTabs.Trigger
          value="Reaction"
          style={{
            flex: 1,
          }}
        >
          반응
        </RadixTabs.Trigger>
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};
