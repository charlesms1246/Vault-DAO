'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animations/PageTransition';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useDaoStore } from '@/store/daoStore';
import { DAOConfig } from '@/types';
import { CHAINS, CHAIN_NAMES } from '@/lib/constants';
import { 
  Rocket, 
  CheckCircle, 
  Info,
  ExternalLink,
  Copy
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const { addCustomDAO } = useDaoStore();
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tokenAddress: '',
    tokenSymbol: '',
    treasuryAddresses: '',
    governorAddress: '',
    snapshotSpace: '',
    safeAddress: '',
    chain: CHAINS.MAINNET as number,
    website: '',
    twitter: '',
    discord: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'DAO name is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      if (!formData.tokenAddress.trim() || !formData.tokenAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        newErrors.tokenAddress = 'Valid token address is required';
      }
      if (!formData.tokenSymbol.trim()) {
        newErrors.tokenSymbol = 'Token symbol is required';
      }
    }

    if (currentStep === 2) {
      if (!formData.treasuryAddresses.trim()) {
        newErrors.treasuryAddresses = 'At least one treasury address is required';
      } else {
        const addresses = formData.treasuryAddresses.split(',').map(a => a.trim());
        const invalidAddress = addresses.find(addr => !addr.match(/^0x[a-fA-F0-9]{40}$/));
        if (invalidAddress) {
          newErrors.treasuryAddresses = 'All addresses must be valid Ethereum addresses';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;

    const daoId = formData.name.toLowerCase().replace(/\s+/g, '-');
    const treasuryAddresses = formData.treasuryAddresses
      .split(',')
      .map(addr => addr.trim() as `0x${string}`);

    const newDAO: DAOConfig = {
      id: daoId,
      name: formData.name,
      description: formData.description,
      logo: '/logos/custom.svg',
      token: formData.tokenAddress as `0x${string}`,
      tokenSymbol: formData.tokenSymbol,
      tokenDecimals: 18,
      treasury: treasuryAddresses,
      chain: formData.chain,
      tags: ['Custom', 'Community'],
      ...(formData.governorAddress && { governor: formData.governorAddress as `0x${string}` }),
      ...(formData.snapshotSpace && { snapshot: formData.snapshotSpace }),
      ...(formData.safeAddress && { safe: formData.safeAddress as `0x${string}` }),
      ...(formData.website && { website: formData.website }),
      ...(formData.twitter && { twitter: formData.twitter }),
      ...(formData.discord && { discord: formData.discord }),
    };

    addCustomDAO(newDAO);
    setGeneratedId(daoId);
    setShowSuccessModal(true);
  };

  const handleCopyDeployCommand = () => {
    const command = `npm run build && pinme upload ./out`;
    navigator.clipboard.writeText(command);
    toast.success('Command copied to clipboard!');
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <Badge variant="info" size="lg">
                <Rocket className="w-4 h-4 mr-2" />
                Create Dashboard
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Deploy Your DAO Dashboard
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              Configure your DAO's eternal governance interface in 3 simple steps
            </motion.p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <div className="flex items-center justify-between">
              {([1, 2, 3] as const).map((s, idx) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-none flex items-center justify-center font-bold transition-all border-2 ${
                        step >= s
                          ? 'bg-gold-500 text-luxury-dark border-gold-500 shadow-gold-glow'
                          : 'bg-luxury-dark-800 text-gray-500 border-luxury-gray-500'
                      }`}
                    >
                      {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                    </div>
                    <div className="hidden md:block">
                      <p className="font-bold uppercase tracking-wider">
                        {s === 1 && 'Basic Info'}
                        {s === 2 && 'Contracts'}
                        {s === 3 && 'Optional'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {s === 1 && 'Name & token'}
                        {s === 2 && 'Treasury & governance'}
                        {s === 3 && 'Social & advanced'}
                      </p>
                    </div>
                  </div>
                  {s < 3 && (
                    <div className="flex-1 h-0.5 bg-luxury-gray-500 mx-4">
                      <motion.div
                        className="h-full bg-gold-500"
                        initial={{ width: 0 }}
                        animate={{ width: step > s ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Card>

          {/* Form */}
          <Card>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">Basic Information</h2>
                    <p className="text-gray-400">Tell us about your DAO</p>
                  </div>

                  <Input
                    label="DAO Name"
                    placeholder="e.g., Awesome DAO"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 rounded-none px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-200"
                      placeholder="Brief description of your DAO..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                    )}
                  </div>

                  <Input
                    label="Token Address"
                    placeholder="0x..."
                    value={formData.tokenAddress}
                    onChange={(e) => setFormData({ ...formData, tokenAddress: e.target.value })}
                    error={errors.tokenAddress}
                  />

                  <Input
                    label="Token Symbol"
                    placeholder="e.g., AWESOME"
                    value={formData.tokenSymbol}
                    onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })}
                    error={errors.tokenSymbol}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                      Chain
                    </label>
                    <select
                      className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold-500 uppercase tracking-wider font-bold"
                      value={formData.chain}
                      onChange={(e) => setFormData({ ...formData, chain: Number(e.target.value) })}
                    >
                      {Object.entries(CHAIN_NAMES).map(([chainId, name]) => (
                        <option key={chainId} value={chainId}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contracts */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">Smart Contracts</h2>
                    <p className="text-gray-400">Configure treasury and governance contracts</p>
                  </div>

                  <div>
                    <Input
                      label="Treasury Addresses"
                      placeholder="0x..., 0x... (comma separated for multiple)"
                      value={formData.treasuryAddresses}
                      onChange={(e) => setFormData({ ...formData, treasuryAddresses: e.target.value })}
                      error={errors.treasuryAddresses}
                    />
                    <div className="mt-2 flex items-start gap-2 text-sm text-gray-500">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>Separate multiple addresses with commas</p>
                    </div>
                  </div>

                  <Input
                    label="Governor Contract (Optional)"
                    placeholder="0x..."
                    value={formData.governorAddress}
                    onChange={(e) => setFormData({ ...formData, governorAddress: e.target.value })}
                  />

                  <Input
                    label="Snapshot Space (Optional)"
                    placeholder="e.g., your-dao.eth"
                    value={formData.snapshotSpace}
                    onChange={(e) => setFormData({ ...formData, snapshotSpace: e.target.value })}
                  />

                  <Input
                    label="Gnosis Safe Address (Optional)"
                    placeholder="0x..."
                    value={formData.safeAddress}
                    onChange={(e) => setFormData({ ...formData, safeAddress: e.target.value })}
                  />
                </motion.div>
              )}

              {/* Step 3: Optional */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">Social & Links</h2>
                    <p className="text-gray-400">Add social links and external resources</p>
                  </div>

                  <Input
                    label="Website"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />

                  <Input
                    label="Twitter Username"
                    placeholder="yourdao"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  />

                  <Input
                    label="Discord Invite"
                    placeholder="https://discord.gg/..."
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                  />

                  <div className="pt-6 border-t-2 border-luxury-gray-500">
                    <h3 className="font-bold mb-4 uppercase tracking-wider">Review Configuration</h3>
                    <div className="bg-luxury-dark-800 border-2 border-luxury-gray-500 p-4 rounded-none space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase tracking-wider">DAO Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase tracking-wider">Token:</span>
                        <span className="font-mono text-xs">{formData.tokenSymbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase tracking-wider">Chain:</span>
                        <span>{CHAIN_NAMES[formData.chain]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase tracking-wider">Treasury Addresses:</span>
                        <span>{formData.treasuryAddresses.split(',').length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t-2 border-luxury-gray-500">
                {step > 1 && (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                <div className="flex-1" />
                {step < 3 ? (
                  <Button variant="gold" onClick={handleNext}>
                    Continue
                  </Button>
                ) : (
                  <Button variant="gold" onClick={handleSubmit} icon={<Rocket className="w-5 h-5" />}>
                    Create Dashboard
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 bg-blood-red-500/5 border-2 border-blood-red-500/30">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-none bg-blood-red-500/20 border-2 border-blood-red-500 flex items-center justify-center">
                  <Info className="w-5 h-5 text-blood-red-500" />
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2 uppercase tracking-wider">After Creation</h3>
                <p className="text-sm text-gray-400">
                  Your dashboard configuration will be saved locally. To deploy it permanently on IPFS, 
                  you'll need to build the project and use PinMe to upload the static files.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Dashboard Created! 🎉"
      >
          <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 rounded-none bg-gold-500/20 border-4 border-gold-500 flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
              <CheckCircle className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">Success!</h3>
            <p className="text-gray-400">
              Your DAO dashboard has been created and saved locally.
            </p>
          </div>

          <Card className="bg-luxury-dark-800 border-2 border-luxury-gray-500">
            <h4 className="font-bold mb-3 uppercase tracking-wider">Next Steps:</h4>
            <ol className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-none bg-gold-500/20 text-gold-500 border-2 border-gold-500 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>View your dashboard to ensure everything looks correct</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-none bg-gold-500/20 text-gold-500 border-2 border-gold-500 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Build the static site for deployment</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-none bg-gold-500/20 text-gold-500 border-2 border-gold-500 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Deploy to IPFS using PinMe</span>
              </li>
            </ol>
          </Card>

          <div className="bg-luxury-dark-800 border-2 border-luxury-gray-500 p-4 rounded-none">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Deploy Command:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-luxury-dark px-3 py-2 rounded-none text-gold-500 text-sm font-mono border-2 border-luxury-gray-500">
                npm run build && pinme upload ./out
              </code>
              <button
                onClick={handleCopyDeployCommand}
                className="p-2 bg-luxury-dark-800 hover:bg-blood-red-500/10 border-2 border-luxury-gray-500 hover:border-gold-500 rounded-none transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={() => {
              setShowSuccessModal(false);
              router.push('/explore');
            }}
            fullWidth
          >
            Browse DAOs
          </Button>
          <Button
            variant="gold"
            onClick={() => {
              setShowSuccessModal(false);
              router.push(`/dashboard/${generatedId}`);
            }}
            icon={<ExternalLink className="w-4 h-4" />}
            fullWidth
          >
            View Dashboard
          </Button>
        </div>
      </Modal>
    </PageTransition>
  );
}