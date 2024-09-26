import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface AggregateAnalysis {
  averageSentiment: number;
  averageUrgency: number;
  topTopics: string[];
  topEntities: { name: string; type: string; count: number }[];
}

export default function AggregateKPIs({ analysis }: { analysis: AggregateAnalysis }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Average Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-center">
            {(analysis.averageSentiment * 100).toFixed(1)}%
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Urgency</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={analysis.averageUrgency * 100} className="w-full" />
          <div className="text-center mt-2">
            {(analysis.averageUrgency * 100).toFixed(1)}%
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.topTopics.map((topic, index) => (
              <Badge key={index} variant="secondary">{topic}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {analysis.topEntities.map((entity, index) => (
              <li key={index}>
                <span className="font-semibold">{entity.name}</span>: {entity.type} (Mentioned {entity.count} times)
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}