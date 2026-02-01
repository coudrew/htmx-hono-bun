interface LayoutProps {
  title?: string;
  children: any;
}

export const Layout = ({ title = 'HTMX + Hono + Bun', children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            background: #f4f4f4;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          button {
            background: #007cba;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
          }
          button:hover {
            background: #005a87;
          }
          .loading {
            opacity: 0.6;
          }
          .fade-in {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .htmx-indicator {
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .htmx-request .htmx-indicator {
            opacity: 1;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
};
