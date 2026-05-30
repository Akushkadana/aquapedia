export const ZONES = [
  { value: 'all', label: 'Все зоны' },
  { value: 'sunlight', label: 'Солнечная зона' },
  { value: 'twilight', label: 'Сумеречная зона' },
  { value: 'midnight-zone', label: 'Полуночная зона' },
  { value: 'abyssal', label: 'Абиссальная зона' },
  { value: 'hadal', label: 'Хадальная зона' },
]

export const CLASSES = [
  { value: 'all', label: 'Все классы' },
  { value: 'Млекопитающие', label: 'Млекопитающие' },
  { value: 'Рыбы', label: 'Рыбы' },
  { value: 'Головоногие', label: 'Головоногие' },
  { value: 'Рептилии', label: 'Рептилии' },
  { value: 'Стрекающие', label: 'Стрекающие' },
]

export const STATUS_COLORS = {
  'Вызывающий наименьшие опасения': '#22c55e',
  'Почти угрожаемый': '#eab308',
  'Уязвимый': '#f59e0b',
  'Находящийся под угрозой': '#ef4444',
  'Критически угрожаемый': '#dc2626',
  'Недостаточно данных': '#6b7280',
}

export const ZONE_COLORS = {
  sunlight: '#fde68a',
  twilight: '#818cf8',
  'midnight-zone': '#a78bfa',
  abyssal: '#60a5fa',
  hadal: '#f472b6',
}

export const ZONE_DEPTHS = {
  sunlight: '0–200 м',
  twilight: '200–1000 м',
  'midnight-zone': '1000–4000 м',
  abyssal: '4000–6000 м',
  hadal: '6000–11000+ м',
}
