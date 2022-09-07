export type ShowProps = React.PropsWithChildren<{
  on: boolean;
}>;

export const Show = ({ children, on }: ShowProps) => {
  if (on) return <>{children}</>;
  return null;
};
