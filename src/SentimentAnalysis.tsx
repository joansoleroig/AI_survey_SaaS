import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SentimentAnalysis({ score }: { score?: number }) {
  const getSentimentColor = (score: number) => {
    if (score > 0.6) return 'text-green-500'
    if (score > 0.3) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getSentimentLabel = (score: number) => {
    if (score > 0.6) return 'Positive'
    if (score > 0.3) return 'Neutral'
    return 'Negative'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {score !== undefined ? (
          <>
            <div className="text-4xl font-bold text-center">
              <span className={getSentimentColor(score)}>{getSentimentLabel(score)}</span>
            </div>
            <div className="text-center mt-2">Score: {(score * 100).toFixed(1)}%</div>
          </>
        ) : (
          <p>No sentiment data available.</p>
        )}
      </CardContent>
    </Card>
  )
}