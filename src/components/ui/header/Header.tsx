import styles from './Header.module.css'

export function Header({ title }: { title: string }) {
  return <h1 className={styles.header}>{title}</h1>
}
