import ApplyFormClient from './ApplyFormClient'

export function generateStaticParams() {
  return [
    { level: 'primary' },
    { level: 'junior' },
    { level: 'senior' },
  ]
}

export default function ApplyFormPage({ params }: { params: { level: string } }) {
  return <ApplyFormClient level={params.level} />
}
