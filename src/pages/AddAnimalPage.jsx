import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createAnimal } from '../redux/slices/animalsSlice'
import BubbleBackground from '../components/BubbleBackground'
import { ZONES, CLASSES } from '../utils/constants'

const EMOJIS = ['🐳', '🐬', '🦈', '🐙', '🦑', '🐠', '🐟', '🐡', '🐢', '🦀', '🦞', '🦐', '🪼', '🐋', '🦭', '🐊']

export default function AddAnimalPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(s => s.animals.status === 'loading')
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: '',
    latinName: '',
    emoji: '🐳',
    class: 'Рыбы',
    zone: 'sunlight',
    zoneName: 'Солнечная зона',
    depth: '',
    size: '',
    weight: '',
    lifespan: '',
    status: 'Вызывающий наименьшие опасения',
    statusColor: '#22c55e',
    diet: '',
    habitat: '',
    description: '',
    funFact: '',
    tags: '',
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Введите название'
    if (!form.description.trim()) e.description = 'Введите описание'
    if (form.description.length < 20) e.description = 'Описание слишком короткое (минимум 20 символов)'
    return e
  }

  const handleChange = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      if (field === 'zone') {
        const z = ZONES.find(z => z.value === value)
        next.zoneName = z?.label || value
      }
      return next
    })
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const newAnimal = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }

    await dispatch(createAnimal(newAnimal))
    setSubmitted(true)
    setTimeout(() => navigate('/catalog'), 1500)
  }

  if (submitted) {
    return (
      <div className="ocean-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass glow-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }} className="animate-float">✅</div>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foam)' }}>Животное добавлено!</h2>
          <p style={{ color: 'var(--azure)', marginTop: '0.5rem' }}>Перенаправление в каталог...</p>
        </div>
      </div>
    )
  }

  const Field = ({ label, field, placeholder, as = 'input', required, error }) => (
    <div>
      <label style={{ display: 'block', color: 'var(--azure)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
        {label} {required && <span style={{ color: '#f87171' }}>*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          className="ocean-input"
          value={form[field]}
          onChange={e => handleChange(field, e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ width: '100%', resize: 'vertical' }}
        />
      ) : (
        <input
          className="ocean-input"
          value={form[field]}
          onChange={e => handleChange(field, e.target.value)}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      )}
      {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  )

  return (
    <div className="ocean-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <BubbleBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--foam)', marginBottom: '0.5rem' }}>
          ➕ Добавить животное
        </h1>
        <p style={{ color: 'rgba(165,243,252,0.6)', marginBottom: '2rem' }}>
          Пополните энциклопедию новым обитателем океана
        </p>

        <div className="glass" style={{ padding: '2rem' }}>
          {/* Emoji picker */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--azure)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
              Выберите эмодзи
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {EMOJIS.map(e => (
                <button key={e} onClick={() => handleChange('emoji', e)} style={{
                  fontSize: '1.8rem', background: form.emoji === e ? 'rgba(6,182,212,0.2)' : 'rgba(10,34,64,0.5)',
                  border: form.emoji === e ? '2px solid var(--cyan)' : '1px solid rgba(6,182,212,0.2)',
                  borderRadius: 8, padding: '6px 10px', cursor: 'pointer', transition: 'all 0.15s',
                }}>{e}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <Field label="Название (рус.)" field="name" placeholder="Большая белая акула" required error={errors.name} />
            <Field label="Латинское название" field="latinName" placeholder="Carcharodon carcharias" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--azure)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
                Класс
              </label>
              <select className="ocean-input" value={form.class} onChange={e => handleChange('class', e.target.value)} style={{ width: '100%' }}>
                {CLASSES.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--azure)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
                Зона обитания
              </label>
              <select className="ocean-input" value={form.zone} onChange={e => handleChange('zone', e.target.value)} style={{ width: '100%' }}>
                {ZONES.filter(z => z.value !== 'all').map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <Field label="Размер" field="size" placeholder="до 6 м" />
            <Field label="Вес" field="weight" placeholder="до 2268 кг" />
            <Field label="Продолжит. жизни" field="lifespan" placeholder="70+ лет" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <Field label="Глубина" field="depth" placeholder="0–1200 м" />
            <Field label="Питание" field="diet" placeholder="Хищник / Фильтратор" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Field label="Место обитания" field="habitat" placeholder="Открытый океан, прибрежные воды" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Field label="Описание" field="description" placeholder="Опишите животное..." as="textarea" required error={errors.description} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Field label="Интересный факт" field="funFact" placeholder="Удивительный факт об этом животном..." as="textarea" />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <Field label="Теги (через запятую)" field="tags" placeholder="хищник, рекордсмен, мигрант" />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button className="btn-ghost" onClick={() => navigate('/catalog')}>Отмена</button>
            <button className="btn-ocean" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '⏳ Сохранение...' : '✅ Добавить в энциклопедию'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
