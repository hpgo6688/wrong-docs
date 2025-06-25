```swift
enum PrinterError: Error {
  case outOfPaper
  case noToner
  case onFire
}

func send(job: Int, toPrinter printerName: String) throws -> String {
  if printerName == "Never Has Toner" {
    throw PrinterError.noToner
  }
  return "Job sent"
}

let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")

// 代码会明确处理可选值，并提供更清晰的输出。
if let successMessage = printerSuccess {
  print(successMessage)
} else {
  print("Failed to send job to Mergenthaler")
}

if let failureMessage = printerFailure {
  print(failureMessage)
} else {
  print("Failed to send job to Never Has Toner")
}

```