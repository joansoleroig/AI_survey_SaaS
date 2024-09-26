import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TopicDetection({ topics }: { topics?: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Detection</CardTitle>
      </CardHeader>
      <CardContent>
        {topics && topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <Badge key={index} variant="secondary">{topic}</Badge>
            ))}
          </div>
        ) : (
          <p>No topics detected.</p>
        )}
      </CardContent>
    </Card>
  )
}