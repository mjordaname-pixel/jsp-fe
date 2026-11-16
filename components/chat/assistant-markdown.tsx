import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="min-w-0 break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h1: ({ children }) => (
            <h2 className="mt-5 mb-2 text-lg font-bold leading-7 text-slate-950 first:mt-0">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-2 text-base font-bold leading-6 text-slate-950 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 font-bold leading-6 text-slate-900 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 mb-1 font-semibold text-slate-900 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-2 leading-6 first:mt-0 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-3 list-disc space-y-1.5 pl-5 marker:text-blue-600">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-blue-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1 leading-6">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-950">{children}</strong>
          ),
          em: ({ children }) => <em className="text-slate-700">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-4 border-blue-300 bg-white/70 py-2 pr-3 pl-4 text-slate-700">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const external = Boolean(href && /^https?:\/\//i.test(href));
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900"
              >
                {children}
              </a>
            );
          },
          code: ({ children, className }) => (
            <code
              className={`${className ?? ""} rounded bg-blue-100 px-1.5 py-0.5 font-mono text-[0.85em] text-blue-950`}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-5 text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-5 border-blue-200" />,
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg border border-blue-200 bg-white">
              <table className="w-full border-collapse text-left text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-blue-200 bg-blue-100 px-3 py-2 font-semibold text-slate-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-blue-100 px-3 py-2 align-top text-slate-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
