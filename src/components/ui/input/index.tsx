import { InputHTMLAttributes } from 'react'
import styles from './index.module.css'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}></span>
      <input {...props} className={styles.input} />
    </div>
  )
}
