export function Heart({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 4.5 6.3 4.5c2.2 0 3.8 1.3 5.7 3.5 1.9-2.2 3.5-3.5 5.7-3.5 3.7 0 5.4 3.9 3.9 7.3C19.5 16.4 12 21 12 21Z"
      />
    </svg>
  );
}

export function Lock({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9h-2Zm-8-2a3 3 0 0 1 6 0v2H9V7Z"
      />
    </svg>
  );
}
