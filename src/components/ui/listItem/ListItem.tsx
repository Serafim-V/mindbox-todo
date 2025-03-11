import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import styles from './ListItem.module.css'

export function ListItem({
  children,
}: PropsWithChildren<{ loading?: boolean }>) {
  return (
    <div className={clsx([styles.listItem])}>
      <li>{children}</li>
    </div>
  )
}
