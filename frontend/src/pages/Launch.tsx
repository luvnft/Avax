import React, { useState } from "react";
import { Shield, Rocket, Wand2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTokenService } from "../services/tokenService";
import { uploadToIPFS } from "../utils/ipfs";
import TokenForm from "../components/TokenForm";
import ImageUpload from "../components/ImageUpload";
import LoadingSpinner from "../components/LoadingSpinner";
import Chatbot from "../components/ChatBot";
import axios from "axios";

const tokenInfoFields = [
  {
    label: "Token Name",
    name: "name",
    type: "text",
    placeholder: "e.g., PepeCoin",
    tooltip: "Choose a unique and memorable name for your token",
  },
  {
    label: "Token Symbol",
    name: "symbol",
    type: "text",
    placeholder: "e.g., PEPE",
    tooltip: "Short identifier for your token (2-6 characters)",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Brief description of your token",
    tooltip: "Explain the purpose and unique features of your token",
  },
];

const Launch = () => {
  const { createToken } = useTokenService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [aiImageUrl, setAiImageUrl] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleImageSelect = (file: File) => {
    setError("");
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAiImageUrl("");
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setAiImageUrl("");
    setError("");
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;

    try {
      setError("");
      setLoadingAI(true);
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      setAiImageUrl(response.data.data[0].url);
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        "Failed to generate image. Please try again or upload an image manually."
      );
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (!imageFile && !aiImageUrl) {
        setError("Please upload an image or generate one using AI");
        return;
      }

      setIsLoading(true);
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadToIPFS(imageFile);
      } else if (aiImageUrl) {
        imageUrl = aiImageUrl;
      }

      if (!imageUrl) {
        throw new Error("Failed to process image");
      }

      await createToken(data.name, data.symbol, imageUrl, data.description);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating token:", error);
      setError("Failed to create token. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          Launch Your Token
        </h1>
        <p className="text-gray-400">
          Create your memecoin in minutes with our secure launch platform
        </p>
      </div>

      <div className="p-8 mb-8 bg-white/5 backdrop-blur-md rounded-2xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Token Details</h2>
            {error && (
              <div className="flex items-center p-4 mb-4 space-x-2 text-red-400 border rounded-lg bg-red-500/10 border-red-500/20">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Token Image
              </label>
              <ImageUpload
                onImageSelect={handleImageSelect}
                previewUrl={previewUrl || aiImageUrl}
                onClear={clearImage}
              />
            </div>
            <div className="mb-6 space-y-4">
              <div className="flex items-center mb-2 space-x-2">
                <Wand2 className="w-5 h-5 text-purple-400" />
                <label className="block text-sm font-medium text-gray-200">
                  AI Image Generator
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full p-3 pl-4 pr-32 text-gray-200 placeholder-gray-400 transition-all duration-200 border rounded-lg border-purple-500/20 bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={generateImage}
                  disabled={loadingAI || !prompt.trim()}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-medium text-sm transition-all duration-200
                    ${
                      loadingAI || !prompt.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/20"
                    }`}
                >
                  {loadingAI ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner />
                      <span>Generating</span>
                    </div>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
              {loadingAI && (
                <div className="py-8 text-center">
                  <LoadingSpinner />
                  <p className="mt-4 text-sm text-purple-400 animate-pulse">
                    Creating your masterpiece...
                  </p>
                </div>
              )}
            </div>
            <TokenForm
              fields={tokenInfoFields}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="p-6 bg-purple-900/20 rounded-xl">
            <div className="flex items-center mb-4 space-x-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-medium">Launch Information</h3>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span>Initial Supply: 200 tokens (20%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span>Max Supply: 1,000 tokens</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span>Launch Cost: 0.1 AVAX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span>Automatic Liquidity Pool Creation</span>
              </div>
            </div>
            <div className="p-4 mt-6 rounded-lg bg-purple-500/10">
              <h4 className="mb-2 font-medium">Security Features:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Anti-bot protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Ownership renounced</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Liquidity locked</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Contract verified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Launch;
