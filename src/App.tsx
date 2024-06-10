import { useCallback, useEffect, useState } from 'react'

function App() {
  const [catImageUrl, setCatImageUrl] = useState('')
  const [catFact, setCatFact] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getRandomCat = useCallback(async () => {
    setIsLoading(true)

    const [imageResponse, factResponse] = await Promise.all([
      fetch('https://cataas.com/cat', {
        method: 'GET',
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }).then(response => response.blob()),
      fetch('https://meowfacts.herokuapp.com/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json()) as Promise<{ data: string[] }>,
    ])

    setCatImageUrl(URL.createObjectURL(imageResponse))
    setCatFact(factResponse.data[0])
    setIsLoading(false)
  }, [])

  // Note: strict mode will render this twice on mount
  useEffect(() => {
    void getRandomCat()
  }, [getRandomCat])

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Random Cats!</h1>

      {catImageUrl && (
        <img
          src={catImageUrl}
          style={{ maxWidth: '90vw', opacity: isLoading ? '50%' : undefined }}
          alt="Random cat"
        />
      )}

      {catFact && (
        <p>
          <b>Fact:&nbsp;</b>
          <span>{catFact}</span>
        </p>
      )}

      <button type="button" onClick={getRandomCat} disabled={isLoading}>
        Get another cat!
      </button>
    </main>
  )
}

export default App
