import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UrgencyMeter({ score }: { score?: number }) {
  const getUrgencyColor = (score: number) => {
    if (score > 0.6) return 'bg-red-500'
    if (score > 0.3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urgency Meter</CardTitle>
      </CardHeader>
      <CardContent>
        {score !== undefined ? (
          <>
            <Progress value={score * 100} className={`w-full ${getUrgencyColor(score)}`} />
            <div className="text-center mt-2">Urgency Level: {(score * 100).toFixed(1)}%</div>
          </>
        ) : (
          <p>No urgency data available.</p>
        )}
      </CardContent>
    </Card>
  )
}