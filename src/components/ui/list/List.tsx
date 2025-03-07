import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { ListItem } from '../listItem'
import styles from './List.module.css'

export function List({
  header,
  footer,
  children,
  loading,
}: PropsWithChildren<{
  header?: JSX.Element
  footer?: JSX.Element
  loading: boolean
}>) {
  return (
    <div className={styles.list}>
      <div className={styles.header}>{header}</div>
      <ul className={clsx([styles.content, loading && 'loading'])}>
        {children?.length > 0 ? (
          children
        ) : (
          <ListItem>
            <div className="listEmpty">Пока ничего нет</div>
          </ListItem>
        )}
      </ul>
      <div className={styles.footer}>{footer}</div>
    </div>
  )
}
