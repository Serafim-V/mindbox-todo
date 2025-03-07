import clsx from 'clsx'
import styles from './index.module.css'
import { ITab } from './useTab'

export type ITabProps = {
  data: ITab[]
  setAvtiveTab(id: ITab['id']): void
  activeTab: ITab['id']
}

export function Tab({ data, setAvtiveTab, activeTab }: ITabProps) {
  return (
    <div className={styles.container}>
      {data.map(tab => {
        return (
          <div
            className={clsx([
              styles.tab,
              {
                [styles.active]: activeTab === tab.id,
              },
            ])}
            key={tab.id}
            onClick={() => setAvtiveTab(tab.id)}
          >
            {tab.text}
          </div>
        )
      })}
    </div>
  )
}
