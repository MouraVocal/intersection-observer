import { useEffect, useMemo, useRef } from 'react'

export const Card = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleIntersection: IntersectionObserverCallback = entries => {
    const [entry] = entries

    console.log(entry)

    cardRef.current?.classList.toggle(
      'animate-fade-in-once',
      entry.isIntersecting
    )

    cardRef.current?.classList.toggle(
      'animate-fade-out-once',
      !entry.isIntersecting
    )

    cardRef.current?.classList.toggle('opacity-0', !entry.isIntersecting)
  }

  const options = useMemo<IntersectionObserverInit>(
    () => ({
      threshold: 1
    }),
    []
  )

  useEffect(() => {
    const currentCard = cardRef.current
    const observer = new IntersectionObserver(handleIntersection, options)

    if (currentCard) {
      observer.observe(currentCard)
    }

    return () => {
      if (currentCard) observer.unobserve(currentCard)
    }
  }, [cardRef, options])

  return (
    <div
      ref={cardRef}
      className="bg-slate-300 w-11/12 h-36 rounded flex items-center justify-center opacity-0"
    >
      <p className="text-6xl text-black block">New Card</p>
    </div>
  )
}
