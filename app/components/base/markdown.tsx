import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierHeathLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Image from 'next/image'
import { useState } from 'react'

type IMarkdownPart =
  | { type: 'text'; content: string }
  | { type: 'image'; alt: string; url: string }

type MarkdownPartsArray = IMarkdownPart[]

const separateImagesAndContent = (content: string): MarkdownPartsArray => {
  const markdownText = content.replace(/!/g, '');
  // Regex to match markdown image links
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s]*)?)\)/gi

  // Split the text into parts
  const parts: MarkdownPartsArray = []
  let lastIndex = 0

  let match
  while ((match = regex.exec(markdownText)) !== null) {
    // Push any text before the image link
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: markdownText.slice(lastIndex, match.index).trim(),
      })
    }

    // Push the image link
    parts.push({
      type: 'image',
      alt: match[1],
      url: match[2],
    })

    // Update lastIndex to the end of the current match
    lastIndex = regex.lastIndex
  }

  // Push any remaining text after the last image link
  if (lastIndex < markdownText.length) {
    parts.push({
      type: 'text',
      content: markdownText.slice(lastIndex).trim(),
    })
  }

  return parts
}

const ImagePart = ({ alt, url }: { alt: string; url: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <Image
        src={url}
        alt={alt}
        width={300}
        height={-1}
        className="rounded-md cursor-pointer"
        onClick={openModal}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white text-3xl font-bold bg-transparent border-none"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative p-4">

            {/* Centered image */}
            <Image src={url} alt={alt} width={700} height={-1} className="rounded-md" />
          </div>
        </div>
      )}
    </>
  )
}

const MarkdownPart = ({ content }: { content: string }) => {
  return <ReactMarkdown
    remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
    rehypePlugins={[
      RehypeKatex,
    ]}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return (!inline && match)
          ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={atelierHeathLight}
              language={match[1]}
              showLineNumbers
              PreTag="div"
            />
          )
          : (
            <code {...props} className={className}>
              {children}
            </code>
          )
      },
    }}
    linkTarget={'_blank'}
  >
    {content}
  </ReactMarkdown>
}

export function Markdown(props: { content: string }) {
  const markdownParts = separateImagesAndContent(props.content)

  const renderMarkdownPart = (part: IMarkdownPart) => {
    if (part.type === 'text')
      return <MarkdownPart content={part.content} />

    else if (part.type === 'image')
      return <ImagePart url={part.url} alt={part.alt} />
  }

  return (
    <div className="markdown-body">
      {markdownParts.map((part, index) => renderMarkdownPart(part))}
    </div>
  )
}
