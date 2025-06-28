const Highlight = ({ children, color = 'green' }) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      padding: '0.2rem',
    }}
  >
    {children}
  </span>
);

export default Highlight;