'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useDaoStore } from '@/store/daoStore';
import { DAOConfig } from '@/types';
import { CHAINS, CHAIN_NAMES } from '@/lib/constants';
import { 
  CheckCircle, 
  Info,
  ExternalLink,
  Flame,
  Users
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

  return (
    <div className="h-full flex bg-luxury-dark">
      {/* Left: Form Section (2/3) */}
      <div className="flex-1 overflow-y-auto border-r-2 border-luxury-gray-500">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-wider text-luxury mb-2">
              Create Custom Dashboard
            </h1>
            
            {/* Compact Step Indicator */}
            <div className="flex items-center gap-2">
              {([1, 2, 3, 4] as const).map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-8 h-8 flex items-center justify-center font-bold transition-all border-2 text-xs ${
                      step >= s
                        ? 'bg-luxury-dark text-blood-red-500 border-blood-red-500'
                        : 'bg-luxury-dark-900 text-luxury-gray-400 border-luxury-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && <div className="h-0.5 w-4 bg-luxury-gray-500" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="border-b-2 border-luxury-gray-500 pb-2 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-luxury-gray-300">
                    1. Basic Information
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    DAO Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Awesome DAO"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-blood-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors resize-none"
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-blood-red-500">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Token Symbol
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., AWESOME"
                    value={formData.tokenSymbol}
                    onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors"
                  />
                  {errors.tokenSymbol && (
                    <p className="mt-1 text-xs text-blood-red-500">{errors.tokenSymbol}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Chain
                  </label>
                  <select
                    value={formData.chain}
                    onChange={(e) => setFormData({ ...formData, chain: Number(e.target.value) })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white uppercase tracking-wider font-bold"
                  >
                    {Object.entries(CHAIN_NAMES).map(([chainId, name]) => (
                      <option key={chainId} value={chainId}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Contracts */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="border-b-2 border-luxury-gray-500 pb-2 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-luxury-gray-300">
                    2. Contracts
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Token Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={formData.tokenAddress}
                    onChange={(e) => setFormData({ ...formData, tokenAddress: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 font-mono text-sm transition-colors"
                  />
                  {errors.tokenAddress && (
                    <p className="mt-1 text-xs text-blood-red-500">{errors.tokenAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Treasury Addresses
                  </label>
                  <input
                    type="text"
                    placeholder="0x..., 0x... (comma separated)"
                    value={formData.treasuryAddresses}
                    onChange={(e) => setFormData({ ...formData, treasuryAddresses: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 font-mono text-sm transition-colors"
                  />
                  {errors.treasuryAddresses && (
                    <p className="mt-1 text-xs text-blood-red-500">{errors.treasuryAddresses}</p>
                  )}
                  <div className="mt-1 flex items-start gap-1 text-xs text-luxury-gray-500">
                    <Info className="w-3 h-3 shrink-0 mt-0.5" />
                    <p>Separate multiple addresses with commas</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Governor Contract
                  </label>
                  <input
                    type="text"
                    placeholder="0x... (optional)"
                    value={formData.governorAddress}
                    onChange={(e) => setFormData({ ...formData, governorAddress: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 font-mono text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Integration */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="border-b-2 border-luxury-gray-500 pb-2 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-luxury-gray-300">
                    3. Integration
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Snapshot Space
                  </label>
                  <input
                    type="text"
                    placeholder="your-dao.eth (optional)"
                    value={formData.snapshotSpace}
                    onChange={(e) => setFormData({ ...formData, snapshotSpace: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Gnosis Safe Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x... (optional)"
                    value={formData.safeAddress}
                    onChange={(e) => setFormData({ ...formData, safeAddress: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 font-mono text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Social */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="border-b-2 border-luxury-gray-500 pb-2 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-luxury-gray-300">
                    4. Social
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    placeholder="https://... (optional)"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Twitter Username
                  </label>
                  <input
                    type="text"
                    placeholder="yourdao (optional)"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-gray-400 mb-2">
                    Discord Invite
                  </label>
                  <input
                    type="text"
                    placeholder="https://discord.gg/... (optional)"
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                    className="w-full bg-luxury-dark-800 border-2 border-luxury-gray-500 focus:border-gold-500 outline-none px-3 py-2 text-white placeholder:text-luxury-gray-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t-2 border-luxury-gray-500 mt-6">
              {step > 1 && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  size="sm"
                >
                  Back
                </Button>
              )}
              <div className="flex-1" />
              {step < 4 ? (
                <Button variant="primary" onClick={handleNext} size="sm">
                  Continue
                </Button>
              ) : (
                <Button variant="gold" onClick={handleSubmit} size="lg">
                  Create Dashboard
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Right: Preview Section (1/3) */}
      <div className="w-96 bg-luxury-dark-900 overflow-y-auto">
        <div className="sticky top-0 bg-luxury-dark-900 border-b-2 border-luxury-gray-500 px-4 py-3 z-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gold-500">
            Preview
          </h2>
        </div>
        
        <div className="p-4">
          <Card className="hover:border-blood-red-500 transition-all duration-300">
            {/* Header with Logo + Name + Chain */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-luxury-dark-900 border-2 border-blood-red-500 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-gold-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold uppercase tracking-wider truncate">
                  {formData.name || 'DAO Name'}
                </h3>
                <Badge variant="gold" size="sm" className="mt-1">
                  {CHAIN_NAMES[formData.chain] || 'Ethereum'}
                </Badge>
              </div>
            </div>

            {/* Treasury Value */}
            <div className="mb-3">
              <div className="text-xs text-luxury-gray-400 uppercase tracking-wider mb-1">
                Treasury
              </div>
              <div className="text-2xl font-bold text-gold-500">
                $--.-M
              </div>
            </div>

            {/* Member Count */}
            <div className="flex items-center gap-2 mb-3 text-luxury-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm font-mono">
                --- members
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs bg-luxury-dark-900 border border-luxury-gray-500 text-luxury-gray-400 uppercase tracking-wider font-bold">
                Custom
              </span>
              <span className="px-2 py-1 text-xs bg-luxury-dark-900 border border-luxury-gray-500 text-luxury-gray-400 uppercase tracking-wider font-bold">
                {formData.tokenSymbol || 'TOKEN'}
              </span>
            </div>
          </Card>

          {/* Info Box */}
          <div className="mt-4 p-3 bg-luxury-dark-800 border-2 border-luxury-gray-500">
            <div className="flex items-start gap-2 mb-2">
              <Info className="w-4 h-4 text-blood-red-500 shrink-0 mt-0.5" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-gray-300">
                After Creation
              </h3>
            </div>
            <p className="text-xs text-luxury-gray-400 leading-relaxed">
              Your dashboard will be saved locally. Deploy to IPFS for permanent hosting.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Dashboard Created"
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-gold-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">Success!</h3>
            <p className="text-luxury-gray-400 text-sm">
              Your DAO dashboard has been created and saved locally.
            </p>
          </div>

          <div className="bg-luxury-dark-800 border-2 border-luxury-gray-500 p-4">
            <h4 className="text-xs font-bold mb-3 uppercase tracking-wider text-luxury-gray-300">Next Steps:</h4>
            <ol className="space-y-2 text-sm text-luxury-gray-400">
              <li className="flex gap-2">
                <span className="shrink-0 w-5 h-5 bg-gold-500/20 text-gold-500 border border-gold-500 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>View your dashboard</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 w-5 h-5 bg-gold-500/20 text-gold-500 border border-gold-500 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Build the static site</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 w-5 h-5 bg-gold-500/20 text-gold-500 border border-gold-500 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Deploy to IPFS</span>
              </li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setShowSuccessModal(false);
                router.push('/explore');
              }}
              size="sm"
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
              size="sm"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}