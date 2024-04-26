import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const Rectangle = ({ children }: Props) => (
    <div style={{ border: '1px solid brown' }}>{children}</div>
)