"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDownUp, Copy, Check, ArrowRight } from "lucide-react"

type ConversionMode = "binary-to-decimal" | "decimal-to-binary"

interface ConversionStep {
  description: string
  calculation?: string
}

export default function BinaryDecimalConverter() {
  const [binaryValue, setBinaryValue] = useState("")
  const [decimalValue, setDecimalValue] = useState("")
  const [error, setError] = useState("")
  const [copiedBinary, setCopiedBinary] = useState(false)
  const [copiedDecimal, setCopiedDecimal] = useState(false)
  const [mode, setMode] = useState<ConversionMode>("binary-to-decimal")
  const [conversionSteps, setConversionSteps] = useState<ConversionStep[]>([])

  const validateBinary = (value: string): boolean => {
    return /^[01]*$/.test(value)
  }

  const validateDecimal = (value: string): boolean => {
    return /^\d*$/.test(value)
  }

  const binaryToDecimalWithSteps = (binary: string): { result: string; steps: ConversionStep[] } => {
    if (!binary) return { result: "", steps: [] }

    const steps: ConversionStep[] = []
    const bits = binary.split("").reverse()
    let total = 0

    steps.push({ description: "Converting binary to decimal using positional notation:" })

    const calculations: string[] = []
    bits.forEach((bit, index) => {
      const value = Number.parseInt(bit) * Math.pow(2, index)
      total += value
      if (bit === "1") {
        calculations.push(`${bit} × 2^${index} = ${value}`)
      }
    })

    calculations.forEach((calc) => {
      steps.push({ description: calc })
    })

    steps.push({
      description: "Add all values together:",
      calculation: `${calculations.map((c) => c.split(" = ")[1]).join(" + ")} = ${total}`,
    })

    return { result: total.toString(), steps }
  }

  const decimalToBinaryWithSteps = (decimal: string): { result: string; steps: ConversionStep[] } => {
    if (!decimal) return { result: "", steps: [] }

    const steps: ConversionStep[] = []
    let num = Number.parseInt(decimal, 10)
    const remainders: number[] = []

    steps.push({ description: "Converting decimal to binary using division by 2:" })

    if (num === 0) {
      steps.push({ description: "0 ÷ 2 = 0 remainder 0" })
      return { result: "0", steps }
    }

    while (num > 0) {
      const remainder = num % 2
      remainders.push(remainder)
      steps.push({ description: `${num} ÷ 2 = ${Math.floor(num / 2)} remainder ${remainder}` })
      num = Math.floor(num / 2)
    }

    const result = remainders.reverse().join("")
    steps.push({
      description: "Read remainders from bottom to top:",
      calculation: result,
    })

    return { result, steps }
  }

  const handleBinaryChange = (value: string) => {
    if (validateBinary(value)) {
      setBinaryValue(value)
      setError("")
      if (value) {
        try {
          const { result, steps } = binaryToDecimalWithSteps(value)
          setDecimalValue(result)
          setConversionSteps(steps)
        } catch {
          setError("Invalid binary number")
          setConversionSteps([])
        }
      } else {
        setDecimalValue("")
        setConversionSteps([])
      }
    } else {
      setError("Binary numbers can only contain 0 and 1")
    }
  }

  const handleDecimalChange = (value: string) => {
    if (validateDecimal(value)) {
      setDecimalValue(value)
      setError("")
      if (value) {
        try {
          const { result, steps } = decimalToBinaryWithSteps(value)
          setBinaryValue(result)
          setConversionSteps(steps)
        } catch {
          setError("Invalid decimal number")
          setConversionSteps([])
        }
      } else {
        setBinaryValue("")
        setConversionSteps([])
      }
    } else {
      setError("Decimal numbers can only contain digits 0-9")
    }
  }

  const handleModeToggle = () => {
    setMode(mode === "binary-to-decimal" ? "decimal-to-binary" : "binary-to-decimal")
    setBinaryValue("")
    setDecimalValue("")
    setConversionSteps([])
    setError("")
  }

  const handleClear = () => {
    setBinaryValue("")
    setDecimalValue("")
    setError("")
    setConversionSteps([])
  }

  const copyToClipboard = async (value: string, type: "binary" | "decimal") => {
    try {
      await navigator.clipboard.writeText(value)
      if (type === "binary") {
        setCopiedBinary(true)
        setTimeout(() => setCopiedBinary(false), 2000)
      } else {
        setCopiedDecimal(true)
        setTimeout(() => setCopiedDecimal(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md space-y-6 flex-1 flex flex-col justify-center py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            {mode === "binary-to-decimal" ? "Binary → Decimal" : "Decimal → Binary"}
          </h1>
          <p className="text-muted-foreground text-pretty">Convert between binary and decimal numbers instantly</p>
        </div>

        <Card className="p-6 space-y-6 shadow-lg border-2">
          <Button
            variant="outline"
            onClick={handleModeToggle}
            className="w-full bg-primary/5 border-primary/20 hover:bg-primary/10"
          >
            <ArrowDownUp className="h-4 w-4 mr-2" />
            Switch to {mode === "binary-to-decimal" ? "Decimal → Binary" : "Binary → Decimal"}
          </Button>

          {mode === "binary-to-decimal" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="binary" className="text-base font-semibold">
                  Binary Input
                </Label>
              </div>
              <Input
                id="binary"
                type="text"
                inputMode="numeric"
                placeholder="Enter binary (e.g., 1010)"
                value={binaryValue}
                onChange={(e) => handleBinaryChange(e.target.value)}
                className="text-lg h-14 font-mono"
              />
              {binaryValue && <p className="text-xs text-muted-foreground font-mono">{binaryValue.length} bits</p>}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="decimal" className="text-base font-semibold">
                  Decimal Input
                </Label>
              </div>
              <Input
                id="decimal"
                type="text"
                inputMode="numeric"
                placeholder="Enter decimal (e.g., 10)"
                value={decimalValue}
                onChange={(e) => handleDecimalChange(e.target.value)}
                className="text-lg h-14 font-mono"
              />
            </div>
          )}

          {(binaryValue || decimalValue) && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  {mode === "binary-to-decimal" ? "Decimal Result" : "Binary Result"}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      mode === "binary-to-decimal" ? decimalValue : binaryValue,
                      mode === "binary-to-decimal" ? "decimal" : "binary",
                    )
                  }
                  className="h-8 px-2"
                >
                  {(mode === "binary-to-decimal" ? copiedDecimal : copiedBinary) ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border-2 border-accent/20">
                <p className="text-2xl font-bold font-mono text-center">
                  {mode === "binary-to-decimal" ? decimalValue : binaryValue}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          <Button
            variant="outline"
            onClick={handleClear}
            className="w-full bg-transparent"
            disabled={!binaryValue && !decimalValue}
          >
            Clear All
          </Button>
        </Card>

        {conversionSteps.length > 0 && (
          <Card className="p-4 bg-muted/50">
            <h2 className="font-semibold mb-3 text-sm flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Conversion Steps
            </h2>
            <div className="space-y-2 text-sm">
              {conversionSteps.map((step, index) => (
                <div key={index} className={index === 0 ? "font-semibold" : "pl-4"}>
                  <p className="text-foreground/90">{step.description}</p>
                  {step.calculation && <p className="font-mono text-accent font-semibold mt-1">{step.calculation}</p>}
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-4 bg-muted/50">
          <h2 className="font-semibold mb-3 text-sm">Quick Reference</h2>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">0000</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">0001</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">0010</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">0011</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">0100</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">0101</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">0110</span>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">0111</span>
                <span className="font-semibold">7</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <footer className="w-full py-4 text-center border-t bg-background/50 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">made by amin</p>
      </footer>
    </main>
  )
}
