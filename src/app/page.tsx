'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import SentimentAnalysis from '../SentimentAnalysis'
import UrgencyMeter from '../UrgencyMeter'
import TopicDetection from '../TopicDetection'
import EntityRecognition from '../EntityRecognition'
import FileUpload from '../FileUpload'
import AggregateKPIs from '../AggregateKPIs'
import PaymentPage from '../PaymentPage'

interface Analysis {
  sentiment: number;
  urgency: number;
  topics: string[];
  entities: { name: string; type: string }[];
}

interface AggregateAnalysis {
  averageSentiment: number;
  averageUrgency: number;
  topTopics: string[];
  topEntities: { name: string; type: string; count: number }[];
}

export default function HotelFeedbackAnalyzer() {
  const [isPremium, setIsPremium] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [aggregateAnalysis, setAggregateAnalysis] = useState<AggregateAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handlePremiumToggle = () => {
    if (!isPremium && !apiKey) {
      setShowPayment(true)
    } else {
      setIsPremium(!isPremium)
    }
  }

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the API key with your backend
    if (apiKey.trim() !== '') {
      setIsPremium(true)
      setShowPayment(false)
    }
  }

  const analyzeFeedback = async () => {
    setIsAnalyzing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockAnalysis: Analysis = {
        sentiment: 0.7,
        urgency: 0.3,
        topics: ['cleanliness', 'service', 'location'],
        entities: [
          { name: 'Front Desk', type: 'FACILITY' },
          { name: 'John', type: 'PERSON' },
          { name: 'New York', type: 'LOCATION' }
        ]
      }
      setAnalysis(mockAnalysis)
    } catch (error) {
      console.error('Error analyzing feedback:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeBatch = async (file: File) => {
    setIsAnalyzing(true)
    try {
      // Simulate API call for batch analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockAggregateAnalysis: AggregateAnalysis = {
        averageSentiment: 0.65,
        averageUrgency: 0.4,
        topTopics: ['cleanliness', 'service', 'location', 'food', 'price'],
        topEntities: [
          { name: 'Front Desk', type: 'FACILITY', count: 50 },
          { name: 'Restaurant', type: 'FACILITY', count: 30 },
          { name: 'New York', type: 'LOCATION', count: 25 }
        ]
      }
      setAggregateAnalysis(mockAggregateAnalysis)
    } catch (error) {
      console.error('Error analyzing batch:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Hotel Feedback Analyzer</h1>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="premium-mode"
          checked={isPremium}
          onCheckedChange={handlePremiumToggle}
        />
        <Label htmlFor="premium-mode">Premium Mode</Label>
      </div>
      
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter API Key or Subscribe</DialogTitle>
            <DialogDescription>
              Enter your API key to access premium features, or subscribe to get an API key.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <Input
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button type="submit">Submit API Key</Button>
          </form>
          <p className="text-center my-4">or</p>
          <PaymentPage onSuccess={(newApiKey) => {
            setApiKey(newApiKey)
            setIsPremium(true)
            setShowPayment(false)
          }} />
        </DialogContent>
      </Dialog>
      
      {isPremium ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Batch Analysis (Premium)</CardTitle>
            <CardDescription>Upload an Excel file with multiple feedback entries</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onFileUpload={analyzeBatch} isAnalyzing={isAnalyzing} />
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Single Feedback Analysis (Free)</CardTitle>
            <CardDescription>Enter a single guest feedback for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Enter guest feedback here..." 
              value={feedback} 
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={analyzeFeedback} 
              className="mt-4" 
              disabled={isAnalyzing || !feedback.trim()}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Feedback'}
            </Button>
          </CardContent>
        </Card>
      )}
      
      {isPremium && aggregateAnalysis && (
        <AggregateKPIs analysis={aggregateAnalysis} />
      )}

      {!isPremium && analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SentimentAnalysis score={analysis.sentiment} />
          <UrgencyMeter score={analysis.urgency} />
          <TopicDetection topics={analysis.topics} />
          <EntityRecognition entities={analysis.entities} />
        </div>
      )}
    </div>
  )
}