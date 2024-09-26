import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Entity {
  name: string;
  type: string;
}

export default function EntityRecognition({ entities }: { entities?: Entity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entity Recognition</CardTitle>
      </CardHeader>
      <CardContent>
        {entities && entities.length > 0 ? (
          <ul className="list-disc pl-5">
            {entities.map((entity, index) => (
              <li key={index}>
                <span className="font-semibold">{entity.name}</span>: {entity.type}
              </li>
            ))}
          </ul>
        ) : (
          <p>No entities recognized.</p>
        )}
      </CardContent>
    </Card>
  )
}