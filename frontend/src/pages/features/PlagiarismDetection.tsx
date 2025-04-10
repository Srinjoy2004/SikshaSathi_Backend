import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle, CheckCircle, Search, FileSearch, Fingerprint, Upload, File, Trash2, BarChart, Loader } from 'lucide-react';

const PlagiarismDetection = () => {
  const [files, setFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [allResults, setAllResults] = useState({});
  const fileContentsRef = useRef({});
  const [error, setError] = useState(null);
  let studentbatch = [];
  
  // More efficient file content reader - reads in chunks for large files
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      // For very large files, we'll use a different approach
      if (file.size > 1024 * 1024 * 5) { // 5MB limit for full reading
        // For large files, just read the first portion for analysis
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result); // This will contain a portion of the file
        };
        reader.onerror = () => {
          reject(new Error("Failed to read file"));
        };
        // Read only the first 500KB
        const blob = file.slice(0, 1024 * 500);
        reader.readAsText(blob);
      } else {
        // For smaller files, read everything
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = () => {
          reject(new Error("Failed to read file"));
        };
        reader.readAsText(file);
      }
    });
  };
  
  // Handle file upload with error handling
  const handleFileUpload = async (e) => {
    try {
      setError(null);
      const newFiles = Array.from(e.target.files).filter(file => 
        file.type === 'text/plain' || 
        file.name.endsWith('.txt') || 
        file.type === 'application/pdf' || 
        file.name.endsWith('.pdf') ||
        file.name.endsWith('.doc') ||
        file.name.endsWith('.docx')
      );
      let totalstudenttext="";
      for(const file of newFiles){
        totalstudenttext=totalstudenttext+extractTextFromImageWithGemini(file);

      }
      console.log(totalstudenttext);
      // Read all file contents - for non-text files, we'll just use dummy content
      for (const file of newFiles) {
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          try {
            const content = await readFileContent(file);
            fileContentsRef.current[file.name] = content;
          } catch (err) {
            console.error("Error reading file:", err);
            // Use placeholder text for files that can't be read
            fileContentsRef.current[file.name] = `Sample content for ${file.name}. This is placeholder text used for demonstration purposes.`;
          }
        } else {
          // For non-text files like PDF/DOC, use placeholder text
          fileContentsRef.current[file.name] = `Sample content for ${file.name}. This is placeholder text used for demonstration purposes.`;
        }
      }
      
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
    } catch (err) {
      console.error("Error in file upload:", err);
      setError("Failed to upload files. Please try again with smaller or fewer files.");
    }
  };
  
  type Student = {
    name: string;
    answer: string;
  };
  
  function checkPlagiarism(students: Student[]) {
    // alert("Checking for plagiarism...");
    const threshold = 0.8; // 80% match threshold
  
    // Simple similarity function using Dice's Coefficient
    function similarity(str1: string, str2: string): number {
      const bigrams = (s: string): Set<string> => {
        const pairs = new Set<string>();
        for (let i = 0; i < s.length - 1; i++) {
          pairs.add(s.substring(i, i + 2));
        }
        return pairs;
      };
  
      const s1 = bigrams(str1.toLowerCase().replace(/\s+/g, ''));
      const s2 = bigrams(str2.toLowerCase().replace(/\s+/g, ''));
  
      const intersection = new Set([...s1].filter(x => s2.has(x)));
      return (2 * intersection.size) / (s1.size + s2.size);
    }
  
    for (let i = 0; i < students.length; i++) {
      for (let j = i + 1; j < students.length; j++) {
        const sim = similarity(students[i].answer, students[j].answer);
        if (sim >= threshold) {
          console.log(`⚠️ Plagiarism Detected (${Math.round(sim * 100)}%)`);
          console.log(`${students[i].name} and ${students[j].name}`);
          console.log("-----------------------------");
        }
        else{
          console.log(`No Plagiarism Detected (${Math.round(sim * 100)}%)`);

        }
      }
    }
  }
  

  async function extractTextFromImageWithGemini(file) {
    const GEMINI_API_KEY = "AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8"; // 🔐 Replace with your real key

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      const mimeType = file.type;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: "Extract all readable text from this image." },
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: base64,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const extractedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (extractedText) {
        // alert("Extracted Text:\n\n" + extractedText);
        console.log(extractedText);
        return extractedText;
      } else {
        alert("No readable text found or something went wrong.");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Failed to extract text from the image.");
    }
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result.split(",")[1]; // remove data:image/...;base64,
        resolve(result);
      };
      reader.onerror = reject;
    });
  }

  // Handle bulk file upload with better error handling
  const handleBulkUpload = async (e) => {
    try {
      setError(null);
      const newFiles = Array.from(e.target.files);
  
      // Limit number of files to prevent browser hanging
      if (newFiles.length > 20) {
        setError("Please upload a maximum of 20 files at once to prevent performance issues.");
        return;
      }
  
      // Filter valid file types
      const filteredFiles = newFiles.filter(file =>
        file.type === 'text/plain' ||
        file.name.endsWith('.txt') ||
        file.type === 'application/pdf' ||
        file.name.endsWith('.pdf') ||
        file.name.endsWith('.doc') ||
        file.name.endsWith('.docx') ||
        file.type === 'application/zip' ||
        file.name.endsWith('.zip')
      );
  
      const batchSize = 5;
  
      for (let i = 0; i < filteredFiles.length; i += batchSize) {
        const batch = filteredFiles.slice(i, i + batchSize);
  
        // Process each file in the batch
        for (const file of batch) {
          const text = await extractTextFromImageWithGemini(file); // ✅ Await the result
          studentbatch.push({ name: file.name, answer: text });
        }
        // localStorage.setItem("studentbatch", JSON.stringify(studentbatch));
  
        console.log("Student batch:", studentbatch);
        checkPlagiarism(studentbatch);
  
        // Let UI breathe
        await new Promise(resolve => setTimeout(resolve, 10));
      }
  
      setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
  
    } catch (err) {
      console.error("Error in bulk upload:", err);
      setError("Failed to process bulk upload. Please try again with smaller or fewer files.");
    }
  };
  
  // Remove a file
  const removeFile = (indexToRemove) => {
    const fileToRemove = files[indexToRemove];
    if (fileToRemove && fileToRemove.name) {
      delete fileContentsRef.current[fileToRemove.name];
      
      if (allResults[fileToRemove.name]) {
        const newResults = {...allResults};
        delete newResults[fileToRemove.name];
        setAllResults(newResults);
      }
    }
    
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };
  
  // Clear all files
  const clearAllFiles = () => {
    setFiles([]);
    fileContentsRef.current = {};
    setAllResults({});
    setResults(null);
    setSelectedFile(null);
  };
  
  // More efficient AI detection algorithm
  const detectAIContent = (text) => {
    try {
      // Ensure we have some text to analyze
      if (!text || typeof text !== 'string' || text.length < 50) {
        return {
          percentage: 0,
          confidenceLevel: "Insufficient content",
          detectedPatterns: [
            { id: 1, pattern: "Insufficient content for analysis", confidence: 0 },
            { id: 2, pattern: "Please provide longer text", confidence: 0 },
            { id: 3, pattern: "Unable to determine", confidence: 0 }
          ]
        };
      }
      
      // Limit analysis to first 10,000 characters for performance
      const analyzedText = text.substring(0, 10000);
      
      // Split into sentences efficiently
      const sentences = analyzedText.split(/[.!?]+/).filter(s => s.trim().length > 5);
      
      // If there aren't enough sentences, return low confidence result
      if (sentences.length < 3) {
        return {
          percentage: 20,
          confidenceLevel: "Low (insufficient sentences)",
          detectedPatterns: [
            { id: 1, pattern: "Not enough content for reliable analysis", confidence: 20 },
            { id: 2, pattern: "Limited sentence variation detected", confidence: 15 },
            { id: 3, pattern: "Insufficient structure to analyze", confidence: 10 }
          ]
        };
      }
      
      // Check for consistent sentence length (AI often has consistent patterns)
      const sentenceLengths = sentences.map(s => s.trim().length);
      const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
      
      // Calculate consistency score more efficiently
      let consistencyScore = 0;
      let deviationSum = 0;
      
      for (let i = 0; i < Math.min(sentenceLengths.length, 50); i++) {
        const deviation = Math.abs(sentenceLengths[i] - avgLength) / avgLength;
        deviationSum += Math.min(deviation, 1);
      }
      
      consistencyScore = (1 - (deviationSum / Math.min(sentenceLengths.length, 50))) * 100;
      
      // Check for repetitive phrases or transition words (sampling approach)
      const commonTransitions = ['however', 'therefore', 'moreover', 'thus', 'in addition', 'consequently'];
      let transitionCount = 0;
      
      // Only check a sample of the text for performance
      const sampleText = analyzedText.toLowerCase();
      
      commonTransitions.forEach(transition => {
        const regex = new RegExp(`\\b${transition}\\b`, 'gi');
        const matches = sampleText.match(regex);
        if (matches) transitionCount += matches.length;
      });
      
      const transitionScore = Math.min(transitionCount * 5, 100);
      
      // Check for formulaic paragraph structure (sample only)
      const paragraphs = analyzedText.split('\n\n').filter(p => p.trim().length > 0);
      let structureScore = 0;
      
      if (paragraphs.length > 1) {
        // Look for similar paragraph lengths (sample only first 10)
        const sampleParagraphs = paragraphs.slice(0, Math.min(paragraphs.length, 10));
        const paragraphLengths = sampleParagraphs.map(p => p.trim().length);
        const avgParaLength = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
        
        let paraDeviationSum = 0;
        paragraphLengths.forEach(length => {
          const deviation = Math.abs(length - avgParaLength) / avgParaLength;
          paraDeviationSum += Math.min(deviation, 0.8);
        });
        
        structureScore = (1 - (paraDeviationSum / paragraphLengths.length)) * 100;
      }
      
      // Calculate word frequency more efficiently (sample only)
      const words = analyzedText.toLowerCase().match(/\b\w+\b/g) || [];
      const frequency = {};
      
      // Only analyze a sample of words for performance
      const wordSampleSize = Math.min(words.length, 300);
      for (let i = 0; i < wordSampleSize; i++) {
        frequency[words[i]] = (frequency[words[i]] || 0) + 1;
      }
      
      // Calculate vocabulary consistency score
      const vocabularyScore = calculateVocabularyConsistency(frequency);
      
      const patterns = [
        { 
          id: 1, 
          pattern: "Consistent writing style without human variation", 
          confidence: Math.round(consistencyScore) 
        },
        { 
          id: 2, 
          pattern: "Vocabulary usage patterns", 
          confidence: Math.round(vocabularyScore) 
        },
        { 
          id: 3, 
          pattern: "Structural organization patterns", 
          confidence: Math.round(structureScore) 
        }
      ];
      
      // Calculate weighted average of all factors
      const overallScore = Math.round(
        (consistencyScore * 0.4) + 
        (vocabularyScore * 0.4) + 
        (structureScore * 0.2)
      );
      
      const confidenceLevel = 
        overallScore > 80 ? "Very High" :
        overallScore > 65 ? "High" :
        overallScore > 45 ? "Medium" :
        overallScore > 30 ? "Low" : "Very Low";
      
      return {
        percentage: overallScore,
        confidenceLevel,
        detectedPatterns: patterns
      };
    } catch (err) {
      console.error("Error in AI detection:", err);
      return {
        percentage: 0,
        confidenceLevel: "Error",
        detectedPatterns: [
          { id: 1, pattern: "Error analyzing content", confidence: 0 },
          { id: 2, pattern: "Unable to process", confidence: 0 },
          { id: 3, pattern: "Try again with different content", confidence: 0 }
        ]
      };
    }
  };
  
  // Helper function for AI detection - more efficient implementation
  const calculateVocabularyConsistency = (wordFrequency) => {
    const wordCounts = Object.values(wordFrequency);
    
    if (wordCounts.length < 10) return 30; // Not enough data
    
    // Calculate standard deviation more efficiently
    const mean = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
    let sumSquaredDiff = 0;
    
    for (let i = 0; i < wordCounts.length; i++) {
      sumSquaredDiff += Math.pow(wordCounts[i] - mean, 2);
    }
    
    const variance = sumSquaredDiff / wordCounts.length;
    const stdDev = Math.sqrt(variance);
    
    // Calculate consistency score
    const consistencyScore = Math.min(100, Math.max(0, 100 - ((stdDev / mean) * 100)));
    
    return consistencyScore;
  };
  
  // More efficient plagiarism detection
  const detectPlagiarism = (currentText, fileName) => {
    try {
      if (!currentText || typeof currentText !== 'string' || currentText.length < 50) {
        return {
          overallPercentage: 0,
          sources: []
        };
      }
      
      const results = {
        overallPercentage: 0,
        sources: []
      };
      
      // Check against other uploaded files - with limits for performance
      const otherFiles = Object.keys(fileContentsRef.current).filter(name => name !== fileName);
      
      // Limit the number of files we compare against for performance
      const maxComparisons = Math.min(otherFiles.length, 10);
      
      for (let i = 0; i < maxComparisons; i++) {
        const otherFileName = otherFiles[i];
        const otherText = fileContentsRef.current[otherFileName];
        
        if (otherText && typeof otherText === 'string' && otherText.length > 50) {
          const matchResult = compareTexts(currentText, otherText);
          
          if (matchResult.matchPercentage > 5) { // Only add if there's a meaningful match
            results.sources.push({
              id: results.sources.length + 1,
              matchPercentage: matchResult.matchPercentage,
              source: `Internal Document - ${otherFileName}`,
              matches: matchResult.matches
            });
          }
        }
      }
      
      // Add sample external source matches for demonstration
      if (currentText.toLowerCase().includes('technological') || 
          currentText.toLowerCase().includes('ethical') || 
          currentText.toLowerCase().includes('framework')) {
        
        results.sources.push({
          id: results.sources.length + 1,
          matchPercentage: 14,
          source: "External Source - Journal of Technology Ethics (2023)",
          matches: [
            { 
              text: "Ethical frameworks for AI implementations must consider the sociocultural context...", 
              similarity: 79 
            },
            { 
              text: "The underlying power structures remain unchallenged when technology is viewed as neutral...", 
              similarity: 81 
            }
          ]
        });
      }
      
      if (currentText.toLowerCase().includes('ai') || 
          currentText.toLowerCase().includes('intelligence') || 
          currentText.toLowerCase().includes('algorithm')) {
        
        results.sources.push({
          id: results.sources.length + 1,
          matchPercentage: 18,
          source: "External Source - AI Ethics Quarterly (2024)",
          matches: [
            { 
              text: "Modern AI systems incorporate complex learning algorithms that adjust to new data inputs...", 
              similarity: 82 
            },
            { 
              text: "The ethical implications of AI decision-making processes remain a central concern...", 
              similarity: 77 
            }
          ]
        });
      }
      
      // Calculate overall plagiarism percentage
      if (results.sources.length > 0) {
        results.overallPercentage = Math.min(100, Math.round(
          results.sources.reduce((sum, source) => sum + source.matchPercentage, 0)
        ));
      }
      
      return results;
    } catch (err) {
      console.error("Error in plagiarism detection:", err);
      return {
        overallPercentage: 0,
        sources: []
      };
    }
  };
  
  // More efficient text comparison
  const compareTexts = (text1, text2) => {
    try {
      const result = {
        matchPercentage: 0,
        matches: []
      };
      
      // For very large texts, only compare samples
      const maxLength = 5000; // Limit for performance
      const sample1 = text1.substring(0, maxLength).toLowerCase();
      const sample2 = text2.substring(0, maxLength).toLowerCase();
      
      // Convert to lowercase and split into sentences
      const sentences1 = sample1.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const sentences2 = sample2.split(/[.!?]+/).filter(s => s.trim().length > 10);
      
      // For performance, limit the number of sentences we check
      const maxSentences1 = sentences1.slice(0, Math.min(sentences1.length, 30));
      const maxSentences2 = sentences2.slice(0, Math.min(sentences2.length, 30));
      
      let matchCount = 0;
      
      // Check each sentence in text1 against text2
      for (let i = 0; i < maxSentences1.length; i++) {
        const sentence1 = maxSentences1[i];
        
        for (let j = 0; j < maxSentences2.length; j++) {
          const sentence2 = maxSentences2[j];
          const similarity = calculateSimilarity(sentence1, sentence2);
          
          // If similarity is above threshold, consider it a match
          if (similarity > 70) {
            matchCount++;
            
            // Store only unique matches
            const alreadyExists = result.matches.some(m => 
              calculateSimilarity(m.text.toLowerCase(), sentence1) > 80
            );
            
            if (!alreadyExists && result.matches.length < 5) {
              // Get the original casing from text1
              const originalIndex = text1.toLowerCase().indexOf(sentence1);
              const originalSentence = originalIndex >= 0 
                ? text1.substr(originalIndex, sentence1.length) 
                : sentence1;
                
              result.matches.push({
                text: originalSentence + "...",
                similarity: Math.round(similarity)
              });
            }
          }
        }
      }
      
      // Calculate percentage based on matches
      if (maxSentences1.length > 0) {
        result.matchPercentage = Math.round((matchCount / maxSentences1.length) * 100);
        // Cap at 100%
        result.matchPercentage = Math.min(result.matchPercentage, 100);
      }
      
      return result;
    } catch (err) {
      console.error("Error comparing texts:", err);
      return {
        matchPercentage: 0,
        matches: []
      };
    }
  };
  
  // More efficient similarity calculation
  const calculateSimilarity = (str1, str2) => {
    try {
      // For very short strings, use a simple comparison
      if (str1.length < 15 || str2.length < 15) {
        return str1 === str2 ? 100 : 0;
      }
      
      // Simple Jaccard similarity for words - more efficient implementation
      const words1 = new Set(str1.split(/\s+/).filter(w => w.length > 3));
      const words2 = new Set(str2.split(/\s+/).filter(w => w.length > 3));
      
      if (words1.size === 0 || words2.size === 0) return 0;
      
      // Calculate intersection more efficiently
      let intersectionSize = 0;
      for (const word of words1) {
        if (words2.has(word)) {
          intersectionSize++;
        }
      }
      
      const unionSize = words1.size + words2.size - intersectionSize;
      
      return (intersectionSize / unionSize) * 100;
    } catch (err) {
      console.error("Error calculating similarity:", err);
      return 0;
    }
  };
  
  // Start analysis with proper progress tracking
  const startAnalysis = async () => {
    if (files.length === 0) return;
    
    try {
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      setError(null);
      const newResults = {};
      
      // Process files in batches for better UX
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const fileContent = fileContentsRef.current[fileName];
        
        // Update progress indicator
        setAnalysisProgress(Math.round(((i) / files.length) * 100));
        
        // Process file with small delay to allow UI updates
        await new Promise(resolve => setTimeout(resolve, 50));
        
        if (fileContent) {
          // Run both detection algorithms
          const aiResult = detectAIContent(fileContent);
          const plagiarismResult = detectPlagiarism(fileContent, fileName);
          
          newResults[fileName] = {
            aiDetection: aiResult,
            plagiarismDetection: plagiarismResult
          };
        }
      }
      
      // Final progress update
      setAnalysisProgress(100);
      
      // Short delay before showing results
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update state with all results
      setAllResults(newResults);
      
      // Set results for the first file
      if (files.length > 0) {
        const firstFileName = files[0].name;
        setResults(newResults[firstFileName]);
        setSelectedFile(firstFileName);
        setSelectedFileIndex(0);
      }
    } catch (err) {
      console.error("Error during analysis:", err);
      setError("An error occurred during analysis. Please try again with fewer files or smaller content.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };
  
  // Handle file selection change
  const handleFileChange = (index) => {
    const fileName = files[index].name;
    setSelectedFile(fileName);
    setSelectedFileIndex(index);
    setResults(allResults[fileName]);
  };
  
  // Reset everything
  const resetAnalysis = () => {
    setFiles([]);
    setResults(null);
    setSelectedFile(null);
    setAllResults({});
    fileContentsRef.current = {};
    setError(null);
  };
  
  // Add sample text if fileContents is empty (for demo purposes)
  useEffect(() => {
    if (Object.keys(fileContentsRef.current).length === 0) {
      fileContentsRef.current["sample_essay.txt"] = `The philosophical implications of technological determinism suggest that our modern society is increasingly shaped by the tools we create. These technologies, rather than being neutral instruments, actively reconfigure our social relationships and cultural norms.

Cultural hegemony manifests through these technological frameworks when certain groups maintain control over the development and deployment of new systems. As a result, marginalized perspectives are often excluded from the design process.

Ethical frameworks for AI implementations must consider the sociocultural context in which these systems operate. Without this consideration, we risk perpetuating existing inequalities and power imbalances.

The underlying power structures remain unchallenged when technology is viewed as neutral rather than as a product of specific cultural and economic forces. Therefore, critical analysis of technological systems should be central to our approach.`;

      fileContentsRef.current["student_assignment_1.txt"] = `Artificial intelligence systems are transforming how we approach complex problems across numerous domains. These technological tools have capabilities that extend beyond traditional computing, enabling more sophisticated analysis and decision-making processes.

The ethical implications of AI development require careful consideration of various perspectives. When designing these systems, engineers and researchers must account for potential biases and unintended consequences that might arise from their implementation.

Modern AI algorithms utilize vast datasets to identify patterns and generate insights that would be difficult for humans to discover independently. This capacity for data processing represents one of the most significant advantages of contemporary AI technologies.

However, critical assessment of AI deployment is necessary to ensure these systems don't reinforce existing power dynamics or societal inequalities. Therefore, interdisciplinary approaches to AI development should be prioritized.`;

      fileContentsRef.current["student_assignment_2.txt"] = `Technology shapes our society in profound ways, influencing how we communicate, learn, and interact with one another. The philosophical concept of technological determinism suggests that these tools aren't neutral but actively transform our cultural norms and social structures.

When certain groups maintain control over technological development, a form of cultural hegemony emerges that can exclude marginalized perspectives. This power imbalance affects which problems get solved and whose needs are prioritized in the design process.

Ethical considerations must guide the implementation of new technologies, especially artificial intelligence systems that make important decisions. Without proper sociocultural context and oversight, these systems risk perpetuating existing inequalities.

A critical analysis of technological systems reveals they aren't simply neutral tools but products of specific cultural and economic forces. Understanding this relationship between technology and society is essential for creating more equitable systems.`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <button onClick={() => window.history.back()} className="inline-flex items-center text-yellow-400 hover:text-yellow-500 mb-8">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to All Features
        </button>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="w-full md:w-1/2">
            <div className="h-16 w-16 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
              <AlertTriangle className="h-8 w-8" />
            </div>
            
            <h1 className="text-3xl font-bold mb-6">
              <span className="text-yellow-400">AI-Powered</span> Plagiarism Detection
            </h1>
            
            <p className="text-lg text-gray-300 mb-6">
              Upload assignments to check for both AI-generated content and plagiarism across internal and external sources.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Cross-comparison</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <span>External databases</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <span>AI detection</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Similarity reports</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <Card className="border border-gray-700 bg-gray-800/50 p-6 rounded-lg">
              {/* Error message display */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              {!results ? (
                <div className="space-y-6">
                  <div className="p-4 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-yellow-400 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-10 w-10 text-yellow-400 mb-2" />
                      <p className="font-medium">Drop files here or click to upload</p>
                      <p className="text-sm text-gray-400 mt-1">Support for PDF, DOC, DOCX, TXT</p>
                    </label>
                  </div>
                  
                  <div className="flex justify-center">
                    <input
                      type="file"
                      id="bulk-upload"
                      multiple
                      onChange={handleBulkUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.zip"
                    />
                    <label htmlFor="bulk-upload" className="flex items-center justify-center text-sm text-yellow-400 hover:text-yellow-300 cursor-pointer">
                      <FileSearch className="h-4 w-4 mr-2" />
                      Bulk upload (.zip allowed)
                    </label>
                  </div>
                  
                  {files.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">Files to analyze ({files.length})</h3>
                        <button 
                          onClick={clearAllFiles} 
                          className="text-sm text-red-400 hover:text-red-300 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Clear all
                        </button>
                      </div>
                      
                      <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                        {files.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex justify-between items-center p-2 rounded-md bg-gray-700/50 hover:bg-gray-700"
                          >
                            <div className="flex items-center">
                              <File className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="truncate max-w-[200px]">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={startAnalysis} 
                        className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium"
                        disabled={files.length === 0 || isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Start Analysis
                          </>
                        )}
                      </Button>
                      
                      {isAnalyzing && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Processing files...</span>
                            <span>{analysisProgress}%</span>
                          </div>
                          <Progress value={analysisProgress} className="h-1" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <button 
                      onClick={() => setResults(null)} 
                      className="inline-flex items-center text-sm text-yellow-400 hover:text-yellow-500"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to uploads
                    </button>
                    
                    <button 
                      onClick={resetAnalysis} 
                      className="inline-flex items-center text-sm text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Reset analysis
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-700">
                    {files.map((file, index) => (
                      <button
                        key={index}
                        onClick={() => handleFileChange(index)}
                        className={`px-3 py-1.5 rounded-md text-sm ${
                          selectedFileIndex === index
                            ? 'bg-yellow-500 text-gray-900'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name}
                      </button>
                    ))}
                  </div>
                  
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="ai-detection">AI Detection</TabsTrigger>
                      <TabsTrigger value="plagiarism">Plagiarism</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-700 bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-200">AI-Generated Content</h3>
                            <div 
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                results.aiDetection.percentage > 70
                                  ? 'bg-red-900/50 text-red-300'
                                  : results.aiDetection.percentage > 40
                                  ? 'bg-yellow-900/50 text-yellow-300'
                                  : 'bg-green-900/50 text-green-300'
                              }`}
                            >
                              {results.aiDetection.confidenceLevel}
                            </div>
                          </div>
                          
                          <div className="relative h-32 w-32 mx-auto mb-4">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold">
                                {results.aiDetection.percentage}%
                              </span>
                            </div>
                            <svg viewBox="0 0 100 100" className="h-full w-full">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="#374151"
                                strokeWidth="10"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={
                                  results.aiDetection.percentage > 70
                                    ? "#ef4444"
                                    : results.aiDetection.percentage > 40
                                    ? "#eab308"
                                    : "#10b981"
                                }
                                strokeWidth="10"
                                strokeDasharray={`${(results.aiDetection.percentage / 100) * 251.2} 251.2`}
                                strokeDashoffset="62.8"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                          </div>
                          
                          <p className="text-center text-sm text-gray-300 mb-2">
                            {results.aiDetection.percentage > 70
                              ? 'High likelihood of AI generation'
                              : results.aiDetection.percentage > 40
                              ? 'Medium likelihood of AI generation'
                              : 'Low likelihood of AI generation'}
                          </p>
                        </div>
                        
                        <div className="border border-gray-700 bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-200">Plagiarism Analysis</h3>
                            <div 
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                results.plagiarismDetection.overallPercentage > 30
                                  ? 'bg-red-900/50 text-red-300'
                                  : results.plagiarismDetection.overallPercentage > 15
                                  ? 'bg-yellow-900/50 text-yellow-300'
                                  : 'bg-green-900/50 text-green-300'
                              }`}
                            >
                              {results.plagiarismDetection.overallPercentage > 30
                                ? 'High'
                                : results.plagiarismDetection.overallPercentage > 15
                                ? 'Medium'
                                : 'Low'}
                            </div>
                          </div>
                          
                          <div className="relative h-32 w-32 mx-auto mb-4">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold">
                                {results.plagiarismDetection.overallPercentage}%
                              </span>
                            </div>
                            <svg viewBox="0 0 100 100" className="h-full w-full">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="#374151"
                                strokeWidth="10"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={
                                  results.plagiarismDetection.overallPercentage > 30
                                    ? "#ef4444"
                                    : results.plagiarismDetection.overallPercentage > 15
                                    ? "#eab308"
                                    : "#10b981"
                                }
                                strokeWidth="10"
                                strokeDasharray={`${(results.plagiarismDetection.overallPercentage / 100) * 251.2} 251.2`}
                                strokeDashoffset="62.8"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                          </div>
                          
                          <p className="text-center text-sm text-gray-300 mb-2">
                            {results.plagiarismDetection.overallPercentage > 30
                              ? 'High level of plagiarism detected'
                              : results.plagiarismDetection.overallPercentage > 15
                              ? 'Medium level of plagiarism detected'
                              : 'Low level of plagiarism detected'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-700 bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-200 mb-4">Recommended Actions</h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className={`mt-0.5 h-4 w-4 rounded-full ${
                              (results.aiDetection.percentage > 70 || 
                               results.plagiarismDetection.overallPercentage > 30)
                                ? 'bg-red-500'
                                : (results.aiDetection.percentage > 40 || 
                                   results.plagiarismDetection.overallPercentage > 15)
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`} />
                            <div className="ml-3">
                              <p className="text-sm font-medium">
                                {(results.aiDetection.percentage > 70 || 
                                  results.plagiarismDetection.overallPercentage > 30)
                                  ? 'Investigate this submission carefully'
                                  : (results.aiDetection.percentage > 40 || 
                                     results.plagiarismDetection.overallPercentage > 15)
                                  ? 'Review specific flagged sections'
                                  : 'No immediate concerns detected'}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {(results.aiDetection.percentage > 70 || 
                                  results.plagiarismDetection.overallPercentage > 30)
                                  ? 'This content shows significant indicators of AI generation or plagiarism and should be reviewed carefully.'
                                  : (results.aiDetection.percentage > 40 || 
                                     results.plagiarismDetection.overallPercentage > 15)
                                  ? 'Some sections require closer examination. Check the detailed analysis tabs.'
                                  : 'Content appears to be original and human-written based on our analysis.'}
                              </p>
                            </div>
                          </div>
                          
                          {(results.aiDetection.percentage > 40 || 
                            results.plagiarismDetection.overallPercentage > 15) && (
                            <div className="flex items-start">
                              <Fingerprint className="h-4 w-4 text-yellow-400 mt-0.5" />
                              <div className="ml-3">
                                <p className="text-sm font-medium">Consider writing verification</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Asking for an explanation of concepts or in-person discussion could help verify authorship.
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {results.plagiarismDetection.sources.length > 0 && (
                            <div className="flex items-start">
                              <FileSearch className="h-4 w-4 text-yellow-400 mt-0.5" />
                              <div className="ml-3">
                                <p className="text-sm font-medium">Check citation validity</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Verify that all external sources are properly cited in the document.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ai-detection" className="space-y-6">
                      <div className="border border-gray-700 bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-medium text-gray-200">AI Content Detection</h3>
                          <div 
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              results.aiDetection.percentage > 70
                                ? 'bg-red-900/50 text-red-300'
                                : results.aiDetection.percentage > 40
                                ? 'bg-yellow-900/50 text-yellow-300'
                                : 'bg-green-900/50 text-green-300'
                            }`}
                          >
                            {results.aiDetection.confidenceLevel} likelihood
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-xs mb-1">
                            <span>AI generation probability</span>
                            <span>{results.aiDetection.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                results.aiDetection.percentage > 70
                                  ? 'bg-red-500'
                                  : results.aiDetection.percentage > 40
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${results.aiDetection.percentage}%` }}
                            />
                          </div>
                        </div>
                        
                        <h4 className="text-sm font-medium mb-3">Detected Patterns</h4>
                        <div className="space-y-4">
                          {results.aiDetection.detectedPatterns.map(pattern => (
                            <div key={pattern.id} className="border-l-2 border-gray-600 pl-3">
                              <div className="flex justify-between items-center">
                                <p className="text-sm">{pattern.pattern}</p>
                                <div 
                                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    pattern.confidence > 70
                                      ? 'bg-red-900/50 text-red-300'
                                      : pattern.confidence > 40
                                      ? 'bg-yellow-900/50 text-yellow-300'
                                      : 'bg-green-900/50 text-green-300'
                                  }`}
                                >
                                  {pattern.confidence}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-700">
                          <h4 className="text-sm font-medium mb-2">What does this mean?</h4>
                          <p className="text-xs text-gray-400">
                            AI detection identifies patterns common in AI-generated content. This includes consistent writing style, 
                            regular sentence structures, predictable vocabulary usage, and other stylistic markers. Higher percentages 
                            indicate stronger AI-generation signals.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="plagiarism" className="space-y-6">
                      <div className="border border-gray-700 bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-medium text-gray-200">Plagiarism Analysis</h3>
                          <div 
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              results.plagiarismDetection.overallPercentage > 30
                                ? 'bg-red-900/50 text-red-300'
                                : results.plagiarismDetection.overallPercentage > 15
                                ? 'bg-yellow-900/50 text-yellow-300'
                                : 'bg-green-900/50 text-green-300'
                            }`}
                          >
                            {results.plagiarismDetection.overallPercentage > 30
                              ? 'High'
                              : results.plagiarismDetection.overallPercentage > 15
                              ? 'Medium'
                              : 'Low'} similarity
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Overall similarity</span>
                            <span>{results.plagiarismDetection.overallPercentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                results.plagiarismDetection.overallPercentage > 30
                                  ? 'bg-red-500'
                                  : results.plagiarismDetection.overallPercentage > 15
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${results.plagiarismDetection.overallPercentage}%` }}
                            />
                          </div>
                        </div>
                        
                        {results.plagiarismDetection.sources.length > 0 ? (
                          <div>
                            <h4 className="text-sm font-medium mb-3">Detected Sources</h4>
                            <div className="space-y-6">
                              {results.plagiarismDetection.sources.map(source => (
                                <div key={source.id} className="pb-4 border-b border-gray-700 last:border-b-0 last:pb-0">
                                  <div className="flex justify-between items-start mb-3">
                                    <p className="text-sm font-medium">{source.source}</p>
                                    <div 
                                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                                        source.matchPercentage > 30
                                          ? 'bg-red-900/50 text-red-300'
                                          : source.matchPercentage > 15
                                          ? 'bg-yellow-900/50 text-yellow-300'
                                          : 'bg-green-900/50 text-green-300'
                                      }`}
                                    >
                                      {source.matchPercentage}% match
                                    </div>
                                  </div>
                                  
                                  {source.matches && source.matches.length > 0 && (
                                    <div className="space-y-2">
                                      {source.matches.map((match, idx) => (
                                        <div key={idx} className="bg-gray-700/30 p-2 rounded text-xs">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-400">Matched text:</span>
                                            <span className="text-yellow-400">{match.similarity}% similar</span>
                                          </div>
                                          <p className="italic">{match.text}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
                            <p className="text-sm font-medium">No significant matches found</p>
                            <p className="text-xs text-gray-400 mt-1">Content appears to be original based on our analysis</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </Card>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
            <p className="text-sm">
              This is a demonstration version. In a production environment, this tool would integrate with external plagiarism databases.
            </p>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs">
            <BarChart className="h-4 w-4 mr-1" />
            Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismDetection;
