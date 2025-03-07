import { PropsWithChildren } from 'react'
import styles from './Button.module.css'

export function Button({
  children,
  onClick,
}: PropsWithChildren<{ onClick(): void }>) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
