export default function ConfigurableGridBackground({ children, className }) {
  return (
    <div
      className={` bg-white ${className}`}
      style={{
        "--grid-color": "#EDF0F3",
        "--grid-size": "24px",
        "--grid-line-width": "1px",
        backgroundImage: `
          linear-gradient(to right, var(--grid-color) var(--grid-line-width), transparent var(--grid-line-width)),
          linear-gradient(to bottom, var(--grid-color) var(--grid-line-width), transparent var(--grid-line-width))
        `,
        backgroundSize: "var(--grid-size) var(--grid-size)",
      }}
    >
      {/* Your content goes here */}
      {children}
    </div>
  );
}
