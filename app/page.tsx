'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ChurnForm from '@/components/churn-form'
import ResultCard from '@/components/result-card'

type PredictionResult = {
  prediction: 'Churn' | 'No Churn'
  probability: number
  churn?: 0 | 1
  timestamp?: string
}

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [tenure, setTenure] = useState("")
  const [monthlyCharges, setMonthlyCharges] = useState("")
  const [totalCharges, setTotalCharges] = useState("")

  const handlePredict = async () => {
    const formData = {
      tenure: Number(tenure),
      MonthlyCharges: Number(monthlyCharges),
      TotalCharges: Number(totalCharges)
    }

    try {
      const response = await fetch("https://your-backend-url.vercel.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = (await response.json()) as PredictionResult
      setResult({
        ...data,
        churn:
          data.churn ?? (data.prediction === 'Churn' ? 1 : 0),
        probability:
          data.probability > 1 ? data.probability : Number((data.probability * 100).toFixed(2)),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handlePrediction = (data: {
    prediction: 'Churn' | 'No Churn'
    probability: number
  }) => {
    setResult({
      ...data,
      churn: data.prediction === 'Churn' ? 1 : 0,
      probability: data.probability > 1 ? data.probability : Number((data.probability * 100).toFixed(2)),
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  return (
    <main className='min-h-screen bg-background text-foreground p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-balance mb-2'>ChurnGuard AI</h1>
          <p className='text-muted-foreground text-base md:text-lg'>Predict the likelihood of customer churn based on key metrics</p>
        </div>

        {/* Main Grid */}
        <div className='grid md:grid-cols-2 gap-6 lg:gap-8'>
          {/* Input Section */}
          <div>
            <Card className='border-border bg-card'>
              <CardHeader>
                <CardTitle className='text-xl md:text-2xl'>Prediction Input</CardTitle>
                <CardDescription>Enter customer information to predict churn risk</CardDescription>
              </CardHeader>
              <CardContent>
                <ChurnForm onPrediction={handlePrediction} />
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div>
            {/* Step 5: Place the result display here */}
            {result && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '15px',
                  borderRadius: '10px',
                  backgroundColor:
                    (result.churn ?? (result.prediction === 'Churn' ? 1 : 0)) === 1
                      ? '#ffe6e6'
                      : '#e6ffe6',
                }}
              >
                <h2
                  style={{
                    color:
                      (result.churn ?? (result.prediction === 'Churn' ? 1 : 0)) === 1
                        ? 'red'
                        : 'green',
                  }}
                >
                  {(result.churn ?? (result.prediction === 'Churn' ? 1 : 0)) === 1
                    ? '⚠️ High Risk of Churn'
                    : '✅ Customer Likely to Stay'}
                </h2>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Probability: {result.probability.toFixed(2)}%
                </p>
              </div>
            )}

            {result ? (
              <ResultCard result={result} />
            ) : (
              <Card className='border-border bg-card h-full flex items-center justify-center min-h-96'>
                <CardContent className='text-center'>
                  <div className='text-muted-foreground'>
                    <p className='text-lg font-medium mb-2'>No prediction yet</p>
                    <p>Submit the form to see prediction results</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className='grid md:grid-cols-3 gap-6 mt-8 lg:mt-12'>
          <Card className='border-border bg-card'>
            <CardHeader>
              <CardTitle className='text-base font-semibold'>Tenure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>Months as a customer. Longer tenure typically indicates lower churn risk.</p>
            </CardContent>
          </Card>

          <Card className='border-border bg-card'>
            <CardHeader>
              <CardTitle className='text-base font-semibold'>Monthly Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>Customer{"'"}s monthly billing amount. Higher costs may increase churn likelihood.</p>
            </CardContent>
          </Card>

          <Card className='border-border bg-card'>
            <CardHeader>
              <CardTitle className='text-base font-semibold'>Contract Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>Contract length affects churn. Month-to-month typically has higher churn.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}