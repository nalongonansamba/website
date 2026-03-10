import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/rich-text'
import { Width } from '../width'
import React from 'react'

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
