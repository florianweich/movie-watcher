export const formatPrice = (price?: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price ?? 0)
}

export const formatDate = (raw: string) => {
  const date = new Date(raw)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  //@ts-ignore
  return date.toLocaleDateString('de-DE', options)
}
