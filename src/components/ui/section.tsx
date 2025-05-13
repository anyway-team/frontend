interface Props {
  title: string;
  action: React.ReactNode;
  children: React.ReactNode;
}

export const Section = ({ title, action, children }: Props) => {
  return (
    <section className="px-4 py-8">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
};
