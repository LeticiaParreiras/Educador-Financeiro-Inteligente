import { useState } from 'react'

import { buildConversationPrompt } from '@/data/aiPrompt'
import type { ChatMessage } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { getConversationResponse } from '@/services/aiService'

export function useConversation(simulationId: string) {
  const { getFormData, updateSimulation } = useSimulationStorage()

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return getFormData(simulationId)?.conversation ?? []
  })
  const [isLoadingConversation, setIsLoadingConversation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendMessage(question: string) {
    const simulation = getFormData(simulationId)
    const trimmedQuestion = question.trim()

    if (!simulation || !trimmedQuestion || isLoadingConversation) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      from: 'user',
      text: trimmedQuestion,
    }

    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setIsLoadingConversation(true)
    setError(null)

    updateSimulation(simulationId, {
      ...simulation,
      conversation: updatedMessages,
    })

    try {
      const prompt = buildConversationPrompt(
        simulation,
        updatedMessages,
        trimmedQuestion,
      )

      const response = await getConversationResponse(prompt)

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        from: 'ia',
        text: response,
      }

      const conversation = [...updatedMessages, assistantMessage]

      setMessages(conversation)

      updateSimulation(simulationId, {
        ...simulation,
        conversation,
      })
    } catch {
      setError('Não foi possível obter uma resposta. Tente novamente.')
    } finally {
      setIsLoadingConversation(false)
    }
  }

  return {
    messages,
    isLoadingConversation,
    error,
    sendMessage,
  }
}