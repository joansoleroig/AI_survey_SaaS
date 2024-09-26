import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function FileUpload({ onFileUpload, isAnalyzing }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        disabled={isAnalyzing}
      />
      <Button onClick={handleUpload} disabled={!file || isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Upload and Analyze'}
      </Button>
    </div>
  )
}