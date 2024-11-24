import React, { useState } from 'react';
import { Shield, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTokenService } from '../services/tokenService';
import { uploadToIPFS } from '../utils/ipfs';
import TokenForm from '../components/TokenForm';
import ImageUpload from '../components/ImageUpload';

const tokenInfoFields = [
  {
    label: 'Token Name',
    name: 'name',
    type: 'text',
    placeholder: 'e.g., PepeCoin',
    tooltip: 'Choose a unique and memorable name for your token',
  },
  {
    label: 'Token Symbol',
    name: 'symbol',
    type: 'text',
    placeholder: 'e.g., PEPE',
    tooltip: 'Short identifier for your token (2-6 characters)',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    placeholder: 'Brief description of your token',
    tooltip: 'Explain the purpose and unique features of your token',
  },
];

const Launch = () => {
  const { createToken } = useTokenService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      // Upload image to IPFS if exists
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadToIPFS(imageFile);
      }

      // Create token
      await createToken(
        data.name,
        data.symbol,
        imageUrl,
        data.description
      );

      // Redirect to dashboard after successful creation
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating token:', error);
      // Handle error (show notification, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Launch Your Token
        </h1>
        <p className="text-gray-400">Create your meme token in minutes with our secure launch platform</p>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Token Details</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Token Image
              </label>
              <ImageUpload
                onImageSelect={handleImageSelect}
                previewUrl={previewUrl}
                onClear={clearImage}
              />
            </div>
            <TokenForm
              fields={tokenInfoFields}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="bg-purple-900/20 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-medium">Launch Information</h3>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Rocket className="h-4 w-4 text-purple-400" />
                <span>Initial Supply: 200 tokens (20%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="h-4 w-4 text-purple-400" />
                <span>Max Supply: 1,000 tokens</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="h-4 w-4 text-purple-400" />
                <span>Launch Cost: 0.1 AVAX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="h-4 w-4 text-purple-400" />
                <span>Automatic Liquidity Pool Creation</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-medium mb-2">Security Features:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>Anti-bot protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>Ownership renounced</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>Liquidity locked</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>Contract verified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;