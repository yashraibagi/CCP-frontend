'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'

interface ChurnFormProps {
  onPrediction: (data: {
    prediction: 'Churn' | 'No Churn'
    probability: number
  }) => void
}

export default function ChurnForm({ onPrediction }: ChurnFormProps) {
  const [tenure, setTenure] = useState('')
  const [monthlyCharges, setMonthlyCharges] = useState('')
  const [contract, setContract] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    if (!tenure || !monthlyCharges || !contract || !paymentMethod) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)

    // Simulate API call for prediction
    setTimeout(() => {
      const tenureNum = parseFloat(tenure)
      const chargesNum = parseFloat(monthlyCharges)

      // Simple prediction logic based on inputs
      const churnScore = (chargesNum / 150) * 0.6 + (1 - tenureNum / 72) * 0.4

      const monthToMonth = contract === 'month-to-month'
      const adjustedScore = monthToMonth ? Math.min(churnScore + 0.2, 1) : Math.max(churnScore - 0.1, 0)

      const probability = Math.round(adjustedScore * 100)
      const prediction = adjustedScore > 0.5 ? 'Churn' : 'No Churn'

      onPrediction({
        prediction,
        probability: Math.min(probability, 99)
      })

      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor='tenure' className='text-sm font-medium'>
          Tenure (Months)
        </Label>
        <Input
          id='tenure'
          type='number'
          placeholder='e.g., 24'
          min='0'
          max='100'
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className='bg-input border-border text-foreground'
        />
        <p className='text-xs text-muted-foreground'>How long has the customer been with you?</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='charges' className='text-sm font-medium'>
          Monthly Charges ($)
        </Label>
        <Input
          id='charges'
          type='number'
          placeholder='e.g., 65.50'
          min='0'
          step='0.01'
          value={monthlyCharges}
          onChange={(e) => setMonthlyCharges(e.target.value)}
          className='bg-input border-border text-foreground'
        />
        <p className='text-xs text-muted-foreground'>Customer{"'"}s monthly billing amount</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='contract' className='text-sm font-medium'>
          Contract Type
        </Label>
        <Select value={contract} onValueChange={setContract}>
          <SelectTrigger className='bg-input border-border text-foreground'>
            <SelectValue placeholder='Select contract type' />
          </SelectTrigger>
          <SelectContent className='bg-card border-border text-foreground'>
            <SelectItem value='month-to-month'>Month-to-Month</SelectItem>
            <SelectItem value='one-year'>One Year</SelectItem>
            <SelectItem value='two-year'>Two Year</SelectItem>
          </SelectContent>
        </Select>
        <p className='text-xs text-muted-foreground'>Length of customer contract</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='payment' className='text-sm font-medium'>
          Payment Method
        </Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger className='bg-input border-border text-foreground'>
            <SelectValue placeholder='Select payment method' />
          </SelectTrigger>
          <SelectContent className='bg-card border-border text-foreground'>
            <SelectItem value='electronic-check'>Electronic Check</SelectItem>
            <SelectItem value='mailed-check'>Mailed Check</SelectItem>
            <SelectItem value='bank-transfer'>Bank Transfer</SelectItem>
            <SelectItem value='credit-card'>Credit Card</SelectItem>
          </SelectContent>
        </Select>
        <p className='text-xs text-muted-foreground'>How does the customer pay?</p>
      </div>

      <Button
        type='submit'
        disabled={isLoading}
        className='w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold h-11 mt-6'
      >
        {isLoading ? (
          <>
            <Spinner className='mr-2' size='sm' />
            Predicting...
          </>
        ) : (
          'Predict Churn'
        )}
      </Button>
    </form>
  )
}
