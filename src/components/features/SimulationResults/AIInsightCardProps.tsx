import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { InputMessage } from '@/components/chatGemini/inputMensage'
import { Message } from '@/components/chatGemini/Message'
import { Divider } from '@/components/shared/Divider'
import { useConversation } from '@/hooks/useConversation'
import { useInsight } from '@/hooks/useInsight'

import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)
  const {
    messages,
    isLoadingConversation: isConversationLoading,
    sendMessage,
  } = useConversation(simulationId)

  const [question, setQuestion] = useState('')
  const conversationRef = useRef<HTMLDivElement>(null)
  const initialMessageCount = useRef(messages.length)
  const hasInitializedScroll = useRef(false)

useEffect(() => {
  if (
    insight &&
    conversationRef.current &&
    !hasInitializedScroll.current
  ) {
    requestAnimationFrame(() => {
      if (conversationRef.current) {
        conversationRef.current.scrollTop =
          conversationRef.current.scrollHeight
        hasInitializedScroll.current = true
      }
    })
  }
}, [insight])

useEffect(() => {
  const lastMessage = messages[messages.length - 1]

  if (
    messages.length > initialMessageCount.current &&
    lastMessage?.from === 'ia'
  ) {
    requestAnimationFrame(() => {
      conversationRef.current?.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: 'smooth',
      })
    })
  }
}, [messages])

  async function handleQuestionSubmit(message: string) {
    setQuestion('')
    await sendMessage(message)
  }
  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}
      {!isLoading && insight && !error && (
        <>
          <Content insight={insight} />
          <Divider orientation="horizontal" spacing={30} />
          <div
            ref={conversationRef}
            className="lg:max-h-93 lg:scrollbar-thin lg:[scrollbar-color:var(--border)_transparent] lg:overflow-y-auto lg:pr-2"
          >
            {messages.map(({ id, from, text }) => (
              <div key={id}>
                <Message from={from} text={text} />
                <Divider orientation="horizontal" spacing={30} />
              </div>
            ))}
          </div>
          {isConversationLoading && <p>Carregando</p>}
          <InputMessage
            value={question}
            onChange={setQuestion}
            onSubmit={handleQuestionSubmit}
            isLoading={isConversationLoading}
          />
        </>
      )}
    </div>
  )
}
