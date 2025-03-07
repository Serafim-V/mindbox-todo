import { useState } from 'react';
import { ITabProps } from '.';

export type ITab = { id: number; text: string }

export function useTab({
  defaultValue,
  data,
}: {
  defaultValue: ITab['id']
  data: ITab[]
}): ITabProps {
  const [activeTab, setAvtiveTab] = useState(defaultValue)

  return { activeTab, setAvtiveTab, data }
}
