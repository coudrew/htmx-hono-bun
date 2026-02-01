interface DynamicContentProps {
  fact: string;
  timestamp: string;
}

export const DynamicContent = ({ fact, timestamp }: DynamicContentProps) => {
  return (
    <div class="fade-in">
      <h3>Dynamic Fact</h3>
      <p>{fact}</p>
      <small>Generated at: {timestamp}</small>
    </div>
  );
};
