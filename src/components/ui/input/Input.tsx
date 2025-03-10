import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}></span>
      <input {...props} className={styles.input} />
    </div>
  )
}
