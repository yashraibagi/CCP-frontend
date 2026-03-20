'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResultCardProps {
  result: {
    prediction: 'Churn' | 'No Churn'
    probability: number
    timestamp?: string
  }
}

export default function ResultCard({ result }: ResultCardProps) {
  const isChurn = result.prediction === 'Churn'
  const bgColor = isChurn
    ? 'bg-gradient-to-br from-red-950/30 to-red-900/20'
    : 'bg-gradient-to-br from-green-950/30 to-green-900/20'
  const borderColor = isChurn ? 'border-red-800/50' : 'border-green-800/50'
  const textColor = isChurn ? 'text-red-200' : 'text-green-200'
  const accentColor = isChurn ? 'text-red-400' : 'text-green-400'

  return (
    <Card className={`border-2 h-full flex flex-col justify-between ${borderColor} ${bgColor}`}>
      <CardHeader>
        <CardTitle className='text-xl md:text-2xl text-foreground'>Prediction Result</CardTitle>
      </CardHeader>
      <CardContent className='space-y-8 flex-1 flex flex-col justify-center'>
        {/* Prediction Status */}
        <div className='space-y-4'>
          <div className='text-center'>
            <p className={`text-sm font-medium mb-2 ${textColor}`}>Predicted Outcome</p>
            <p className={`text-4xl md:text-5xl font-bold ${accentColor}`}>
              {result.prediction}
            </p>
          </div>

          {/* Risk Gauge */}
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-medium text-muted-foreground'>Risk Score</p>
              <p className={`text-2xl font-bold ${accentColor}`}>{result.probability}%</p>
            </div>
            <div className='w-full bg-secondary rounded-full h-3 overflow-hidden'>
              <div
                className={`h-full transition-all duration-500 ${
                  isChurn ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${result.probability}%` }}
              />
            </div>
          </div>

          {/* Risk Level */}
          <div className='bg-black/30 rounded-lg p-4 border border-border'>
            <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1'>
              Risk Level
            </p>
            <p className={`text-lg font-bold ${accentColor}`}>
              {result.probability < 33 ? 'Low' : result.probability < 67 ? 'Medium' : 'High'}
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className='bg-black/30 rounded-lg p-4 border border-border space-y-2'>
          <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
            Key Insights
          </p>
          {isChurn ? (
            <ul className='text-sm space-y-1 text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-red-400 mt-0.5'>•</span>
                <span>This customer shows high churn indicators</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-red-400 mt-0.5'>•</span>
                <span>Consider targeted retention strategies</span>
              </li>
            </ul>
          ) : (
            <ul className='text-sm space-y-1 text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-green-400 mt-0.5'>•</span>
                <span>Customer retention looks strong</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-400 mt-0.5'>•</span>
                <span>Continue providing quality service</span>
              </li>
            </ul>
          )}
        </div>

        {/* Timestamp */}
        {result.timestamp && (
          <p className='text-xs text-muted-foreground text-center'>
            Predicted at {result.timestamp}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
