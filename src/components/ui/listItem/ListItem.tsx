import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import styles from './ListItem.module.css'

export function ListItem({
  children,
  loading,
}: PropsWithChildren<{ loading?: boolean }>) {
  return (
    <div className={clsx([styles.listItem, loading && 'loading'])}>
      <li>{children}</li>
    </div>
  )
}
