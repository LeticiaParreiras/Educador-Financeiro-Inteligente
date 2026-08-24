import type { ChangeEvent } from 'react'
import { Send } from 'lucide-react'

import { Button } from '../shared/Button'
import { Input } from '../shared/Input'

interface InputMessageProps {
  value: string
  isLoading?: boolean
  onChange: (value: string) => void
  onSubmit: (message: string) => void
}

export function InputMessage({
  value,
  isLoading = false,
  onChange,
  onSubmit,
}: InputMessageProps) {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const message = value.trim()

    if (!message || isLoading) {
      return
    }

    onSubmit(message)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full justify-between gap-2"
    >
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Pergunte algo para a IA"
        disabled={isLoading}
        className="w-full"
      />

      <Button
        type="submit"
        variant="rounded"
        icon={Send}
        disabled={isLoading || !value.trim()}
        aria-label="Enviar pergunta"
      />
    </form>
  )
}