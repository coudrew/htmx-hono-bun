interface ClickResultProps {
  count: number;
}

export const ClickResult = ({ count }: ClickResultProps) => {
  return <p class="fade-in">Clicks: {count}</p>;
};
